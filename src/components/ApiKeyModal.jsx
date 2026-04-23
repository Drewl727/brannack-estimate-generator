import { useState } from 'react'

export default function ApiKeyModal({ onConfirm }) {
  const [key, setKey] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = key.trim()
    if (!trimmed) {
      setError('Please enter your Gemini API key.')
      return
    }
    onConfirm(trimmed)
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
    >
      <div
        className="w-full max-w-md rounded-xl p-8"
        style={{ backgroundColor: 'var(--navy)', boxShadow: '0 24px 48px rgba(0,0,0,0.5)' }}
      >
        {/* Logo mark */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="flex items-center justify-center rounded-lg"
            style={{ width: 44, height: 44, backgroundColor: 'var(--cta)' }}
          >
            <BoltIcon />
          </div>
          <div>
            <p className="font-heading text-white font-semibold text-sm leading-tight">
              Brannack Electric
            </p>
            <p className="text-xs" style={{ color: '#7c93b0' }}>
              Estimate Generator
            </p>
          </div>
        </div>

        <h2 className="font-heading text-white text-xl font-semibold mb-1 text-balance">
          Enter your Gemini API Key
        </h2>
        <p className="text-sm mb-6 text-pretty" style={{ color: '#7c93b0' }}>
          Your key is stored only in memory for this session and never sent to any server other than Google's API.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="api-key" className="label">
            API Key
          </label>
          <input
            id="api-key"
            type="password"
            className="input-field mb-1"
            placeholder="AIza..."
            value={key}
            onChange={(e) => {
              setKey(e.target.value)
              setError('')
            }}
            autoComplete="off"
          />
          {error && (
            <p className="text-xs mb-3 mt-1" style={{ color: '#f87171' }}>
              {error}
            </p>
          )}

          <button type="submit" className="btn-primary mt-4">
            Continue
          </button>
        </form>

        <p className="text-xs mt-4 text-center" style={{ color: '#4e6580' }}>
          Get a free key at{' '}
          <span className="underline" style={{ color: '#7c93b0' }}>
            aistudio.google.com
          </span>
        </p>
      </div>
    </div>
  )
}

function BoltIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  )
}
