/**
 * ReStyld content script — design mode and DOM manipulation.
 * Pure JavaScript for hover/select/drag; React only for the floating panel UI.
 */
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import ControlPanel from '../components/ControlPanel.jsx';
import panelCss from './panel.css?raw';

// Inject panel styles into the page (content script runs as classic script context)
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
let panelRoot = null;
let reactRoot = null;
let isRepositionMode = false;
let dragState = null;
let rafId = null;

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
}

function getElementDimensions(el) {
  const rect = el.getBoundingClientRect();
  const cs = getComputedStyle(el);
  const w = parseFloat(cs.width) || rect.width;
  const h = parseFloat(cs.height) || rect.height;
  return { width: Math.round(w), height: Math.round(h) };
}

function getPanelPosition(el) {
  const rect = el.getBoundingClientRect();
  return {
    x: rect.left,
    y: rect.top,
    width: rect.width,
    height: rect.height,
  };
}

function renderPanel() {
  if (!panelRoot || !selectedElement || !reactRoot) return;
  const dimensions = getElementDimensions(selectedElement);
  const position = getPanelPosition(selectedElement);

  reactRoot.render(
    <StrictMode>
      <ControlPanel
        position={position}
        initialWidth={dimensions.width}
        initialHeight={dimensions.height}
        onColorChange={(color) => {
          if (selectedElement) selectedElement.style.backgroundColor = color;
        }}
        onSizeChange={({ width, height }) => {
          if (selectedElement) {
            selectedElement.style.width = `${width}px`;
            selectedElement.style.height = `${height}px`;
          }
        }}
        onRemove={() => {
          if (selectedElement) {
            selectedElement.remove();
            selectedElement = null;
            hidePanel();
            exitRepositionMode();
          }
        }}
        onReposition={() => {
          enterRepositionMode();
        }}
        onRepositionDone={() => {
          exitRepositionMode();
          updatePanelPosition();
        }}
        isRepositionMode={isRepositionMode}
      />
    </StrictMode>
  );
}

function updatePanelPosition() {
  if (selectedElement && reactRoot) {
    const dimensions = getElementDimensions(selectedElement);
    const position = getPanelPosition(selectedElement);
    reactRoot.render(
      <StrictMode>
        <ControlPanel
          position={position}
          initialWidth={dimensions.width}
          initialHeight={dimensions.height}
          onColorChange={(color) => {
            if (selectedElement) selectedElement.style.backgroundColor = color;
          }}
          onSizeChange={({ width, height }) => {
            if (selectedElement) {
              selectedElement.style.width = `${width}px`;
              selectedElement.style.height = `${height}px`;
            }
          }}
          onRemove={() => {
            if (selectedElement) {
              selectedElement.remove();
              selectedElement = null;
              hidePanel();
              exitRepositionMode();
            }
          }}
          onReposition={() => enterRepositionMode()}
          onRepositionDone={() => {
            exitRepositionMode();
            updatePanelPosition();
          }}
          isRepositionMode={isRepositionMode}
        />
      </StrictMode>
    );
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
  const rect = el.getBoundingClientRect();
  el.style.position = 'fixed';
  el.style.left = `${rect.left}px`;
  el.style.top = `${rect.top}px`;
  el.style.width = `${rect.width}px`;
  el.style.height = `${rect.height}px`;
  el.style.margin = '0';
  renderPanel();

  const onMouseDown = (e) => {
    if (e.target !== el && !el.contains(e.target)) return;
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const r = el.getBoundingClientRect();
    const startLeft = r.left;
    const startTop = r.top;

    const onMouseMove = (e2) => {
      if (rafId != null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const dx = e2.clientX - startX;
        const dy = e2.clientY - startY;
        el.style.left = `${startLeft + dx}px`;
        el.style.top = `${startTop + dy}px`;
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
  setHoverBorder(e.target);
}

function handleMouseOut(e) {
  if (!designMode) return;
  if (isOurUI(e.target)) return;
  if (hoveredElement && !hoveredElement.contains(e.relatedTarget)) {
    clearHoverBorder();
  }
}

function handleClick(e) {
  if (!designMode) return;
  if (isOurUI(e.target)) return;
  e.preventDefault();
  e.stopPropagation();
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
  }
  return true;
});
