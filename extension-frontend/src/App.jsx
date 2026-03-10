import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [designMode, setDesignMode] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function checkDesignMode() {
      try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
        if (!tab?.id) return
        const res = await chrome.tabs.sendMessage(tab.id, { type: 'GET_DESIGN_MODE' })
        setDesignMode(res?.designMode ?? false)
        setError(null)
      } catch {
        setDesignMode(false)
        setError(null)
      }
    }
    checkDesignMode()
  }, [])

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

  return (
    <div className="popup">
      <h1>ReStyld</h1>
      <p className="subtitle">Style any website</p>
      {error && <p className="error">{error}</p>}
      <button
        type="button"
        className={`design-mode-btn ${designMode ? 'active' : ''}`}
        onClick={toggleDesignMode}
      >
        {designMode ? 'Exit design mode' : 'Enter design mode'}
      </button>
      {designMode && (
        <p className="hint">Click any element on the page to select and edit it.</p>
      )}
    </div>
  )
}

export default App
