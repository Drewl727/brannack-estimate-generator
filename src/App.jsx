import { useState } from 'react'
import ApiKeyModal from './components/ApiKeyModal'
import TabNav from './components/TabNav'
import GenerateEstimate from './components/GenerateEstimate'
import PromptLab from './components/PromptLab'

export default function App() {
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_GEMINI_API_KEY || '')
  const [activeTab, setActiveTab] = useState('generate')

  if (!apiKey) {
    return <ApiKeyModal onConfirm={setApiKey} />
  }

  return (
    <div className="flex flex-col h-dvh" style={{ backgroundColor: 'var(--bg)' }}>
      {/* App header */}
      <header style={{ backgroundColor: 'var(--navy)', flexShrink: 0 }}>
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center rounded"
              style={{ width: 32, height: 32, backgroundColor: 'var(--cta)', flexShrink: 0 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <div>
              <p className="font-heading font-semibold text-sm leading-tight" style={{ color: '#ffffff' }}>
                Brannack Electric
              </p>
              <p className="text-xs" style={{ color: '#7c93b0' }}>
                Estimate Generator
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center rounded px-2 py-0.5 text-xs font-heading font-medium"
              style={{ backgroundColor: 'rgba(3,105,161,0.2)', color: '#7ec8e3' }}
            >
              API key active
            </span>
            <button
              onClick={() => setApiKey('')}
              className="text-xs font-heading cursor-pointer transition-colors duration-200 px-2 py-1 rounded"
              style={{ color: '#4e6580', minHeight: 28 }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#94a3b8' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#4e6580' }}
              aria-label="Clear API key and return to key entry"
            >
              Change key
            </button>
          </div>
        </div>

        <TabNav active={activeTab} onChange={setActiveTab} />
      </header>

      {/* Main content area */}
      <main className="flex-1 min-h-0 overflow-hidden">
        {activeTab === 'generate' && (
          <GenerateEstimate apiKey={apiKey} />
        )}
        {activeTab === 'lab' && (
          <div className="h-full overflow-y-auto" style={{ backgroundColor: 'var(--bg)' }}>
            <PromptLab />
          </div>
        )}
      </main>
    </div>
  )
}
