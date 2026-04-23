import { useState, useCallback } from 'react'
import InputForm from './InputForm'
import EstimatePreview from './EstimatePreview'
import { generateEstimate } from '../lib/gemini'

export default function GenerateEstimate({ apiKey }) {
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [estimate, setEstimate] = useState(null)
  const [rawError, setRawError] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [lastForm, setLastForm] = useState(null)

  const run = useCallback(async (formData) => {
    setLastForm(formData)
    setStatus('loading')
    setEstimate(null)
    setRawError(null)
    setErrorMsg('')

    try {
      const { data, raw } = await generateEstimate(apiKey, formData)
      if (data) {
        setEstimate(data)
        setStatus('success')
      } else {
        setRawError(raw)
        setErrorMsg('The API returned a response that could not be parsed as JSON.')
        setStatus('error')
      }
    } catch (err) {
      setErrorMsg(err?.message || 'API request failed. Check your key and network connection.')
      setStatus('error')
    }
  }, [apiKey])

  function handleRetry() {
    if (lastForm) run(lastForm)
  }

  function handleClear() {
    setStatus('idle')
    setEstimate(null)
    setRawError(null)
    setErrorMsg('')
  }

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-0">
      {/* Left panel — form */}
      <div
        className="lg:w-80 xl:w-96 flex-shrink-0 overflow-y-auto"
        style={{ backgroundColor: 'var(--navy)' }}
      >
        <div className="p-6">
          <InputForm onSubmit={run} loading={status === 'loading'} />
        </div>
      </div>

      {/* Divider */}
      <div className="hidden lg:block w-px flex-shrink-0" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }} />

      {/* Right panel — preview */}
      <div className="flex-1 overflow-y-auto p-6" style={{ backgroundColor: 'var(--bg)' }}>
        <EstimatePreview
          status={status}
          estimate={status === 'success' ? estimate : (status === 'error' ? errorMsg : null)}
          rawError={rawError}
          onRetry={handleRetry}
          onClear={handleClear}
        />
      </div>
    </div>
  )
}
