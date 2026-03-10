/**
 * Auto-apply content script: runs on page load, applies the active saved skin for this host.
 * Uses chrome.storage.sync; no React. Handles missing elements gracefully.
 */
(function () {
  function getChildIndex(el) {
    let i = 0;
    let prev = el.previousElementSibling;
    while (prev) {
      i++;
      prev = prev.previousElementSibling;
    }
    return i;
  }

  function getPath(el, root) {
    if (!el || !root || !root.contains(el)) return [];
    var path = [];
    var current = el;
    while (current && current !== root) {
      path.unshift(getChildIndex(current));
      current = current.parentElement;
    }
    return path;
  }

  function getElementByPath(root, path) {
    if (!root || !Array.isArray(path) || path.length === 0) return null;
    var el = root;
    for (var i = 0; i < path.length; i++) {
      var idx = path[i];
      var children = el.children;
      if (idx < 0 || idx >= children.length) return null;
      el = children[idx];
      if (!el) return null;
    }
    return el;
  }

  var ROOT = document.body;
  var STYLE_KEYS = ['position', 'left', 'top', 'width', 'height', 'backgroundColor', 'margin'];

  function applyOne(mod, result) {
    var el = getElementByPath(ROOT, mod.path);
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
      var s = el.style;
      for (var k = 0; k < STYLE_KEYS.length; k++) {
        var key = STYLE_KEYS[k];
        if (Object.prototype.hasOwnProperty.call(mod.styles, key)) {
          var v = mod.styles[key];
          s[key] = v != null ? String(v) : '';
        }
      }
      el.setAttribute('data-restyld-modified', '1');
      result.applied++;
    }
    return true;
  }

  function applyModifications(modifications) {
    var result = { applied: 0, removed: 0, missing: 0 };
    if (!Array.isArray(modifications)) return result;
    for (var i = 0; i < modifications.length; i++) {
      var mod = modifications[i];
      if (!mod || !Array.isArray(mod.path)) continue;
      applyOne(mod, result);
    }
    return result;
  }

  function run() {
    var host = typeof location !== 'undefined' && location.host ? location.host : '';
    if (!host) return;
    chrome.storage.sync.get('restyld_skins', function (data) {
      try {
        var all = data.restyld_skins || {};
        var hostData = all[host];
        if (!hostData || !hostData.activeSkinId) return;
        var skin = hostData.skins && hostData.skins[hostData.activeSkinId];
        if (!skin || !Array.isArray(skin.modifications)) return;
        applyModifications(skin.modifications);
      } catch (e) {
        console.error('[ReStyld] auto-apply:', e);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
