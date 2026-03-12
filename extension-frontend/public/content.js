/**
 * ReStyld content script: design mode, viewport frame, selection, modifications.
 * Injected via scripting.executeScript when user enters design mode.
 */
(function () {
  'use strict';

  // --- Viewport frame ---
  var restyldFrame = null;
  var restyldViewport = null;
  var restyldFrameObs = null;

  function isOurNode(el) {
    if (!el || el.nodeType !== 1) return true;
    if (el.id === 'restyld-viewport-frame' || el.id === 'restyld-viewport') return true;
    if (el.getAttribute('data-restyld-viewport-frame') || el.getAttribute('data-restyld-viewport')) return true;
    if (el.getAttribute('data-restyld-background-layer')) return true;
    if (el.classList && (
      el.classList.contains('restyld-guides-overlay') ||
      el.classList.contains('restyld-resize-handles') ||
      el.classList.contains('restyld-toolbar-overlay')
    )) return true;
    return false;
  }

  function applyViewportFrame() {
    if (restyldViewport && document.body.contains(restyldViewport)) return;
    var frame = document.createElement('div');
    frame.id = 'restyld-viewport-frame';
    frame.setAttribute('data-restyld-viewport-frame', '1');
    frame.style.cssText = 'position:fixed;inset:0;z-index:0;background:#e5e7eb;box-sizing:border-box';
    var viewport = document.createElement('div');
    viewport.id = 'restyld-viewport';
    viewport.setAttribute('data-restyld-viewport', '1');
    viewport.style.cssText = 'position:fixed;left:20px;top:20px;right:20px;bottom:20px;z-index:1;overflow:auto;transform:translateZ(0);background:#fff;box-sizing:border-box';
    var toMove = [];
    for (var i = 0; i < document.body.children.length; i++) {
      var c = document.body.children[i];
      if (isOurNode(c)) continue;
      toMove.push(c);
    }
    for (var j = 0; j < toMove.length; j++) viewport.appendChild(toMove[j]);
    document.body.appendChild(frame);
    document.body.appendChild(viewport);
    restyldFrame = frame;
    restyldViewport = viewport;
    restyldFrameObs = new MutationObserver(function (mutations) {
      for (var mi = 0; mi < mutations.length; mi++) {
        for (var ni = 0; ni < mutations[mi].addedNodes.length; ni++) {
          var n = mutations[mi].addedNodes[ni];
          if (n.nodeType !== 1) continue;
          if (isOurNode(n)) continue;
          restyldViewport.appendChild(n);
        }
      }
    });
    restyldFrameObs.observe(document.body, { childList: true });
  }

  function removeViewportFrame() {
    if (restyldFrameObs) {
      restyldFrameObs.disconnect();
      restyldFrameObs = null;
    }
    if (restyldViewport) {
      while (restyldViewport.firstChild) document.body.appendChild(restyldViewport.firstChild);
      restyldViewport.remove();
      restyldViewport = null;
    }
    if (restyldFrame) {
      restyldFrame.remove();
      restyldFrame = null;
    }
  }

  // --- Path helpers ---
  function getChildIndex(el) {
    var i = 0;
    var prev = el.previousElementSibling;
    while (prev) { i++; prev = prev.previousElementSibling; }
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
    if (!root || !Array.isArray(path) || path.length === 0) return root;
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

  var STYLE_KEYS = ['position', 'left', 'top', 'width', 'height', 'backgroundColor', 'margin', 'opacity', 'borderRadius', 'transform', 'fontFamily', 'fontSize', 'fontWeight', 'color', 'textAlign', 'padding', 'borderStyle', 'borderWidth', 'borderColor', 'boxShadow', 'backdropFilter'];
  var designMode = false;
  var selectedEl = null;
  var hoverEl = null;
  var modifications = {};
  var removedList = [];
  var BG_PATH = ['__restyld_bg_layer'];
  var bgLayerEl = null;
  var bgStyles = {};

  function pathKey(path) {
    return Array.isArray(path) ? (path.length === 1 && path[0] === BG_PATH[0] ? '__restyld_bg_layer' : path.join(',')) : '';
  }

  function getElementInfo(el) {
    return el ? { tagName: el.tagName || '', id: el.id || '', className: (el.className && typeof el.className === 'string' ? el.className : '') || '' } : {};
  }

  function getStyles(el) {
    if (!el) return {};
    var cs = getComputedStyle(el);
    var r = el.getBoundingClientRect();
    function str(v) { return v != null && v !== '' ? String(v) : undefined; }
    return {
      backgroundColor: str(el.style.backgroundColor) || cs.backgroundColor,
      opacity: str(el.style.opacity) != null ? el.style.opacity : cs.opacity,
      width: str(el.style.width) || (r.width ? r.width + 'px' : undefined),
      height: str(el.style.height) || (r.height ? r.height + 'px' : undefined),
      borderRadius: str(el.style.borderRadius) || cs.borderRadius,
      transform: str(el.style.transform) || cs.transform,
      fontFamily: str(el.style.fontFamily) || cs.fontFamily,
      fontSize: str(el.style.fontSize) || cs.fontSize,
      fontWeight: str(el.style.fontWeight) || cs.fontWeight,
      color: str(el.style.color) || cs.color,
      textAlign: str(el.style.textAlign) || cs.textAlign,
      padding: str(el.style.padding) || cs.padding,
      margin: str(el.style.margin) || cs.margin,
      borderStyle: str(el.style.borderStyle) || cs.borderStyle,
      borderWidth: str(el.style.borderWidth) || cs.borderWidth,
      borderColor: str(el.style.borderColor) || cs.borderColor,
      boxShadow: str(el.style.boxShadow) || cs.boxShadow,
      backdropFilter: str(el.style.backdropFilter) || cs.backdropFilter,
      position: str(el.style.position),
      left: str(el.style.left),
      top: str(el.style.top)
    };
  }

  function isIgnored(el) {
    return !el || el === document.documentElement || el === document.body;
  }

  function isReStyldUI(el) {
    return el && (el.closest && (el.closest('.restyld-guides-overlay') || el.closest('.restyld-resize-handles') || el.closest('.restyld-toolbar-overlay')));
  }

  function clearHover() {
    if (hoverEl && hoverEl.style) {
      hoverEl.style.outline = '';
      hoverEl.style.outlineOffset = '';
      hoverEl = null;
    }
  }

  function clearSelection() {
    if (selectedEl && selectedEl.style) {
      selectedEl.style.outline = '';
      selectedEl.style.outlineOffset = '';
      selectedEl.classList.remove('restyld-selected');
      selectedEl = null;
    }
  }

  function setHover(el) {
    if (el === selectedEl || isIgnored(el)) return;
    clearHover();
    hoverEl = el;
    hoverEl.style.outline = '2px solid rgba(255, 0, 0, 0.5)';
    hoverEl.style.outlineOffset = '2px';
  }

  function setSelected(el) {
    if (el && isIgnored(el)) return;
    clearSelection();
    selectedEl = el;
    if (selectedEl) {
      selectedEl.style.outline = '3px solid #2563eb';
      selectedEl.style.outlineOffset = '2px';
      selectedEl.classList.add('restyld-selected');
    }
    notifySelection();
  }

  function notifySelection() {
    try {
      chrome.runtime.sendMessage({
        type: 'SELECTED_ELEMENT',
        selected: selectedEl ? { elementInfo: getElementInfo(selectedEl), initialStyles: getStyles(selectedEl) } : null,
        isRepositionMode: false
      });
    } catch (_) {}
  }

  function getModificationsArray() {
    var list = [];
    var k;
    for (k in modifications) if (Object.prototype.hasOwnProperty.call(modifications, k)) list.push(modifications[k]);
    if (Object.keys(bgStyles).length > 0) list.push({ path: BG_PATH.slice(), styles: bgStyles });
    var rem = removedList.map(function (r) { return { path: r.path, removed: true, removedHtml: r.html }; });
    return list.concat(rem);
  }

  function ensureBgLayer() {
    if (bgLayerEl && document.body.contains(bgLayerEl)) return bgLayerEl;
    var el = document.createElement('div');
    el.setAttribute('data-restyld-background-layer', '1');
    el.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;z-index:-999999;pointer-events:none;';
    document.body.insertBefore(el, document.body.firstChild);
    bgLayerEl = el;
    return el;
  }

  function removeBgLayer() {
    if (bgLayerEl && bgLayerEl.parentNode) bgLayerEl.parentNode.removeChild(bgLayerEl);
    bgLayerEl = null;
    bgStyles = {};
  }

  function applyModification(mod, result) {
    var el = mod.path[0] === BG_PATH[0] ? ensureBgLayer() : getElementByPath(document.body, mod.path);
    if (!el) { result.missing++; return false; }
    if (mod.removed) {
      result.removed++;
      el.remove();
      return true;
    }
    if (mod.styles && typeof mod.styles === 'object') {
      var s = el.style;
      for (var i = 0; i < STYLE_KEYS.length; i++) {
        var key = STYLE_KEYS[i];
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

  function applyModifications(list) {
    var result = { applied: 0, removed: 0, missing: 0 };
    if (!Array.isArray(list)) return result;
    for (var i = 0; i < list.length; i++) {
      var mod = list[i];
      if (!mod || !Array.isArray(mod.path)) continue;
      if (mod.path[0] === BG_PATH[0]) {
        ensureBgLayer();
        bgLayerEl.setAttribute('data-restyld-modified', '1');
        if (mod.styles && typeof mod.styles === 'object') {
          bgStyles = {};
          for (var k in mod.styles) if (Object.prototype.hasOwnProperty.call(mod.styles, k)) {
            bgLayerEl.style[k] = mod.styles[k] != null ? mod.styles[k] : '';
            bgStyles[k] = mod.styles[k];
          }
          result.applied++;
        }
        continue;
      }
      var el = getElementByPath(document.body, mod.path);
      if (!el) { result.missing++; continue; }
      if (mod.removed) {
        removedList.push({ path: mod.path.slice(), html: mod.removedHtml || '' });
        el.remove();
        result.removed++;
        continue;
      }
      if (mod.styles && typeof mod.styles === 'object') {
        for (var key in mod.styles) if (Object.prototype.hasOwnProperty.call(mod.styles, key)) {
          el.style[key] = mod.styles[key] != null ? String(mod.styles[key]) : '';
        }
        el.setAttribute('data-restyld-modified', '1');
        result.applied++;
      }
    }
    return result;
  }

  function updateStore(el, payload) {
    if (!el || (el !== document.body && !document.body.contains(el))) return;
    var path = getPath(el, document.body);
    var key = pathKey(path);
    var rec = modifications[key] || { path: path, styles: {} };
    if (payload.removed !== undefined) {
      rec.removed = payload.removed;
      rec.removedHtml = payload.removedHtml;
    }
    if (payload.styles && typeof payload.styles === 'object') Object.assign(rec.styles, payload.styles);
    modifications[key] = rec;
  }

  function clearElementStyles(el) {
    for (var i = 0; i < STYLE_KEYS.length; i++) el.style[STYLE_KEYS[i]] = '';
    el.removeAttribute('data-restyld-modified');
  }

  function resetPage(modList) {
    var result = { cleared: 0, restored: 0, missing: 0 };
    var toRestore = (modList || []).filter(function (m) { return m && m.removed && m.removedHtml && Array.isArray(m.path); });
    var toClear = (modList || []).filter(function (m) { return !m || !m.removed || !m.removedHtml; });
    toRestore.sort(function (a, b) {
      var sa = Array.isArray(a.path) ? a.path.join(',') : '';
      var sb = Array.isArray(b.path) ? b.path.join(',') : '';
      return sb.localeCompare(sa);
    });
    for (var i = 0; i < toRestore.length; i++) {
      var mod = toRestore[i];
      var parentPath = mod.path.slice(0, -1);
      var idx = mod.path[mod.path.length - 1];
      var parent = parentPath.length === 0 ? document.body : getElementByPath(document.body, parentPath);
      if (!parent) { result.missing++; continue; }
      try {
        var div = document.createElement('div');
        div.innerHTML = mod.removedHtml;
        var child = div.firstElementChild;
        if (child) {
          child.style.outline = '';
          child.style.outlineOffset = '';
          child.classList.remove('restyld-selected');
          var ref = parent.children[idx] || null;
          parent.insertBefore(child, ref);
          result.restored++;
        }
      } catch (_) { result.missing++; }
    }
    for (var j = 0; j < toClear.length; j++) {
      var m = toClear[j];
      if (!m || !Array.isArray(m.path) || (m.removed && m.removedHtml)) continue;
      var target = getElementByPath(document.body, m.path);
      if (!target) { result.missing++; continue; }
      clearElementStyles(target);
      result.cleared++;
    }
    removeBgLayer();
    modifications = {};
    removedList = [];
    return result;
  }

  function enableDesignMode() {
    applyViewportFrame();
    if (designMode) return;
    designMode = true;
    document.addEventListener('mouseover', onMouseOver, true);
    document.addEventListener('mouseout', onMouseOut, true);
    document.addEventListener('click', onClick, true);
  }

  function disableDesignMode() {
    removeViewportFrame();
    if (!designMode) return;
    designMode = false;
    document.removeEventListener('mouseover', onMouseOver, true);
    document.removeEventListener('mouseout', onMouseOut, true);
    document.removeEventListener('click', onClick, true);
    clearHover();
    clearSelection();
    notifySelection();
  }

  function onMouseOver(e) {
    if (!designMode || isReStyldUI(e.target)) return;
    if (isIgnored(e.target)) return;
    setHover(e.target);
  }

  function onMouseOut(e) {
    if (!designMode || isReStyldUI(e.target)) return;
    if (hoverEl && !hoverEl.contains(e.relatedTarget)) clearHover();
  }

  function onClick(e) {
    if (!designMode || isReStyldUI(e.target)) return;
    e.preventDefault();
    e.stopPropagation();
    clearHover();
    if (isIgnored(e.target)) {
      setSelected(null);
      return;
    }
    if (selectedEl && e.target !== selectedEl && !selectedEl.contains(e.target)) return;
    setSelected(e.target);
  }

  chrome.runtime.onMessage.addListener(function (msg, _sender, sendResponse) {
    try {
      if (msg.type === 'ENABLE_DESIGN_MODE') {
        enableDesignMode();
        sendResponse({ ok: true, designMode: true });
      } else if (msg.type === 'DISABLE_DESIGN_MODE') {
        disableDesignMode();
        sendResponse({ ok: true, designMode: false });
      } else if (msg.type === 'GET_DESIGN_MODE') {
        sendResponse({ designMode: designMode });
      } else if (msg.type === 'GET_SELECTED_ELEMENT') {
        if (!selectedEl || !document.body.contains(selectedEl)) {
          sendResponse({ selected: null });
        } else {
          sendResponse({ selected: { elementInfo: getElementInfo(selectedEl), initialStyles: getStyles(selectedEl) }, isRepositionMode: false });
        }
      } else if (msg.type === 'GET_PAGE_STYLES') {
        sendResponse({ styles: getStyles(document.body) });
      } else if (msg.type === 'APPLY_STYLE') {
        var styles = msg.styles || {};
        if (selectedEl && document.body.contains(selectedEl)) {
          selectedEl.setAttribute('data-restyld-modified', '1');
          for (var key in styles) if (Object.prototype.hasOwnProperty.call(styles, key) && styles[key] != null && styles[key] !== '') {
            selectedEl.style[key] = styles[key];
          }
          updateStore(selectedEl, { styles: styles });
        }
        sendResponse({ ok: true });
      } else if (msg.type === 'DESELECT') {
        clearSelection();
        notifySelection();
        sendResponse({ ok: true });
      } else if (msg.type === 'REMOVE_ELEMENT') {
        if (selectedEl) {
          var html = selectedEl.outerHTML;
          var path = getPath(selectedEl, document.body);
          removedList.push({ path: path, html: html });
          updateStore(selectedEl, { removed: true, removedHtml: html });
          selectedEl.remove();
          selectedEl = null;
        }
        clearSelection();
        notifySelection();
        sendResponse({ ok: true });
      } else if (msg.type === 'GET_MODIFICATIONS') {
        sendResponse({ ok: true, modifications: getModificationsArray() });
      } else if (msg.type === 'APPLY_SKIN') {
        var list = msg.modifications || [];
        removeBgLayer();
        var applyResult = { applied: 0, removed: 0, missing: 0 };
        for (var ai = 0; ai < list.length; ai++) {
          var mod = list[ai];
          if (!mod || !Array.isArray(mod.path)) continue;
          if (mod.path[0] === BG_PATH[0]) {
            ensureBgLayer();
            bgLayerEl.setAttribute('data-restyld-modified', '1');
            if (mod.styles && typeof mod.styles === 'object') {
              bgStyles = {};
              for (var bk in mod.styles) {
                bgLayerEl.style[bk] = mod.styles[bk] != null ? mod.styles[bk] : '';
                bgStyles[bk] = mod.styles[bk];
              }
              applyResult.applied++;
            }
            continue;
          }
          var target = getElementByPath(document.body, mod.path);
          if (!target) { applyResult.missing++; continue; }
          if (mod.removed) {
            target.remove();
            applyResult.removed++;
            continue;
          }
          if (mod.styles && typeof mod.styles === 'object') {
            for (var sk in mod.styles) target.style[sk] = mod.styles[sk] != null ? mod.styles[sk] : '';
            target.setAttribute('data-restyld-modified', '1');
            applyResult.applied++;
          }
        }
        modifications = {};
        removedList = [];
        list.forEach(function (m) {
          if (m && Array.isArray(m.path)) modifications[pathKey(m.path)] = { path: m.path.slice(), styles: (m.styles && typeof m.styles === 'object') ? Object.assign({}, m.styles) : {}, removed: m.removed, removedHtml: m.removedHtml };
        });
        if (Object.keys(bgStyles).length > 0) modifications['__restyld_bg_layer'] = { path: BG_PATH.slice(), styles: Object.assign({}, bgStyles) };
        sendResponse({ ok: true, applied: applyResult.applied, removed: applyResult.removed, missing: applyResult.missing });
      } else if (msg.type === 'RESET') {
        var toReset = msg.modifications != null ? msg.modifications : [];
        var res = resetPage(Array.isArray(toReset) ? toReset : []);
        modifications = {};
        removedList = [];
        sendResponse({ ok: true, cleared: res.cleared, restored: res.restored, missing: res.missing });
      } else {
        sendResponse({});
      }
    } catch (err) {
      sendResponse({ error: err.message });
    }
    return true;
  });
})();
