/**
 * ReStyld content script — design mode and DOM manipulation.
 * Pure JavaScript for hover/select/drag; React only for the floating panel UI.
 */
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import panelCss from './panel.css?raw';
import sidebarCss from '../components/Sidebar.css?raw';
import { getPath } from '../lib/pathUtils.js';
import { applyModifications, resetModifications, clearAllMarkedStyles } from '../lib/applySkin.js';

// Inject panel styles into the page (content script runs as classic script context)
(function injectStyles() {
  const style = document.createElement('style');
  style.textContent = panelCss + '\n' + sidebarCss;
  (document.head || document.documentElement).appendChild(style);
})();

const ROOT_CLASS = 'restyld-root';
const HOVER_BORDER = '2px solid rgba(255, 0, 0, 0.5)';
const SELECT_BORDER = '3px solid #2563eb';

let designMode = false;
let hoveredElement = null;
let selectedElement = null;
let panelRoot = null;
let reactRoot = null;
let isRepositionMode = false;
let dragState = null;
let rafId = null;

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
  return target.closest(`.${ROOT_CLASS}`) != null;
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

function renderPanel() {
  if (!panelRoot || !selectedElement || !reactRoot) return;
  const elementInfo = getElementInfo(selectedElement);
  const initialStyles = getInitialStyles(selectedElement);

  const applyStyles = (stylesObj) => {
    if (!selectedElement) return;
    selectedElement.setAttribute('data-restyld-modified', '1');
    const updates = {};
    for (const [key, value] of Object.entries(stylesObj)) {
      if (value !== undefined && value !== null && value !== '') {
        selectedElement.style[key] = value;
        updates[key] = value;
      }
    }
    if (Object.keys(updates).length) recordModification(selectedElement, { styles: updates });
  };

  reactRoot.render(
    <StrictMode>
      <Sidebar
        elementInfo={elementInfo}
        initialStyles={initialStyles}
        onStyleChange={applyStyles}
        onDeselect={() => {
          exitRepositionMode();
          hidePanel();
        }}
        onRemove={() => {
          if (selectedElement) {
            const removedHtml = selectedElement.outerHTML;
            recordModification(selectedElement, { removed: true, removedHtml });
            selectedElement.remove();
            selectedElement = null;
            hidePanel();
            exitRepositionMode();
          }
        }}
        onReposition={() => enterRepositionMode()}
        onRepositionDone={() => {
          exitRepositionMode();
          renderPanel();
        }}
        isRepositionMode={isRepositionMode}
      />
    </StrictMode>
  );
}

function updatePanelPosition() {
  if (selectedElement && reactRoot) {
    renderPanel();
  }
}

function showPanel() {
  if (!selectedElement) return;
  if (!panelRoot) {
    const div = document.createElement('div');
    div.className = ROOT_CLASS;
    div.style.cssText = 'position:fixed;left:0;top:0;width:0;height:0;overflow:visible;pointer-events:none;z-index:2147483647';
    const inner = document.createElement('div');
    inner.style.pointerEvents = 'auto';
    div.appendChild(inner);
    document.body.appendChild(div);
    panelRoot = inner;
    reactRoot = createRoot(panelRoot);
  }
  renderPanel();
}

function hidePanel() {
  if (reactRoot && panelRoot) {
    reactRoot.render(null);
  }
  clearSelectionBorder();
}

function enterRepositionMode() {
  if (!selectedElement) return;
  isRepositionMode = true;
  const el = selectedElement;
  const parent = el.offsetParent || el.parentElement || document.body;
  const parentStyle = getComputedStyle(parent);
  if (parentStyle.position === 'static') {
    parent.style.setProperty('position', 'relative');
    parent.dataset.restyldParentPosition = 'relative';
  }
  const parentRect = parent.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  const startLeft = elRect.left - parentRect.left;
  const startTop = elRect.top - parentRect.top;
  el.style.position = 'absolute';
  el.style.left = `${startLeft}px`;
  el.style.top = `${startTop}px`;
  el.style.width = `${elRect.width}px`;
  el.style.height = `${elRect.height}px`;
  el.style.margin = '0';
  el.setAttribute('data-restyld-modified', '1');
  recordModification(el, {
    styles: {
      position: 'absolute',
      left: startLeft + 'px',
      top: startTop + 'px',
      width: elRect.width + 'px',
      height: elRect.height + 'px',
      margin: '0',
    },
  });
  renderPanel();

  const onMouseDown = (e) => {
    if (e.target !== el && !el.contains(e.target)) return;
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const startLeftDrag = parseFloat(el.style.left) || 0;
    const startTopDrag = parseFloat(el.style.top) || 0;

    const onMouseMove = (e2) => {
      if (rafId != null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const dx = e2.clientX - startX;
        const dy = e2.clientY - startY;
        const newLeft = startLeftDrag + dx;
        const newTop = startTopDrag + dy;
        el.style.left = `${newLeft}px`;
        el.style.top = `${newTop}px`;
        recordModification(el, { styles: { left: el.style.left, top: el.style.top } });
      });
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (rafId != null) cancelAnimationFrame(rafId);
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseup', onMouseUp, { once: true });
  };

  el.addEventListener('mousedown', onMouseDown);
  el.dataset.restyldRepositionListener = '1';
  el._restyldCleanupReposition = () => {
    el.removeEventListener('mousedown', onMouseDown);
    delete el._restyldCleanupReposition;
    delete el.dataset.restyldRepositionListener;
  };
}

function exitRepositionMode() {
  isRepositionMode = false;
  if (selectedElement && selectedElement._restyldCleanupReposition) {
    selectedElement._restyldCleanupReposition();
  }
  renderPanel();
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
  exitRepositionMode();
  hidePanel();
  if (panelRoot && panelRoot.parentNode) {
    panelRoot.parentNode.remove();
    panelRoot = null;
    reactRoot = null;
  }
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
