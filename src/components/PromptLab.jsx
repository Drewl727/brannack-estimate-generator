import { PROMPT_V3 } from '../lib/gemini'

const V1_PROMPT = `You are helping an electrician write a job estimate.
Here is the job info: {inputs}.
Write a professional estimate.`

const V1_OUTPUT = `Dear John Smith,

Thank you for the opportunity to provide an estimate for your electrical work at 42 Oak Street.
After reviewing your project requirements, we are pleased to offer the following estimate for a panel upgrade.
The work will include upgrading your existing electrical panel to a 200-amp service. This involves
removing the old panel, installing a new 200A main breaker panel, updating wiring connections,
and ensuring compliance with current electrical codes.

Total estimated cost: approximately $2,500 - $4,000.

Please note this estimate is subject to change based on actual site conditions.

Best regards,
Brannack Electric`

const V2_PROMPT = `You are a professional estimating assistant for an electrical contractor.
Given the following job details, return a JSON object with these fields:
estimateNumber, clientName, jobAddress, jobType, scopeSummary, lineItems,
laborCost, materialCost, subtotal, tax, grandTotal, validityDate, disclaimer.
Be specific with line items and calculate all costs shown.

Job Details: {inputs}`

const V2_OUTPUT = `{
  "estimateNumber": "BE-2026-1",
  "clientName": "John Smith",
  "jobAddress": "42 Oak Street, Hartford, CT",
  "jobType": "Panel Upgrade",
  "scopeSummary": "Upgrade electrical panel to 200A service.",
  "lineItems": [
    { "description": "Labor", "quantity": 8, "unit": "hrs", "unitPrice": 85, "total": 680 },
    { "description": "200A Panel", "quantity": 1, "unit": "ea", "unitPrice": 450, "total": 450 },
    { "description": "Misc materials", "quantity": 1, "unit": "lot", "unitPrice": 200, "total": 200 }
  ],
  "laborCost": 680,
  "materialCost": 650,
  "subtotal": 1330,
  "tax": 41.27,
  "grandTotal": 1371.27,
  "validityDate": "May 23, 2026",
  "disclaimer": "Subject to change."
}
// Problems: wrong labor rate ($85 instead of $95), no material markup,
// tax applied to full amount instead of materials only, estimate number non-standard`

const V3_OUTPUT = `{
  "estimateNumber": "BE-2026-047",
  "clientName": "John Smith",
  "jobAddress": "42 Oak Street, Hartford, CT",
  "jobType": "Panel Upgrade",
  "scopeSummary": "This project involves the full replacement of the existing residential electrical service panel with a new 200-ampere main breaker panel. Work includes disconnection of existing panel, installation of new Square D 200A load center with breakers, and reconnection of all branch circuits in compliance with NEC 2020 and CT state code.",
  "lineItems": [
    { "description": "Labor – Panel Upgrade", "quantity": 8, "unit": "hrs", "unitPrice": 95.00, "total": 760.00 },
    { "description": "Square D 200A Main Breaker Panel", "quantity": 1, "unit": "ea", "unitPrice": 385.00, "total": 385.00 },
    { "description": "20A Tandem Breakers (assorted)", "quantity": 12, "unit": "ea", "unitPrice": 18.50, "total": 222.00 },
    { "description": "2/0 AL Service Entrance Cable, 10ft", "quantity": 1, "unit": "lot", "unitPrice": 95.00, "total": 95.00 },
    { "description": "Misc Hardware & Consumables", "quantity": 1, "unit": "lot", "unitPrice": 45.00, "total": 45.00 }
  ],
  "laborCost": 760.00,
  "materialCost": 747.00,
  "materialMarkup": 149.40,
  "subtotal": 1656.40,
  "tax": 56.51,
  "grandTotal": 1712.91,
  "validityDate": "May 23, 2026",
  "notes": "",
  "disclaimer": "This estimate is valid for 30 days. Final pricing subject to site conditions."
}`

const VERSIONS = [
  {
    id: 'v1',
    label: 'v1',
    title: 'Basic',
    tagline: 'Natural language instruction',
    prompt: V1_PROMPT,
    changeNote: 'First attempt. Too vague — Gemini returned unstructured paragraph text with no consistent format, making it impossible to parse the output into a structured document. The cost range was non-specific and the tone was inconsistent.',
    output: V1_OUTPUT,
    outputLabel: 'Sample output (plain text — unparseable)',
    badgeColor: '#94a3b8',
  },
  {
    id: 'v2',
    label: 'v2',
    title: 'Structured Output',
    tagline: 'JSON requirement added',
    prompt: V2_PROMPT,
    changeNote: 'Added explicit JSON requirement and a field list. Output became parseable but line items were inconsistent — labor used the wrong rate, material markup was missing entirely, and CT tax was applied to the full total instead of materials only. No calculation rules were given.',
    output: V2_OUTPUT,
    outputLabel: 'Sample output (JSON — parseable but incorrect math)',
    badgeColor: '#d97706',
  },
  {
    id: 'v3',
    label: 'v3',
    title: 'Production',
    tagline: 'Full business rules enforced',
    prompt: PROMPT_V3,
    changeNote: 'Added explicit CT tax rate (6.35% on materials only), 20% material markup logic, exact labor rate ($95/hr), estimate number format, and a required disclaimer field. Model is gemini-2.5-flash with responseMimeType: "application/json" enforced at the SDK level. Output is now consistent and accurate enough to use in a real client-facing document.',
    output: V3_OUTPUT,
    outputLabel: 'Sample output (correct math, client-ready)',
    badgeColor: '#0369a1',
  },
]

export default function PromptLab() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="font-heading font-bold text-2xl mb-2 text-balance" style={{ color: '#0f1e36' }}>
          Prompt Lab
        </h2>
        <p className="text-sm text-pretty leading-relaxed" style={{ color: 'var(--muted)', maxWidth: 560 }}>
          Three iterations of the Gemini prompt used to generate electrical estimates.
          Each version shows what changed and why — from a vague prose request to a
          production-ready JSON-constrained prompt with strict business logic.
        </p>
      </div>

      {VERSIONS.map((v) => (
        <VersionCard key={v.id} version={v} />
      ))}
    </div>
  )
}

function VersionCard({ version }) {
  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{
        border: '1px solid var(--border)',
        backgroundColor: '#ffffff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      {/* Card header */}
      <div
        className="flex items-center gap-3 px-5 py-4"
        style={{ borderBottom: '1px solid var(--border)', backgroundColor: '#f8fafc' }}
      >
        <span
          className="inline-flex items-center justify-center rounded font-heading font-bold text-xs text-white px-2 py-1"
          style={{ backgroundColor: version.badgeColor, minWidth: 32 }}
        >
          {version.label}
        </span>
        <div>
          <p className="font-heading font-semibold text-sm" style={{ color: '#0f1e36' }}>
            {version.title}
          </p>
          <p className="text-xs" style={{ color: 'var(--muted)' }}>{version.tagline}</p>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Prompt text */}
        <div>
          <p className="text-xs font-heading font-semibold mb-2" style={{ color: '#7c93b0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Prompt
          </p>
          <pre
            className="text-xs rounded-md p-4 overflow-auto scrollbar-thin"
            style={{
              backgroundColor: '#0f1e36',
              color: '#a8c0d6',
              fontFamily: 'ui-monospace, Consolas, "Cascadia Code", monospace',
              maxHeight: 320,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              lineHeight: 1.6,
            }}
          >
            {version.prompt}
          </pre>
        </div>

        {/* Change note */}
        <div
          className="rounded p-3 text-sm text-pretty leading-relaxed"
          style={{
            backgroundColor: '#f0f9ff',
            borderLeft: '3px solid #0369a1',
            color: '#1e3a5f',
          }}
        >
          <span className="font-heading font-semibold text-xs block mb-1" style={{ color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            What changed &amp; why
          </span>
          {version.changeNote}
        </div>

        {/* Sample output */}
        <div>
          <p className="text-xs font-heading font-semibold mb-2" style={{ color: '#7c93b0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {version.outputLabel}
          </p>
          <pre
            className="text-xs rounded-md p-4 overflow-auto scrollbar-thin"
            style={{
              backgroundColor: '#1e293b',
              color: '#94a3b8',
              fontFamily: 'ui-monospace, Consolas, "Cascadia Code", monospace',
              maxHeight: 260,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              lineHeight: 1.6,
            }}
          >
            {version.output}
          </pre>
        </div>
      </div>
    </div>
  )
}
