/**
 * Apply or revert skin modifications to the DOM.
 * Used by both the design-mode content script and the auto-apply script.
 */
import { getElementByPath } from './pathUtils.js';

const ROOT = document.body;

const STYLE_KEYS = [
  'position', 'left', 'top', 'width', 'height', 'backgroundColor', 'margin',
  'opacity', 'borderRadius', 'transform',
  'fontFamily', 'fontSize', 'fontWeight', 'color', 'textAlign',
  'padding', 'borderStyle', 'borderWidth', 'borderColor',
  'boxShadow', 'backdropFilter',
];

/**
 * Apply one modification: set styles or remove element.
 * @param {Object} mod - { path, styles?, removed?, removedHtml? }
 * @param {{ applied: number, removed: number, missing: number }} result - Mutable result counters
 * @returns {boolean} - true if applied (element found), false if element missing
 */
function applyOne(mod, result) {
  const el = getElementByPath(ROOT, mod.path);
  if (!el) {
    result.missing++;
    return false;
  }
  if (mod.removed) {
    el.remove();
    result.removed++;
    return true;
  }
  if (mod.styles && typeof mod.styles === 'object') {
    const s = el.style;
    for (const key of STYLE_KEYS) {
      if (Object.prototype.hasOwnProperty.call(mod.styles, key)) {
        const v = mod.styles[key];
        s[key] = v != null ? String(v) : '';
      }
    }
    el.setAttribute('data-restyld-modified', '1');
    result.applied++;
  }
  return true;
}

/**
 * Apply a list of modifications. Elements not found are skipped (e.g. site structure changed).
 * @param {Array<{ path: number[], styles?: object, removed?: boolean, removedHtml?: string }>} modifications
 * @returns {{ applied: number, removed: number, missing: number }}
 */
export function applyModifications(modifications) {
  const result = { applied: 0, removed: 0, missing: 0 };
  if (!Array.isArray(modifications)) return result;
  for (const mod of modifications) {
    if (!mod || !Array.isArray(mod.path)) continue;
    applyOne(mod, result);
  }
  return result;
}

/**
 * Clear ReStyld-applied styles from an element.
 * @param {Element} el
 */
function clearElementStyles(el) {
  const s = el.style;
  for (const key of STYLE_KEYS) {
    s[key] = '';
  }
  el.removeAttribute('data-restyld-modified');
}

/**
 * Reset page: remove all applied styles from elements we marked, and re-insert removed elements.
 * Removed elements are restored in descending path order so insertions don't shift later paths.
 * @param {Array<{ path: number[], styles?, removed?: boolean, removedHtml?: string }>} modifications - Same format as saved
 * @returns {{ cleared: number, restored: number, missing: number }}
 */
export function resetModifications(modifications) {
  const result = { cleared: 0, restored: 0, missing: 0 };
  if (!Array.isArray(modifications)) return result;
  const pathKey = (p) => (Array.isArray(p) ? p.join(',') : '');
  const removed = modifications.filter((mod) => mod && mod.removed && mod.removedHtml && Array.isArray(mod.path));
  const rest = modifications.filter((mod) => !mod || !mod.removed || !mod.removedHtml);
  removed.sort((a, b) => pathKey(b.path).localeCompare(pathKey(a.path)));
  for (const mod of removed) {
    const parentPath = mod.path.slice(0, -1);
    const childIndex = mod.path[mod.path.length - 1];
    const parent = parentPath.length === 0 ? ROOT : getElementByPath(ROOT, parentPath);
    if (!parent) {
      result.missing++;
      continue;
    }
    try {
      const wrap = document.createElement('div');
      wrap.innerHTML = mod.removedHtml;
      const child = wrap.firstElementChild;
      if (child) {
        child.style.outline = '';
        child.style.outlineOffset = '';
        child.classList.remove('restyld-selected');
        const ref = parent.children[childIndex] || null;
        parent.insertBefore(child, ref);
        result.restored++;
      }
    } catch {
      result.missing++;
    }
  }
  for (const mod of rest) {
    if (!mod || !Array.isArray(mod.path)) continue;
    if (mod.removed && mod.removedHtml) continue;
    const el = getElementByPath(ROOT, mod.path);
    if (!el) {
      result.missing++;
      continue;
    }
    clearElementStyles(el);
    result.cleared++;
  }
  return result;
}

/**
 * Find all elements with data-restyld-modified and clear their overrides (quick reset without modification list).
 */
export function clearAllMarkedStyles() {
  const nodes = document.querySelectorAll('[data-restyld-modified="1"]');
  nodes.forEach(clearElementStyles);
  return nodes.length;
}
