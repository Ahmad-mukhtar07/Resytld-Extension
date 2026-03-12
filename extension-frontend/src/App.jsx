import { useState, useEffect, useCallback } from 'react'
import {
  getHostFromUrl,
  getSkinsForHost,
  saveSkin,
  deleteSkin,
  setActiveSkin,
  getActiveSkin,
} from './lib/skinStorage.js'
import { stylesToCss, parseCssToStyles } from './lib/styleSerialization.js'
import Sidebar from './components/Sidebar.jsx'
import './App.css'
import './components/Sidebar.css'

function App() {
  const [designMode, setDesignMode] = useState(false)
  const [error, setError] = useState(null)
  const [host, setHost] = useState('')
  const [skins, setSkins] = useState({})
  const [activeSkinId, setActiveSkinId] = useState(null)
  const [saveName, setSaveName] = useState('')
  const [showSaveInput, setShowSaveInput] = useState(false)
  const [selectedElement, setSelectedElement] = useState(null)
  const [currentStyles, setCurrentStyles] = useState({})
  const [editorFlipped, setEditorFlipped] = useState(false)
  const [editorCssValue, setEditorCssValue] = useState('')
  const [openSkinsSection, setOpenSkinsSection] = useState(true)
  const [openEditorSection, setOpenEditorSection] = useState(true)

  const loadSkins = useCallback(async (url) => {
    const h = getHostFromUrl(url)
    setHost(h)
    if (!h) return
    const { skins: list, activeSkinId: active } = await getSkinsForHost(h)
    setSkins(list)
    setActiveSkinId(active)
  }, [])

  useEffect(() => {
    async function init() {
      try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
        if (tab?.url) await loadSkins(tab.url)
        if (tab?.id) {
          try {
            const res = await chrome.tabs.sendMessage(tab.id, { type: 'GET_DESIGN_MODE' })
            setDesignMode(res?.designMode ?? false)
            const sel = await chrome.tabs.sendMessage(tab.id, { type: 'GET_SELECTED_ELEMENT' })
            if (sel?.selected) {
              setSelectedElement(sel.selected)
              setCurrentStyles(sel.selected.initialStyles ?? {})
              setEditorFlipped(false)
              setOpenEditorSection(true)
            } else {
              setSelectedElement(null)
              setCurrentStyles({})
            }
          } catch {
            setDesignMode(false)
            setSelectedElement(null)
            setCurrentStyles({})
          }
        }
        setError(null)
      } catch {
        setDesignMode(false)
        setError(null)
      }
    }
    init()
  }, [loadSkins])

  useEffect(() => {
    const listener = (msg) => {
      if (msg?.type === 'SELECTED_ELEMENT') {
        setSelectedElement(msg.selected ?? null)
        setCurrentStyles(msg.selected?.initialStyles ?? {})
        setEditorFlipped(false)
        if (msg.selected) setOpenEditorSection(true)
      }
    }
    chrome.runtime.onMessage.addListener(listener)
    return () => chrome.runtime.onMessage.removeListener(listener)
  }, [])

  async function sendToTab(message) {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    if (!tab?.id) return null
    return chrome.tabs.sendMessage(tab.id, message)
  }

  async function syncSelection() {
    try {
      const res = await sendToTab({ type: 'GET_SELECTED_ELEMENT' })
      if (res?.selected) {
        setSelectedElement(res.selected)
        setCurrentStyles(res.selected.initialStyles ?? {})
      } else {
        setSelectedElement(null)
        setCurrentStyles({})
      }
    } catch {
      setSelectedElement(null)
      setCurrentStyles({})
    }
  }

  async function handleApplyStyle(styles) {
    setCurrentStyles((prev) => ({ ...prev, ...styles }))
    await sendToTab({ type: 'APPLY_STYLE', styles })
  }

  function handleFlipToCss() {
    setEditorCssValue(stylesToCss(currentStyles))
    setEditorFlipped(true)
  }

  function handleFlipToVisual() {
    setEditorFlipped(false)
  }

  // Live apply CSS as user types (debounced)
  useEffect(() => {
    if (!editorFlipped || !selectedElement) return
    const t = setTimeout(() => {
      const parsed = parseCssToStyles(editorCssValue)
      if (Object.keys(parsed).length) {
        setCurrentStyles((prev) => ({ ...prev, ...parsed }))
        sendToTab({ type: 'APPLY_STYLE', styles: parsed })
      }
    }, 280)
    return () => clearTimeout(t)
  }, [editorFlipped, editorCssValue, selectedElement])

  async function handleDeselect() {
    await sendToTab({ type: 'DESELECT' })
    setSelectedElement(null)
    setCurrentStyles({})
    setEditorFlipped(false)
  }

  async function handleRemove() {
    await sendToTab({ type: 'REMOVE_ELEMENT' })
    setSelectedElement(null)
    setCurrentStyles({})
    setEditorFlipped(false)
  }

  async function ensureContentScript(tabId) {
    try {
      await chrome.tabs.sendMessage(tabId, { type: 'GET_DESIGN_MODE' })
    } catch {
      await chrome.scripting.executeScript({
        target: { tabId },
        files: ['content.js'],
      })
    }
  }

  async function toggleDesignMode() {
    setError(null)
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
      if (!tab?.id) {
        setError('No active tab')
        return
      }
      if (designMode) {
        await chrome.tabs.sendMessage(tab.id, { type: 'DISABLE_DESIGN_MODE' })
        setDesignMode(false)
        setSelectedElement(null)
      } else {
        await ensureContentScript(tab.id)
        const res = await chrome.tabs.sendMessage(tab.id, { type: 'ENABLE_DESIGN_MODE' })
        setDesignMode(res?.designMode ?? true)
        if (res?.designMode) await syncSelection()
      }
    } catch (e) {
      setError(e?.message ?? 'Something went wrong')
    }
  }

  async function handleLoadSkin(skinId) {
    setError(null)
    const skin = skins[skinId]
    if (!skin || !host) return
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
      if (!tab?.id) {
        setError('No active tab')
        return
      }
      await setActiveSkin(host, skinId)
      setActiveSkinId(skinId)
      await ensureContentScript(tab.id)
      const result = await chrome.tabs.sendMessage(tab.id, {
        type: 'APPLY_SKIN',
        modifications: skin.modifications,
      })
      if (result?.missing > 0) {
        setError(`Applied; ${result.missing} element(s) no longer on page (site may have changed).`)
      }
    } catch (e) {
      setError(e?.message ?? 'Failed to load skin')
    }
  }

  async function handleDeleteSkin(skinId) {
    setError(null)
    if (!host) return
    try {
      await deleteSkin(host, skinId)
      await loadSkins((await chrome.tabs.query({ active: true, currentWindow: true }))[0]?.url)
    } catch (e) {
      setError(e?.message ?? 'Failed to delete skin')
    }
  }

  async function handleSaveSkin() {
    setError(null)
    const name = saveName.trim() || 'Unnamed'
    setSaveName('')
    setShowSaveInput(false)
    if (!host) return
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
      if (!tab?.id) {
        setError('No active tab')
        return
      }
      await ensureContentScript(tab.id)
      const res = await chrome.tabs.sendMessage(tab.id, { type: 'GET_MODIFICATIONS' })
      const modifications = res?.modifications ?? []
      if (modifications.length === 0) {
        setError('No changes to save. Make edits in design mode first.')
        return
      }
      const { id } = await saveSkin(host, name, modifications)
      await setActiveSkin(host, id)
      setActiveSkinId(id)
      await loadSkins(tab.url)
    } catch (e) {
      setError(e?.message ?? 'Failed to save skin')
    }
  }

  async function handleReset() {
    setError(null)
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
      if (!tab?.id) {
        setError('No active tab')
        return
      }
      await ensureContentScript(tab.id)
      const active = await getActiveSkin(host)
      const modifications = active?.modifications ?? null
      const result = await chrome.tabs.sendMessage(tab.id, {
        type: 'RESET',
        modifications: modifications || undefined,
      })
      if (result?.missing > 0) {
        setError(`Reset; ${result.missing} element(s) could not be restored.`)
      }
    } catch (e) {
      setError(e?.message ?? 'Failed to reset page')
    }
  }

  const skinList = Object.entries(skins).sort((a, b) => (b[1].createdAt || 0) - (a[1].createdAt || 0))

  return (
    <div className="sidepanel">
      <header className="sidepanel-header">
        <div className="brand">
          <span className="brand-name">ReStyld</span>
          <span className="brand-tagline">Style any website</span>
        </div>
      </header>

      <main className="sidepanel-main">
        {host ? (
          <p className="host-badge" title={host}>
            {host}
          </p>
        ) : (
          <p className="host-empty">Open a webpage to manage skins.</p>
        )}

        {error && (
          <div className="message message-error" role="alert">
            {error}
          </div>
        )}

        {/* Top: Skins & actions (collapsible) */}
        <div className={`collapsible ${openSkinsSection ? 'is-open' : ''}`}>
          <button
            type="button"
            className="collapsible-header"
            onClick={() => setOpenSkinsSection((o) => !o)}
            aria-expanded={openSkinsSection}
          >
            <span className="collapsible-title">Skins & actions</span>
            <span className="collapsible-icon" aria-hidden>{openSkinsSection ? '▼' : '▶'}</span>
          </button>
          <div className="collapsible-body">
            {host && (
              <section className="section">
                <h2 className="section-title">Saved skins</h2>
                {skinList.length === 0 ? (
                  <p className="empty-state">No saved skins yet. Enter design mode and save your first.</p>
                ) : (
                  <ul className="skin-list">
                    {skinList.map(([id, skin]) => (
                      <li key={id} className={`skin-item ${activeSkinId === id ? 'skin-item-active' : ''}`}>
                        <span className="skin-name" title={skin.name}>
                          {skin.name}
                        </span>
                        <div className="skin-actions">
                          <button
                            type="button"
                            className="btn btn-sm btn-primary"
                            onClick={() => handleLoadSkin(id)}
                            title="Load and apply"
                          >
                            Load
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-ghost-danger"
                            onClick={() => handleDeleteSkin(id)}
                            title="Delete skin"
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )}

            {showSaveInput ? (
              <div className="save-inline">
                <input
                  type="text"
                  className="save-input"
                  placeholder="Skin name"
                  value={saveName}
                  onChange={(e) => setSaveName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveSkin()}
                  autoFocus
                />
                <div className="save-inline-actions">
                  <button type="button" className="btn btn-sm btn-primary" onClick={handleSaveSkin}>
                    Save
                  </button>
                  <button type="button" className="btn btn-sm btn-ghost" onClick={() => setShowSaveInput(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                className="btn btn-secondary full"
                onClick={() => setShowSaveInput(true)}
                title="Save current design changes as a new skin"
              >
                Save as new skin
              </button>
            )}

            <button
              type="button"
              className={`btn full ${designMode ? 'btn-danger' : 'btn-primary'}`}
              onClick={toggleDesignMode}
            >
              {designMode ? 'Exit design mode' : 'Enter design mode'}
            </button>

            {host && (
              <button type="button" className="btn btn-ghost full" onClick={handleReset}>
                Reset page to original
              </button>
            )}

            {designMode && (
              <p className="hint">
                Click any element on the page to select and edit it in the inspector.
              </p>
            )}
          </div>
        </div>

        {/* Edit card: one header (Edit + Visual/CSS + flip + collapse), then element info, then flip content */}
        {designMode && selectedElement && (
          <div className={`collapsible collapsible-edit ${openEditorSection ? 'is-open' : ''}`}>
            <div className="editor-card-header">
              <button
                type="button"
                className="editor-card-header-main"
                onClick={() => setOpenEditorSection((o) => !o)}
                aria-expanded={openEditorSection}
              >
                <span className="editor-card-title">Edit</span>
                <span className={`editor-flip-mode-badge editor-flip-mode-badge--active`}>
                  {editorFlipped ? 'CSS' : 'Visual'}
                </span>
              </button>
              <div className="editor-card-header-actions" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  className="editor-flip-btn"
                  onClick={editorFlipped ? handleFlipToVisual : handleFlipToCss}
                  title={editorFlipped ? 'Switch to visual controls' : 'Switch to CSS editor'}
                  aria-label={editorFlipped ? 'Switch to visual controls' : 'Switch to CSS editor'}
                >
                  {editorFlipped ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16M4 12h16M4 17h10"/></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7"/><path d="M8 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4"/></svg>
                  )}
                </button>
                <button
                  type="button"
                  className="editor-flip-btn editor-collapse-btn"
                  onClick={() => setOpenEditorSection((o) => !o)}
                  title={openEditorSection ? 'Collapse' : 'Expand'}
                  aria-label={openEditorSection ? 'Collapse' : 'Expand'}
                >
                  <span className="editor-collapse-icon" aria-hidden>{openEditorSection ? '▼' : '▶'}</span>
                </button>
              </div>
            </div>
            <div className="collapsible-body">
              <div className="editor-flip-card">
                <div className={`editor-flip-inner ${editorFlipped ? 'editor-flip-inner--flipped' : ''}`}>
                  {/* Front: element info + visual controls */}
                  <div className="editor-flip-face editor-flip-front">
                    <div className="editor-element-info">
                      <span className="restyld-sb-tag">&lt;{(selectedElement.elementInfo.tagName || '').toLowerCase() || '—'}&gt;</span>
                      {selectedElement.elementInfo.id && <span className="restyld-sb-ids"> id="{selectedElement.elementInfo.id}"</span>}
                      {selectedElement.elementInfo.className && <span className="restyld-sb-classes"> class="{selectedElement.elementInfo.className}"</span>}
                    </div>
                    <section className="section editor-section editor-flip-face-content">
                      <Sidebar
                        embedded
                        hideHeaderAndInfo
                        elementInfo={selectedElement.elementInfo}
                        initialStyles={currentStyles}
                        onStyleChange={handleApplyStyle}
                        onDeselect={handleDeselect}
                        onRemove={handleRemove}
                      />
                    </section>
                  </div>
                  {/* Back: element info + CSS editor */}
                  <div className="editor-flip-face editor-flip-back">
                    <div className="editor-element-info">
                      <span className="restyld-sb-tag">&lt;{(selectedElement.elementInfo.tagName || '').toLowerCase() || '—'}&gt;</span>
                      {selectedElement.elementInfo.id && <span className="restyld-sb-ids"> id="{selectedElement.elementInfo.id}"</span>}
                      {selectedElement.elementInfo.className && <span className="restyld-sb-classes"> class="{selectedElement.elementInfo.className}"</span>}
                    </div>
                    <div className="editor-flip-face-content editor-css-back">
                      <label className="editor-css-label">Inline styles (one property per line or semicolon-separated)</label>
                      <textarea
                        className="editor-css-textarea"
                        value={editorCssValue}
                        onChange={(e) => setEditorCssValue(e.target.value)}
                        placeholder="background-color: #fff;&#10;width: 100px;&#10;border-radius: 8px;"
                        spellCheck={false}
                        rows={12}
                        title="Changes apply live as you type"
                      />
                      <span className="editor-css-hint">Changes apply live</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
