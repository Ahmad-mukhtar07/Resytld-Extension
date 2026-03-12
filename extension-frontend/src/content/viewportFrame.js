/**
 * Viewport frame: when design mode is on, wrap page content in a 20px-inset viewport
 * so the visible "frame" (background div) is selectable and distinct. Page content
 * (including fixed popups) is constrained to the inset area via transform containing block.
 */
const VIEWPORT_INSET = 20;
const FRAME_ID = 'restyld-viewport-frame';
const VIEWPORT_ID = 'restyld-viewport';

let frameEl = null;
let viewportEl = null;
let observer = null;

function isOurNode(el) {
  if (!el || el.nodeType !== 1) return true;
  if (el.id === FRAME_ID || el.id === VIEWPORT_ID) return true;
  if (el.getAttribute('data-restyld-viewport-frame') || el.getAttribute('data-restyld-viewport')) return true;
  if (el.getAttribute('data-restyld-background-layer')) return true;
  if (el.classList && (
    el.classList.contains('restyld-guides-overlay') ||
    el.classList.contains('restyld-resize-handles') ||
    el.classList.contains('restyld-toolbar-overlay')
  )) return true;
  return false;
}

export function applyViewportFrame() {
  if (viewportEl && document.body.contains(viewportEl)) return;

  const frame = document.createElement('div');
  frame.id = FRAME_ID;
  frame.setAttribute('data-restyld-viewport-frame', '1');
  frame.style.cssText = [
    'position:fixed',
    'inset:0',
    'z-index:0',
    'background:#e5e7eb',
    'box-sizing:border-box',
  ].join(';');

  const viewport = document.createElement('div');
  viewport.id = VIEWPORT_ID;
  viewport.setAttribute('data-restyld-viewport', '1');
  viewport.style.cssText = [
    'position:fixed',
    `left:${VIEWPORT_INSET}px`,
    `top:${VIEWPORT_INSET}px`,
    `right:${VIEWPORT_INSET}px`,
    `bottom:${VIEWPORT_INSET}px`,
    'z-index:1',
    'overflow:auto',
    'transform:translateZ(0)',
    'background:#fff',
    'box-sizing:border-box',
  ].join(';');

  const toMove = [];
  for (let i = 0; i < document.body.children.length; i++) {
    const child = document.body.children[i];
    if (isOurNode(child)) continue;
    toMove.push(child);
  }
  for (const node of toMove) viewport.appendChild(node);

  document.body.appendChild(frame);
  document.body.appendChild(viewport);
  frameEl = frame;
  viewportEl = viewport;

  observer = new MutationObserver((mutations) => {
    for (const mut of mutations) {
      for (const node of mut.addedNodes) {
        if (node.nodeType !== 1) continue;
        if (isOurNode(node)) continue;
        viewportEl.appendChild(node);
      }
    }
  });
  observer.observe(document.body, { childList: true });
}

export function removeViewportFrame() {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
  if (viewportEl && viewportEl.parentNode) {
    while (viewportEl.firstChild) {
      document.body.appendChild(viewportEl.firstChild);
    }
    viewportEl.remove();
    viewportEl = null;
  }
  if (frameEl && frameEl.parentNode) {
    frameEl.remove();
    frameEl = null;
  }
}
