/**
 * DOM path utilities for reliably identifying elements across page loads.
 * Path = array of child indices from document.body to the element.
 */

function getChildIndex(el) {
  let i = 0;
  let prev = el.previousElementSibling;
  while (prev) {
    i++;
    prev = prev.previousElementSibling;
  }
  return i;
}

/**
 * Get a path from root to element as array of child indices.
 * @param {Element} el - Target element
 * @param {Element} [root=document.body] - Root to stop at
 * @returns {number[]}
 */
export function getPath(el, root = document.body) {
  if (!el || !root || !root.contains(el)) return [];
  const path = [];
  let current = el;
  while (current && current !== root) {
    path.unshift(getChildIndex(current));
    current = current.parentElement;
  }
  return path;
}

/**
 * Get element at path from root. Returns null if path is invalid or element not found.
 * @param {Element} root
 * @param {number[]} path
 * @returns {Element|null}
 */
export function getElementByPath(root, path) {
  if (!root || !Array.isArray(path) || path.length === 0) return null;
  let el = root;
  for (let i = 0; i < path.length; i++) {
    const idx = path[i];
    const children = el.children;
    if (idx < 0 || idx >= children.length) return null;
    el = children[idx];
    if (!el) return null;
  }
  return el;
}
