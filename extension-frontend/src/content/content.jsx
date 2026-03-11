/**
 * ReStyld content script — design mode and DOM manipulation.
 * Selection and resize handles on page; editing UI lives in extension side panel.
 */
import panelCss from './panel.css?raw';
import { getPath } from '../lib/pathUtils.js';
import { applyModifications, resetModifications, clearAllMarkedStyles } from '../lib/applySkin.js';

// Inject panel styles (resize handles + selection outline only)
(function injectStyles() {
  const style = document.createElement('style');
  style.textContent = panelCss;
  (document.head || document.documentElement).appendChild(style);
})();

const ROOT_CLASS = 'restyld-root';
const HOVER_BORDER = '2px solid rgba(255, 0, 0, 0.5)';
const SELECT_BORDER = '3px solid #2563eb';

let designMode = false;
let hoveredElement = null;
let selectedElement = null;
let rafId = null;

const DRAG_THRESHOLD = 4;

let resizeHandlesRoot = null;
let resizeRafId = null;
const RESIZE_HANDLE_SIZE = 6;
const RESIZE_EDGE_WIDTH = 10;
const RESIZE_EDGE_THIN = 4;
const HANDLES = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];

/** Map pathKey -> { path, styles, removed?, removedHtml? } for current page modifications */
const modificationsMap = new Map();
/** Modifications last applied (for reset when no list provided) */
let lastAppliedModifications = [];

function pathKey(path) {
  return Array.isArray(path) ? path.join(',') : '';
}

function recordModification(el, updates) {
  if (!el || !document.body.contains(el)) return;
  const path = getPath(el);
  if (path.length === 0) return;
  const key = pathKey(path);
  const existing = modificationsMap.get(key) || { path, styles: {} };
  if (updates.removed !== undefined) {
    existing.removed = updates.removed;
    existing.removedHtml = updates.removedHtml;
  }
  if (updates.styles && typeof updates.styles === 'object') {
    Object.assign(existing.styles, updates.styles);
  }
  modificationsMap.set(key, existing);
}

function getCurrentModifications() {
  return Array.from(modificationsMap.values());
}

const container = () => document.querySelector(`.${ROOT_CLASS}`);

function isOurUI(target) {
  return target.closest(`.${ROOT_CLASS}`) != null || target.closest('.restyld-resize-handles') != null;
}

function clearHoverBorder() {
  if (hoveredElement && hoveredElement.style) {
    hoveredElement.style.outline = '';
    hoveredElement.style.outlineOffset = '';
    hoveredElement = null;
  }
}

function clearSelectionBorder() {
  if (selectedElement && selectedElement.style) {
    selectedElement.style.outline = '';
    selectedElement.style.outlineOffset = '';
    selectedElement.classList.remove('restyld-selected');
    selectedElement = null;
  }
}

function setHoverBorder(el) {
  if (!el || el === selectedElement) return;
  clearHoverBorder();
  hoveredElement = el;
  el.style.outline = HOVER_BORDER;
  el.style.outlineOffset = '2px';
}

function setSelectionBorder(el) {
  clearSelectionBorder();
  selectedElement = el;
  if (!el) return;
  el.style.outline = SELECT_BORDER;
  el.style.outlineOffset = '2px';
  el.classList.add('restyld-selected');
}

function getElementDimensions(el) {
  const rect = el.getBoundingClientRect();
  const cs = getComputedStyle(el);
  const w = parseFloat(cs.width) || rect.width;
  const h = parseFloat(cs.height) || rect.height;
  return { width: Math.round(w), height: Math.round(h) };
}

function getElementInfo(el) {
  if (!el) return {};
  return {
    tagName: el.tagName || '',
    id: el.id || '',
    className: (el.className && typeof el.className === 'string' ? el.className : '') || '',
  };
}

function getInitialStyles(el) {
  if (!el) return {};
  const cs = getComputedStyle(el);
  const rect = el.getBoundingClientRect();
  const num = (v) => (v != null && v !== '' ? String(v) : undefined);
  return {
    backgroundColor: num(el.style.backgroundColor) || cs.backgroundColor,
    opacity: num(el.style.opacity) ?? cs.opacity,
    width: num(el.style.width) || (rect.width ? `${rect.width}px` : undefined),
    height: num(el.style.height) || (rect.height ? `${rect.height}px` : undefined),
    borderRadius: num(el.style.borderRadius) || cs.borderRadius,
    transform: num(el.style.transform) || cs.transform,
    fontFamily: num(el.style.fontFamily) || cs.fontFamily,
    fontSize: num(el.style.fontSize) || cs.fontSize,
    fontWeight: num(el.style.fontWeight) || cs.fontWeight,
    color: num(el.style.color) || cs.color,
    textAlign: num(el.style.textAlign) || cs.textAlign,
    padding: num(el.style.padding) || cs.padding,
    margin: num(el.style.margin) || cs.margin,
    borderStyle: num(el.style.borderStyle) || cs.borderStyle,
    borderWidth: num(el.style.borderWidth) || cs.borderWidth,
    borderColor: num(el.style.borderColor) || cs.borderColor,
    boxShadow: num(el.style.boxShadow) || cs.boxShadow,
    backdropFilter: num(el.style.backdropFilter) || cs.backdropFilter,
    position: num(el.style.position) || undefined,
    left: num(el.style.left) || undefined,
    top: num(el.style.top) || undefined,
  };
}

function ensureElementPositionedForResize(el) {
  if (!el || !document.body.contains(el)) return;
  const parent = el.offsetParent || el.parentElement || document.body;
  const parentStyle = getComputedStyle(parent);
  if (parentStyle.position === 'static') {
    parent.style.setProperty('position', 'relative');
    parent.dataset.restyldParentPosition = 'relative';
  }
  const parentRect = parent.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  const left = elRect.left - parentRect.left;
  const top = elRect.top - parentRect.top;
  el.style.position = 'absolute';
  el.style.left = `${left}px`;
  el.style.top = `${top}px`;
  el.style.width = `${elRect.width}px`;
  el.style.height = `${elRect.height}px`;
  el.style.margin = '0';
  el.setAttribute('data-restyld-modified', '1');
  recordModification(el, {
    styles: {
      position: 'absolute',
      left: left + 'px',
      top: top + 'px',
      width: elRect.width + 'px',
      height: elRect.height + 'px',
      margin: '0',
    },
  });
}

function updateResizeHandlesPosition() {
  if (!resizeHandlesRoot || !selectedElement || !document.body.contains(selectedElement)) return;
  const rect = selectedElement.getBoundingClientRect();
  const h = RESIZE_HANDLE_SIZE / 2;
  const ew = RESIZE_EDGE_WIDTH / 2;
  const et = RESIZE_EDGE_THIN / 2;
  const positions = {
    n:  [rect.left + rect.width / 2 - ew, rect.top - et],
    ne: [rect.right - h, rect.top - h],
    e:  [rect.right - et, rect.top + rect.height / 2 - ew],
    se: [rect.right - h, rect.bottom - h],
    s:  [rect.left + rect.width / 2 - ew, rect.bottom - et],
    sw: [rect.left - h, rect.bottom - h],
    w:  [rect.left - et, rect.top + rect.height / 2 - ew],
    nw: [rect.left - h, rect.top - h],
  };
  HANDLES.forEach((name) => {
    const handle = resizeHandlesRoot.querySelector(`[data-handle="${name}"]`);
    if (handle) {
      handle.style.left = `${positions[name][0]}px`;
      handle.style.top = `${positions[name][1]}px`;
    }
  });
}

function startResizeDrag(handleName, startEvent) {
  const el = selectedElement;
  if (!el) return;
  startEvent.preventDefault();
  startEvent.stopPropagation();
  ensureElementPositionedForResize(el);
  const parent = el.offsetParent || el.parentElement || document.body;
  const parentRect = parent.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  let startX = startEvent.clientX;
  let startY = startEvent.clientY;
  let startLeft = elRect.left - parentRect.left;
  let startTop = elRect.top - parentRect.top;
  let startWidth = elRect.width;
  let startHeight = elRect.height;

  const onMouseMove = (e) => {
    if (rafId != null) return;
    rafId = requestAnimationFrame(() => {
      rafId = null;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      let left = startLeft;
      let top = startTop;
      let width = startWidth;
      let height = startHeight;
      switch (handleName) {
        case 'e':
          width = Math.max(4, startWidth + dx);
          break;
        case 'w':
          left = startLeft + dx;
          width = Math.max(4, startWidth - dx);
          startX = e.clientX;
          startLeft = left;
          startWidth = width;
          break;
        case 's':
          height = Math.max(4, startHeight + dy);
          break;
        case 'n':
          top = startTop + dy;
          height = Math.max(4, startHeight - dy);
          startY = e.clientY;
          startTop = top;
          startHeight = height;
          break;
        case 'se':
          width = Math.max(4, startWidth + dx);
          height = Math.max(4, startHeight + dy);
          break;
        case 'sw':
          left = startLeft + dx;
          width = Math.max(4, startWidth - dx);
          height = Math.max(4, startHeight + dy);
          startX = e.clientX;
          startY = e.clientY;
          startLeft = left;
          startWidth = width;
          startHeight = height;
          break;
        case 'ne':
          top = startTop + dy;
          width = Math.max(4, startWidth + dx);
          height = Math.max(4, startHeight - dy);
          startX = e.clientX;
          startY = e.clientY;
          startTop = top;
          startWidth = width;
          startHeight = height;
          break;
        case 'nw':
          left = startLeft + dx;
          top = startTop + dy;
          width = Math.max(4, startWidth - dx);
          height = Math.max(4, startHeight - dy);
          startX = e.clientX;
          startY = e.clientY;
          startLeft = left;
          startTop = top;
          startWidth = width;
          startHeight = height;
          break;
        default:
          break;
      }
      el.style.left = `${left}px`;
      el.style.top = `${top}px`;
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      recordModification(el, {
        styles: {
          left: left + 'px',
          top: top + 'px',
          width: width + 'px',
          height: height + 'px',
        },
      });
      updateResizeHandlesPosition();
    });
  };

  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    if (rafId != null) cancelAnimationFrame(rafId);
  };

  document.addEventListener('mousemove', onMouseMove, { passive: true });
  document.addEventListener('mouseup', onMouseUp, { once: true });
}

function createResizeHandles() {
  removeResizeHandles();
  if (!selectedElement) return;
  const container = document.createElement('div');
  container.className = 'restyld-resize-handles';
  resizeHandlesRoot = container;
  HANDLES.forEach((name) => {
    const handle = document.createElement('div');
    handle.className = 'restyld-resize-handle';
    handle.setAttribute('data-handle', name);
    handle.addEventListener('mousedown', (e) => startResizeDrag(name, e));
    container.appendChild(handle);
  });
  document.body.appendChild(container);
  updateResizeHandlesPosition();

  const loop = () => {
    if (resizeHandlesRoot && selectedElement && document.body.contains(selectedElement)) {
      updateResizeHandlesPosition();
    }
    resizeRafId = requestAnimationFrame(loop);
  };
  resizeRafId = requestAnimationFrame(loop);
}

function removeResizeHandles() {
  if (resizeRafId != null) {
    cancelAnimationFrame(resizeRafId);
    resizeRafId = null;
  }
  if (resizeHandlesRoot && resizeHandlesRoot.parentNode) {
    resizeHandlesRoot.parentNode.removeChild(resizeHandlesRoot);
  }
  resizeHandlesRoot = null;
}

function notifySelection() {
  try {
    chrome.runtime.sendMessage({
      type: 'SELECTED_ELEMENT',
      selected: selectedElement
        ? { elementInfo: getElementInfo(selectedElement), initialStyles: getInitialStyles(selectedElement) }
        : null,
      isRepositionMode: false,
    });
  } catch (_) {}
}

function renderPanel() {
  if (selectedElement) notifySelection();
}

function updatePanelPosition() {
  if (selectedElement) notifySelection();
}

function showPanel() {
  if (!selectedElement) return;
  createResizeHandles();
  attachDragToSelectedElement();
  notifySelection();
}

function hidePanel() {
  removeDragFromSelectedElement();
  removeResizeHandles();
  clearSelectionBorder();
  selectedElement = null;
  notifySelection();
}

function attachDragToSelectedElement() {
  const el = selectedElement;
  if (!el || !document.body.contains(el)) return;
  removeDragFromSelectedElement();

  const onMouseDown = (e) => {
    if (e.target !== el && !el.contains(e.target)) return;
    e.preventDefault();
    e.stopPropagation();
    let startX = e.clientX;
    let startY = e.clientY;
    let dragStarted = false;
    let startLeft = 0;
    let startTop = 0;

    const onMouseMove = (e2) => {
      const dx = e2.clientX - startX;
      const dy = e2.clientY - startY;
      if (!dragStarted) {
        if (Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return;
        ensureElementPositionedForResize(el);
        const parent = el.offsetParent || el.parentElement || document.body;
        const parentRect = parent.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        startLeft = elRect.left - parentRect.left;
        startTop = elRect.top - parentRect.top;
        startX = e2.clientX;
        startY = e2.clientY;
        dragStarted = true;
      }
      if (rafId != null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const newLeft = startLeft + (e2.clientX - startX);
        const newTop = startTop + (e2.clientY - startY);
        el.style.left = `${newLeft}px`;
        el.style.top = `${newTop}px`;
        recordModification(el, { styles: { left: el.style.left, top: el.style.top } });
        updateResizeHandlesPosition();
        startLeft = newLeft;
        startTop = newTop;
        startX = e2.clientX;
        startY = e2.clientY;
      });
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (rafId != null) cancelAnimationFrame(rafId);
      if (dragStarted) notifySelection();
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseup', onMouseUp, { once: true });
  };

  el.addEventListener('mousedown', onMouseDown, true);
  el._restyldCleanupDrag = () => {
    el.removeEventListener('mousedown', onMouseDown, true);
    delete el._restyldCleanupDrag;
  };
}

function removeDragFromSelectedElement() {
  if (selectedElement && selectedElement._restyldCleanupDrag) {
    selectedElement._restyldCleanupDrag();
  }
}

function handleMouseOver(e) {
  if (!designMode) return;
  if (isOurUI(e.target)) return;
  if (selectedElement) return;
  setHoverBorder(e.target);
}

function handleMouseOut(e) {
  if (!designMode) return;
  if (isOurUI(e.target)) return;
  if (selectedElement) return;
  if (hoveredElement && !hoveredElement.contains(e.relatedTarget)) {
    clearHoverBorder();
  }
}

function handleClick(e) {
  if (!designMode) return;
  if (isOurUI(e.target)) return;
  if (selectedElement && selectedElement !== e.target && !selectedElement.contains(e.target)) {
    e.preventDefault();
    e.stopPropagation();
    return;
  }
  e.preventDefault();
  e.stopPropagation();
  clearHoverBorder();
  setSelectionBorder(e.target);
  showPanel();
}

function enableDesignMode() {
  if (designMode) return;
  designMode = true;
  document.addEventListener('mouseover', handleMouseOver, true);
  document.addEventListener('mouseout', handleMouseOut, true);
  document.addEventListener('click', handleClick, true);
}

function disableDesignMode() {
  if (!designMode) return;
  designMode = false;
  document.removeEventListener('mouseover', handleMouseOver, true);
  document.removeEventListener('mouseout', handleMouseOut, true);
  document.removeEventListener('click', handleClick, true);
  clearHoverBorder();
  removeDragFromSelectedElement();
  hidePanel();
}

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.type === 'ENABLE_DESIGN_MODE') {
    enableDesignMode();
    sendResponse({ ok: true, designMode: true });
  } else if (msg.type === 'DISABLE_DESIGN_MODE') {
    disableDesignMode();
    sendResponse({ ok: true, designMode: false });
  } else if (msg.type === 'GET_DESIGN_MODE') {
    sendResponse({ designMode });
  } else if (msg.type === 'GET_SELECTED_ELEMENT') {
    if (!selectedElement || !document.body.contains(selectedElement)) {
      sendResponse({ selected: null });
    } else {
      sendResponse({
        selected: {
          elementInfo: getElementInfo(selectedElement),
          initialStyles: getInitialStyles(selectedElement),
        },
        isRepositionMode: false,
      });
    }
  } else if (msg.type === 'APPLY_STYLE') {
    const styles = msg.styles || {};
    if (selectedElement && document.body.contains(selectedElement)) {
      selectedElement.setAttribute('data-restyld-modified', '1');
      const updates = {};
      for (const [key, value] of Object.entries(styles)) {
        if (value !== undefined && value !== null && value !== '') {
          selectedElement.style[key] = value;
          updates[key] = value;
        }
      }
      if (Object.keys(updates).length) recordModification(selectedElement, { styles: updates });
    }
    sendResponse({ ok: true });
  } else if (msg.type === 'DESELECT') {
    hidePanel();
    sendResponse({ ok: true });
  } else if (msg.type === 'REMOVE_ELEMENT') {
    if (selectedElement) {
      const removedHtml = selectedElement.outerHTML;
      recordModification(selectedElement, { removed: true, removedHtml });
      selectedElement.remove();
      selectedElement = null;
    }
    removeResizeHandles();
    clearSelectionBorder();
    notifySelection();
    sendResponse({ ok: true });
  } else if (msg.type === 'REPOSITION_START') {
    sendResponse({ ok: true });
  } else if (msg.type === 'REPOSITION_DONE') {
    if (selectedElement) notifySelection();
    sendResponse({ ok: true });
  } else if (msg.type === 'GET_MODIFICATIONS') {
    sendResponse({ ok: true, modifications: getCurrentModifications() });
  } else if (msg.type === 'APPLY_SKIN') {
    const modifications = msg.modifications || [];
    const result = applyModifications(modifications);
    lastAppliedModifications = modifications;
    modificationsMap.clear();
    modifications.forEach((mod) => {
      if (mod && Array.isArray(mod.path)) modificationsMap.set(pathKey(mod.path), { ...mod });
    });
    sendResponse({ ok: true, ...result });
  } else if (msg.type === 'RESET') {
    const list = msg.modifications != null ? msg.modifications : lastAppliedModifications;
    let result;
    if (Array.isArray(list) && list.length > 0) {
      result = resetModifications(list);
      lastAppliedModifications = [];
      modificationsMap.clear();
    } else {
      result = { cleared: clearAllMarkedStyles(), restored: 0, missing: 0 };
      modificationsMap.clear();
    }
    sendResponse({ ok: true, ...result });
  }
  return true;
});
