import { useState } from 'react'

const JOB_TYPES = [
  'Panel Upgrade',
  'Service Upgrade',
  'Rewire',
  'New Construction',
  'EV Charger Install',
  'Other',
]

const EMPTY = {
  clientName: '',
  jobAddress: '',
  jobType: 'Panel Upgrade',
  scope: '',
  materials: '',
  hours: '',
  notes: '',
}

export default function InputForm({ onSubmit, loading }) {
  const [form, setForm] = useState(EMPTY)

  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 h-full"
      noValidate
    >
      <div>
        <label htmlFor="clientName" className="label">Client Name</label>
        <input
          id="clientName"
          type="text"
          className="input-field"
          placeholder="John Smith"
          value={form.clientName}
          onChange={set('clientName')}
          required
        />
      </div>

      <div>
        <label htmlFor="jobAddress" className="label">Job Address</label>
        <input
          id="jobAddress"
          type="text"
          className="input-field"
          placeholder="123 Main St, Hartford, CT"
          value={form.jobAddress}
          onChange={set('jobAddress')}
          required
        />
      </div>

      <div>
        <label htmlFor="jobType" className="label">Job Type</label>
        <select
          id="jobType"
          className="input-field cursor-pointer"
          value={form.jobType}
          onChange={set('jobType')}
        >
          {JOB_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="scope" className="label">Scope of Work</label>
        <textarea
          id="scope"
          className="input-field resize-none"
          rows={4}
          placeholder="Describe the work to be performed..."
          value={form.scope}
          onChange={set('scope')}
          required
        />
      </div>

      <div>
        <label htmlFor="materials" className="label">Materials Required</label>
        <textarea
          id="materials"
          className="input-field resize-none"
          rows={3}
          placeholder="200A panel, breakers, wire, conduit..."
          value={form.materials}
          onChange={set('materials')}
        />
      </div>

      <div>
        <label htmlFor="hours" className="label">Estimated Hours</label>
        <input
          id="hours"
          type="number"
          className="input-field"
          placeholder="8"
          min="0"
          step="0.5"
          value={form.hours}
          onChange={set('hours')}
          required
        />
      </div>

      <div>
        <label htmlFor="notes" className="label">Notes <span className="normal-case font-normal opacity-60">(optional)</span></label>
        <textarea
          id="notes"
          className="input-field resize-none"
          rows={2}
          placeholder="Any special conditions, access requirements..."
          value={form.notes}
          onChange={set('notes')}
        />
      </div>

      <div className="mt-auto pt-2">
        <button
          type="submit"
          className="btn-primary flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <SpinnerIcon />
              Generating...
            </>
          ) : (
            <>
              <BoltIcon />
              Generate Estimate
            </>
          )}
        </button>
      </div>
    </form>
  )
}

function BoltIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  )
}

function SpinnerIcon() {
  return (
    <svg
      className="motion-safe:animate-spin"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" />
    </svg>
  )
}
