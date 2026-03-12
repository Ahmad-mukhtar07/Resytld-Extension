/**
 * Serialize/parse between ReStyld style objects and CSS rule strings.
 * Only includes keys used by the extension (applySkin STYLE_KEYS).
 */
const STYLE_KEYS = [
  'position', 'left', 'top', 'width', 'height', 'backgroundColor', 'margin',
  'opacity', 'borderRadius', 'transform',
  'fontFamily', 'fontSize', 'fontWeight', 'color', 'textAlign',
  'padding', 'borderStyle', 'borderWidth', 'borderColor',
  'boxShadow', 'backdropFilter',
];

function camelToKebab(str) {
  return str.replace(/([A-Z])/g, (m) => `-${m.toLowerCase()}`);
}

function kebabToCamel(str) {
  return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

/**
 * @param {Record<string, string>} styles
 * @returns {string} CSS declaration block (no selector), e.g. "width: 100px;\nheight: 50px;"
 */
export function stylesToCss(styles) {
  if (!styles || typeof styles !== 'object') return '';
  const lines = [];
  for (const key of STYLE_KEYS) {
    const value = styles[key];
    if (value != null && value !== '') {
      lines.push(`  ${camelToKebab(key)}: ${value};`);
    }
  }
  return lines.join('\n') || '';
}

/**
 * @param {string} cssText - CSS declaration block (e.g. "width: 100px; height: 50px;")
 * @returns {Record<string, string>} Style object with camelCase keys
 */
export function parseCssToStyles(cssText) {
  const out = {};
  if (typeof cssText !== 'string') return out;
  const decls = cssText.split(';').map((s) => s.trim()).filter(Boolean);
  for (const decl of decls) {
    const colon = decl.indexOf(':');
    if (colon === -1) continue;
    const key = kebabToCamel(decl.slice(0, colon).trim());
    const value = decl.slice(colon + 1).trim();
    if (STYLE_KEYS.includes(key) && value) out[key] = value;
  }
  return out;
}
