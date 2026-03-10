import { useState, useEffect, useCallback } from 'react'
import {
  getHostFromUrl,
  getSkinsForHost,
  saveSkin,
  deleteSkin,
  setActiveSkin,
  getActiveSkin,
} from './lib/skinStorage.js'
import './App.css'

function App() {
  const [designMode, setDesignMode] = useState(false)
  const [error, setError] = useState(null)
  const [host, setHost] = useState('')
  const [skins, setSkins] = useState({})
  const [activeSkinId, setActiveSkinId] = useState(null)
  const [saveName, setSaveName] = useState('')
  const [showSaveInput, setShowSaveInput] = useState(false)

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
          const res = await chrome.tabs.sendMessage(tab.id, { type: 'GET_DESIGN_MODE' })
          setDesignMode(res?.designMode ?? false)
        }
        setError(null)
      } catch {
        setDesignMode(false)
        setError(null)
      }
    }
    init()
  }, [loadSkins])

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
      } else {
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['content.js'],
        })
        const res = await chrome.tabs.sendMessage(tab.id, { type: 'ENABLE_DESIGN_MODE' })
        setDesignMode(res?.designMode ?? true)
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
    <div className="popup">
      <h1>ReStyld</h1>
      <p className="subtitle">Style any website</p>
      {host ? (
        <p className="host-label">Skins for: {host}</p>
      ) : (
        <p className="host-label">Open a webpage to manage skins.</p>
      )}
      {error && <p className="error">{error}</p>}

      {host && (
        <div className="skin-list">
          {skinList.length === 0 ? (
            <p className="no-skins">No saved skins yet.</p>
          ) : (
            skinList.map(([id, skin]) => (
              <div key={id} className="skin-item">
                <span className="skin-name" title={skin.name}>
                  {skin.name}
                </span>
                <div className="skin-actions">
                  <button
                    type="button"
                    className="skin-btn load"
                    onClick={() => handleLoadSkin(id)}
                    title="Load and apply"
                  >
                    Load
                  </button>
                  <button
                    type="button"
                    className="skin-btn delete"
                    onClick={() => handleDeleteSkin(id)}
                    title="Delete skin"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {showSaveInput ? (
        <div className="save-row">
          <input
            type="text"
            className="save-input"
            placeholder="Skin name"
            value={saveName}
            onChange={(e) => setSaveName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSaveSkin()}
            autoFocus
          />
          <button type="button" className="skin-btn load" onClick={handleSaveSkin}>
            Save
          </button>
          <button type="button" className="skin-btn delete" onClick={() => setShowSaveInput(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="design-mode-btn secondary"
          onClick={() => setShowSaveInput(true)}
          title="Save current design changes as a new skin"
        >
          Save as new skin
        </button>
      )}

      <button
        type="button"
        className={`design-mode-btn ${designMode ? 'active' : ''}`}
        onClick={toggleDesignMode}
      >
        {designMode ? 'Exit design mode' : 'Enter design mode'}
      </button>

      {host && (
        <button type="button" className="design-mode-btn reset" onClick={handleReset}>
          Reset page to original
        </button>
      )}

      {designMode && (
        <p className="hint">Click any element on the page to select and edit it.</p>
      )}
    </div>
  )
}

export default App
