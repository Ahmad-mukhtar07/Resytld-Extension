/**
 * Alignment and spacing guides for drag/resize.
 * Returns guide definitions and optional snap values; rendering is done in content script.
 */

const ALIGN_THRESHOLD = 5;
const SNAP_THRESHOLD = 5;
const SPACING_MATCH_THRESHOLD = 2;
const MAX_CANDIDATES = 80;
const MIN_SIZE = 4;
const VIEWPORT_PADDING = 100;

function rectFromEl(el) {
  const r = el.getBoundingClientRect();
  return {
    left: r.left,
    top: r.top,
    right: r.right,
    bottom: r.bottom,
    width: r.width,
    height: r.height,
    centerX: r.left + r.width / 2,
    centerY: r.top + r.height / 2,
  };
}

function rectsOverlap(a, b) {
  return !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);
}

/**
 * Collect candidate elements' rects for comparison. Excludes our UI and the active element.
 */
export function getCandidateRects(document, excludeElement, rootElement) {
  const viewport = {
    left: -VIEWPORT_PADDING,
    top: -VIEWPORT_PADDING,
    right: (document.documentElement.clientWidth || window.innerWidth) + VIEWPORT_PADDING,
    bottom: (document.documentElement.clientHeight || window.innerHeight) + VIEWPORT_PADDING,
  };
  const root = rootElement || document.body;
  const candidates = [];
  const seen = new Set();

  function walk(el) {
    if (!el || el.nodeType !== 1) return;
    if (el === document.body || el === document.documentElement) {
      for (let i = 0; i < el.children.length; i++) walk(el.children[i]);
      return;
    }
    if (el === excludeElement || (excludeElement && (el === excludeElement || excludeElement.contains(el)))) return;
    if (el.closest && (el.closest('.restyld-resize-handles') || el.closest('.restyld-guides-overlay'))) return;
    if (seen.has(el)) return;
    seen.add(el);

    const r = rectFromEl(el);
    if (r.width < MIN_SIZE || r.height < MIN_SIZE) return;
    if (!rectsOverlap(r, viewport)) return;

    candidates.push(r);
    if (candidates.length >= MAX_CANDIDATES) return;

    for (let i = 0; i < el.children.length; i++) walk(el.children[i]);
  }

  walk(root);
  return candidates;
}

/**
 * Compute alignment guides and snap for drag. activeRect in viewport coordinates.
 */
export function computeDragGuides(activeRect, candidateRects, options = {}) {
  const threshold = options.threshold ?? ALIGN_THRESHOLD;
  const snapThreshold = options.snapThreshold ?? SNAP_THRESHOLD;
  const guides = [];
  let snapLeft = null;
  let snapTop = null;
  let bestLeftDist = snapThreshold + 1;
  let bestTopDist = snapThreshold + 1;

  const edges = [
    { key: 'top', value: (r) => r.top, orient: 'h', style: 'solid' },
    { key: 'bottom', value: (r) => r.bottom, orient: 'h', style: 'solid' },
    { key: 'left', value: (r) => r.left, orient: 'v', style: 'solid' },
    { key: 'right', value: (r) => r.right, orient: 'v', style: 'solid' },
  ];

  const activeTop = activeRect.top;
  const activeBottom = activeRect.bottom;
  const activeLeft = activeRect.left;
  const activeRight = activeRect.right;
  const activeCenterX = activeRect.centerX;
  const activeCenterY = activeRect.centerY;

  const lineExtent = (pos, orient, rects) => {
    let min = pos;
    let max = pos;
    for (const r of rects) {
      if (orient === 'h') {
        min = Math.min(min, r.left, activeRect.left);
        max = Math.max(max, r.right, activeRect.right);
      } else {
        min = Math.min(min, r.top, activeRect.top);
        max = Math.max(max, r.bottom, activeRect.bottom);
      }
    }
    return { min, max };
  };

  for (const edge of edges) {
    const activeVal = edge.value(activeRect);
    const linePositions = new Map();

    for (const c of candidateRects) {
      const candidateVal = edge.value(c);
      const dist = Math.abs(activeVal - candidateVal);
      if (dist <= threshold) {
        const key = Math.round(candidateVal);
        if (!linePositions.has(key) || dist < Math.abs(activeVal - linePositions.get(key))) {
          linePositions.set(key, candidateVal);
        }
      }
    }

    for (const [, pos] of linePositions) {
      const dist = Math.abs(activeVal - pos);
      guides.push({
        type: 'edge',
        orientation: edge.orient,
        position: pos,
        extent: lineExtent(pos, edge.orient, candidateRects),
        style: 'solid',
      });
      if (edge.key === 'left' && dist < bestLeftDist) {
        bestLeftDist = dist;
        snapLeft = pos;
      }
      if (edge.key === 'top' && dist < bestTopDist) {
        bestTopDist = dist;
        snapTop = pos;
      }
      if (edge.key === 'right' && dist < bestLeftDist) {
        const snap = pos - activeRect.width;
        if (Math.abs(activeLeft - snap) < bestLeftDist) {
          bestLeftDist = Math.abs(activeLeft - snap);
          snapLeft = snap;
        }
      }
      if (edge.key === 'bottom' && dist < bestTopDist) {
        const snap = pos - activeRect.height;
        if (Math.abs(activeTop - snap) < bestTopDist) {
          bestTopDist = Math.abs(activeTop - snap);
          snapTop = snap;
        }
      }
    }
  }

  const centerLines = [
    { orient: 'v', activeVal: activeCenterX, getVal: (r) => r.centerX },
    { orient: 'h', activeVal: activeCenterY, getVal: (r) => r.centerY },
  ];

  for (const { orient, activeVal, getVal } of centerLines) {
    const linePositions = new Map();
    for (const c of candidateRects) {
      const candidateVal = getVal(c);
      const dist = Math.abs(activeVal - candidateVal);
      if (dist <= threshold) {
        const key = Math.round(candidateVal);
        if (!linePositions.has(key)) linePositions.set(key, candidateVal);
      }
    }
    for (const [, pos] of linePositions) {
      guides.push({
        type: 'center',
        orientation: orient,
        position: pos,
        extent: lineExtent(pos, orient, candidateRects),
        style: 'dotted',
      });
      if (orient === 'v' && Math.abs(activeVal - pos) < bestLeftDist) {
        bestLeftDist = Math.abs(activeVal - pos);
        snapLeft = pos - activeRect.width / 2;
      }
      if (orient === 'h' && Math.abs(activeVal - pos) < bestTopDist) {
        bestTopDist = Math.abs(activeVal - pos);
        snapTop = pos - activeRect.height / 2;
      }
    }
  }

  const spacingGuides = computeSpacingGuides(activeRect, candidateRects);
  guides.push(...spacingGuides.guides);
  // Snap only from edge/center; spacing snap omitted to avoid ambiguous behavior

  return {
    guides,
    snap: { left: snapLeft, top: snapTop },
  };
}

function computeSpacingGuides(activeRect, candidateRects) {
  const guides = [];
  let snapLeft = null;
  let snapTop = null;
  const threshold = SPACING_MATCH_THRESHOLD;
  const gapsH = [];
  const gapsV = [];

  for (const c of candidateRects) {
    if (Math.abs(c.right - activeRect.left) < 50) gapsH.push({ gap: activeRect.left - c.right, pos: c.right, orient: 'v' });
    if (Math.abs(c.left - activeRect.right) < 50) gapsH.push({ gap: c.left - activeRect.right, pos: activeRect.right, orient: 'v' });
    if (Math.abs(c.bottom - activeRect.top) < 50) gapsV.push({ gap: activeRect.top - c.bottom, pos: c.bottom, orient: 'h' });
    if (Math.abs(c.top - activeRect.bottom) < 50) gapsV.push({ gap: c.top - activeRect.bottom, pos: activeRect.bottom, orient: 'h' });
  }

  for (const g of gapsH) {
    if (g.gap <= 0 || g.gap > 500) continue;
    const match = gapsH.some((o) => o !== g && Math.abs(o.gap - g.gap) <= threshold);
    if (match) {
      const extent = g.orient === 'v'
        ? { min: Math.min(activeRect.top, activeRect.bottom), max: Math.max(activeRect.top, activeRect.bottom) }
        : { min: Math.min(activeRect.left, activeRect.right), max: Math.max(activeRect.left, activeRect.right) };
      guides.push({
        type: 'spacing',
        orientation: g.orient,
        position: g.pos,
        extent,
        style: 'solid',
        label: `${Math.round(g.gap)}px`,
      });
      if (g.orient === 'v' && g.pos === activeRect.right) snapLeft = activeRect.left + g.gap;
    }
  }
  for (const g of gapsV) {
    if (g.gap <= 0 || g.gap > 500) continue;
    const match = gapsV.some((o) => o !== g && Math.abs(o.gap - g.gap) <= threshold);
    if (match) {
      const extent = g.orient === 'h'
        ? { min: Math.min(activeRect.left, activeRect.right), max: Math.max(activeRect.left, activeRect.right) }
        : { min: Math.min(activeRect.top, activeRect.bottom), max: Math.max(activeRect.top, activeRect.bottom) };
      guides.push({
        type: 'spacing',
        orientation: g.orient,
        position: g.pos,
        extent,
        style: 'solid',
        label: `${Math.round(g.gap)}px`,
      });
      if (g.orient === 'h' && g.pos === activeRect.bottom) snapTop = activeRect.top + g.gap;
    }
  }

  return { guides, snapLeft: null, snapTop: null };
}

/**
 * Compute guides for resize: same as drag (edges/centers) plus width/height match.
 */
export function computeResizeGuides(activeRect, handleName, candidateRects, options = {}) {
  const threshold = options.threshold ?? ALIGN_THRESHOLD;
  const result = computeDragGuides(activeRect, candidateRects, { ...options, snapThreshold: 0 });
  const guides = result.guides;

  const widthMatchThreshold = threshold;
  const heightMatchThreshold = threshold;
  for (const c of candidateRects) {
    if (Math.abs(activeRect.width - c.width) <= widthMatchThreshold && (handleName === 'e' || handleName === 'w' || handleName === 'ne' || handleName === 'nw' || handleName === 'se' || handleName === 'sw')) {
      guides.push({
        type: 'size',
        orientation: 'v',
        position: activeRect.left + c.width,
        extent: { min: Math.min(activeRect.top, activeRect.bottom), max: Math.max(activeRect.top, activeRect.bottom) },
        style: 'dotted',
        label: `${Math.round(c.width)}px`,
      });
    }
    if (Math.abs(activeRect.height - c.height) <= heightMatchThreshold && (handleName === 'n' || handleName === 's' || handleName === 'ne' || handleName === 'nw' || handleName === 'se' || handleName === 'sw')) {
      guides.push({
        type: 'size',
        orientation: 'h',
        position: activeRect.top + c.height,
        extent: { min: Math.min(activeRect.left, activeRect.right), max: Math.max(activeRect.left, activeRect.right) },
        style: 'dotted',
        label: `${Math.round(c.height)}px`,
      });
    }
  }

  return { guides };
}
