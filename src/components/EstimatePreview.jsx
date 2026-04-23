import { useRef, forwardRef } from 'react'
import { fmt } from '../lib/utils'
import { downloadPDF } from '../lib/pdf'
import LoadingSkeleton from './LoadingSkeleton'

const BUSINESS = {
  name: 'Brannack Electric',
  location: 'Hartford, CT area',
  established: '1980',
  license: 'EC-0123456',
  contact: 'brannackelectric@gmail.com',
  phone: '(860) 555-0192',
}

export default function EstimatePreview({ status, estimate, rawError, onRetry, onClear }) {
  const docRef = useRef(null)

  async function handleDownload() {
    await downloadPDF(docRef, estimate?.estimateNumber, estimate?.clientName)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Action bar — only shown when estimate is ready */}
      {status === 'success' && (
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <p className="text-sm font-heading font-medium" style={{ color: 'var(--muted)' }}>
            Estimate ready
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={onClear}
              className="flex items-center gap-1.5 px-4 py-2 rounded text-sm font-heading font-medium cursor-pointer transition-colors duration-200 border"
              style={{ borderColor: 'var(--border)', color: 'var(--muted)', minHeight: 36 }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#94a3b8'; e.currentTarget.style.color = 'var(--text)' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' }}
              aria-label="Clear and start a new estimate"
            >
              <TrashIcon />
              New Estimate
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-2 rounded text-sm font-heading font-semibold text-white cursor-pointer transition-colors duration-200"
              style={{ backgroundColor: 'var(--cta)', minHeight: 36 }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--cta-hover)' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--cta)' }}
              aria-label="Download estimate as PDF"
            >
              <DownloadIcon />
              Download PDF
            </button>
          </div>
        </div>
      )}

      {/* Document area */}
      <div className="flex-1 overflow-y-auto">
        {status === 'idle' && <EmptyState />}
        {status === 'loading' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <LoadingSkeleton />
          </div>
        )}
        {status === 'error' && (
          <ErrorState message={estimate} raw={rawError} onRetry={onRetry} />
        )}
        {status === 'success' && estimate && (
          <EstimateDocument ref={docRef} data={estimate} />
        )}
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed py-20 text-center"
      style={{ borderColor: 'var(--border)', minHeight: 400 }}
    >
      <div
        className="flex items-center justify-center rounded-full mb-4"
        style={{ width: 56, height: 56, backgroundColor: '#e2e8f0' }}
      >
        <DocumentIcon />
      </div>
      <p className="font-heading font-semibold text-base mb-1" style={{ color: '#334155' }}>
        No estimate yet
      </p>
      <p className="text-sm text-pretty" style={{ color: 'var(--muted)', maxWidth: 260 }}>
        Fill in the job details on the left and click Generate Estimate to get started.
      </p>
    </div>
  )
}

function ErrorState({ message, raw, onRetry }) {
  return (
    <div className="rounded-lg border p-6" style={{ borderColor: '#fca5a5', backgroundColor: '#fff5f5' }}>
      <div className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 mt-0.5">
          <AlertIcon />
        </div>
        <div>
          <p className="font-heading font-semibold text-sm mb-1" style={{ color: '#b91c1c' }}>
            Generation failed
          </p>
          <p className="text-sm text-pretty" style={{ color: '#7f1d1d' }}>
            {message || 'An unexpected error occurred. Check your API key and try again.'}
          </p>
        </div>
      </div>
      {raw && (
        <div className="mb-4">
          <p className="text-xs font-heading font-semibold mb-1" style={{ color: '#b91c1c' }}>
            Raw API response (JSON parsing failed):
          </p>
          <pre
            className="text-xs overflow-auto rounded p-3 scrollbar-thin"
            style={{ backgroundColor: '#fee2e2', color: '#7f1d1d', maxHeight: 200, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}
          >
            {raw}
          </pre>
        </div>
      )}
      <button
        onClick={onRetry}
        className="flex items-center gap-1.5 px-4 py-2 rounded text-sm font-heading font-semibold text-white cursor-pointer transition-colors duration-200"
        style={{ backgroundColor: '#dc2626', minHeight: 44 }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#b91c1c' }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#dc2626' }}
      >
        <RetryIcon />
        Retry
      </button>
    </div>
  )
}

const EstimateDocument = forwardRef(function EstimateDocument({ data }, ref) {
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <div
      ref={ref}
      className="bg-white rounded-lg"
      style={{
        boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.05)',
        fontFamily: '"Open Sans", sans-serif',
      }}
    >
      <div className="p-10">
        {/* Document header */}
        <div className="flex justify-between items-start pb-6 mb-6" style={{ borderBottom: '2px solid #0f1e36' }}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div
                className="flex items-center justify-center rounded"
                style={{ width: 28, height: 28, backgroundColor: '#0369a1', flexShrink: 0 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <h1
                className="font-heading font-bold tracking-tight text-balance"
                style={{ fontSize: 20, color: '#0f1e36', letterSpacing: '-0.02em' }}
              >
                BRANNACK ELECTRIC
              </h1>
            </div>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>Est. {BUSINESS.established} &nbsp;·&nbsp; {BUSINESS.location}</p>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>{BUSINESS.contact}</p>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>License: {BUSINESS.license}</p>
          </div>
          <div className="text-right">
            <p
              className="font-heading font-bold tabular-nums"
              style={{ fontSize: 18, color: '#0f1e36' }}
            >
              ESTIMATE
            </p>
            <p
              className="font-heading font-semibold tabular-nums text-sm"
              style={{ color: '#0369a1' }}
            >
              {data.estimateNumber}
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>
              Date: {today}
            </p>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>
              Valid until: {data.validityDate}
            </p>
          </div>
        </div>

        {/* Client info */}
        <div className="grid grid-cols-2 gap-8 mb-6">
          <div>
            <p className="text-xs font-heading font-semibold mb-1" style={{ color: '#7c93b0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Prepared for
            </p>
            <p className="font-heading font-semibold text-sm" style={{ color: '#0f1e36' }}>
              {data.clientName}
            </p>
            <p className="text-sm text-pretty" style={{ color: 'var(--muted)' }}>
              {data.jobAddress}
            </p>
          </div>
          <div>
            <p className="text-xs font-heading font-semibold mb-1" style={{ color: '#7c93b0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Job Type
            </p>
            <p className="font-heading font-semibold text-sm" style={{ color: '#0f1e36' }}>
              {data.jobType}
            </p>
          </div>
        </div>

        {/* Scope summary */}
        <div
          className="mb-6 p-4 rounded-md"
          style={{ backgroundColor: '#f8fafc', borderLeft: '3px solid #0369a1' }}
        >
          <p className="text-xs font-heading font-semibold mb-1.5" style={{ color: '#7c93b0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Scope of Work
          </p>
          <p className="text-sm text-pretty leading-relaxed" style={{ color: '#1e293b' }}>
            {data.scopeSummary}
          </p>
        </div>

        {/* Line items table */}
        <div className="mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ borderBottom: '2px solid #0f1e36' }}>
                {['Description', 'Qty', 'Unit', 'Unit Price', 'Total'].map((h, i) => (
                  <th
                    key={h}
                    className="py-2.5 font-heading font-semibold text-xs"
                    style={{
                      color: '#0f1e36',
                      textAlign: i === 0 ? 'left' : 'right',
                      paddingRight: i < 4 ? 12 : 0,
                      paddingLeft: i === 0 ? 0 : 12,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.lineItems?.map((item, idx) => (
                <tr
                  key={idx}
                  style={{
                    borderBottom: '1px solid #f1f5f9',
                    backgroundColor: idx % 2 === 1 ? '#fafbfc' : 'transparent',
                  }}
                >
                  <td className="py-2.5 text-sm" style={{ color: '#1e293b' }}>
                    {item.description}
                  </td>
                  <td className="py-2.5 text-sm text-right tabular-nums" style={{ color: '#475569', paddingLeft: 12, paddingRight: 12 }}>
                    {item.quantity}
                  </td>
                  <td className="py-2.5 text-sm text-right" style={{ color: '#475569', paddingLeft: 12, paddingRight: 12 }}>
                    {item.unit}
                  </td>
                  <td className="py-2.5 text-sm text-right tabular-nums" style={{ color: '#475569', paddingLeft: 12, paddingRight: 12 }}>
                    ${fmt(item.unitPrice)}
                  </td>
                  <td className="py-2.5 text-sm text-right tabular-nums font-medium" style={{ color: '#1e293b' }}>
                    ${fmt(item.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cost summary */}
        <div className="flex justify-end mb-6">
          <div
            className="w-72 rounded-md p-5"
            style={{ backgroundColor: '#f8fafc', border: '1px solid var(--border)' }}
          >
            <SummaryRow label="Labor" value={`$${fmt(data.laborCost)}`} />
            <SummaryRow label="Materials" value={`$${fmt(data.materialCost)}`} />
            <SummaryRow label="Material Markup (20%)" value={`$${fmt(data.materialMarkup)}`} />
            <SummaryRow label="Subtotal" value={`$${fmt(data.subtotal)}`} />
            <SummaryRow label="CT Sales Tax (6.35%)" value={`$${fmt(data.tax)}`} />
            <div
              className="flex justify-between items-center mt-3 pt-3 font-heading"
              style={{ borderTop: '2px solid #0f1e36' }}
            >
              <span className="font-bold text-sm" style={{ color: '#0f1e36' }}>GRAND TOTAL</span>
              <span className="font-bold text-base tabular-nums" style={{ color: '#0369a1' }}>
                ${fmt(data.grandTotal)}
              </span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {data.notes && data.notes.trim() && (
          <div className="mb-4">
            <p className="text-xs font-heading font-semibold mb-1" style={{ color: '#7c93b0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Notes
            </p>
            <p className="text-sm text-pretty" style={{ color: 'var(--muted)' }}>{data.notes}</p>
          </div>
        )}

        {/* Disclaimer */}
        <div
          className="rounded p-3 text-xs text-pretty"
          style={{ backgroundColor: '#f1f5f9', color: '#64748b', borderLeft: '3px solid #cbd5e1' }}
        >
          {data.disclaimer}
        </div>

        {/* Footer */}
        <div
          className="flex justify-between items-center mt-6 pt-4 text-xs"
          style={{ borderTop: '1px solid var(--border)', color: '#94a3b8' }}
        >
          <span className="font-heading">{BUSINESS.name} &nbsp;·&nbsp; {BUSINESS.license}</span>
          <span>{BUSINESS.contact}</span>
        </div>
      </div>
    </div>
  )
})

function SummaryRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-1">
      <span className="text-xs" style={{ color: 'var(--muted)' }}>{label}</span>
      <span className="text-xs tabular-nums font-medium" style={{ color: '#1e293b' }}>{value}</span>
    </div>
  )
}

// SVG icons
function DocumentIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  )
}

function AlertIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}

function RetryIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 .49-4.5" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  )
}
