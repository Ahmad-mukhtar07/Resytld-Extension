import { useState, useEffect, useCallback } from 'react'
import {
  getHostFromUrl,
  getSkinsForHost,
  saveSkin,
  deleteSkin,
  setActiveSkin,
  getActiveSkin,
} from './lib/skinStorage.js'
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
  const [isRepositionMode, setIsRepositionMode] = useState(false)
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
              setIsRepositionMode(sel.isRepositionMode ?? false)
            } else {
              setSelectedElement(null)
              setIsRepositionMode(false)
            }
          } catch {
            setDesignMode(false)
            setSelectedElement(null)
            setIsRepositionMode(false)
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
        if (msg.selected) {
          setIsRepositionMode(msg.isRepositionMode ?? false)
          setOpenEditorSection(true)
        } else {
          setIsRepositionMode(false)
        }
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
        setIsRepositionMode(res.isRepositionMode ?? false)
      } else {
        setSelectedElement(null)
        setIsRepositionMode(false)
      }
    } catch {
      setSelectedElement(null)
      setIsRepositionMode(false)
    }
  }

  async function handleApplyStyle(styles) {
    await sendToTab({ type: 'APPLY_STYLE', styles })
  }

  async function handleDeselect() {
    await sendToTab({ type: 'DESELECT' })
    setSelectedElement(null)
    setIsRepositionMode(false)
  }

  async function handleRemove() {
    await sendToTab({ type: 'REMOVE_ELEMENT' })
    setSelectedElement(null)
    setIsRepositionMode(false)
  }

  async function handleRepositionStart() {
    await sendToTab({ type: 'REPOSITION_START' })
    setIsRepositionMode(true)
  }

  async function handleRepositionDone() {
    await sendToTab({ type: 'REPOSITION_DONE' })
    setIsRepositionMode(false)
    await syncSelection()
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
        setIsRepositionMode(false)
      } else {
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['content.js'],
        })
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

        {/* Bottom: Edit element (collapsible, only when selection exists) */}
        {designMode && selectedElement && (
          <div className={`collapsible ${openEditorSection ? 'is-open' : ''}`}>
            <button
              type="button"
              className="collapsible-header"
              onClick={() => setOpenEditorSection((o) => !o)}
              aria-expanded={openEditorSection}
            >
              <span className="collapsible-title">Edit element</span>
              <span className="collapsible-icon" aria-hidden>{openEditorSection ? '▼' : '▶'}</span>
            </button>
            <div className="collapsible-body">
              <section className="section editor-section">
                <Sidebar
                  embedded
                  elementInfo={selectedElement.elementInfo}
                  initialStyles={selectedElement.initialStyles}
                  onStyleChange={handleApplyStyle}
                  onDeselect={handleDeselect}
                  onRemove={handleRemove}
                  onReposition={handleRepositionStart}
                  onRepositionDone={handleRepositionDone}
                  isRepositionMode={isRepositionMode}
                />
              </section>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
