import { GoogleGenerativeAI } from '@google/generative-ai'

const BUSINESS = {
  name: 'Brannack Electric',
  location: 'Hartford, CT area',
  established: '1980',
  license: 'EC-0123456',
  contact: 'brannackelectric@gmail.com',
  laborRate: 95,
  materialMarkupPct: 20,
  taxRate: 6.35,
}

export const PROMPT_V3 = `You are a professional estimating assistant for Brannack Electric, an electrical contractor in the Hartford, CT area (Est. 1980, License: EC-0123456, Contact: brannackelectric@gmail.com).

Given the following job details, return a JSON object with EXACTLY these fields. All dollar amounts must be rounded to 2 decimal places.

Required fields:
- estimateNumber: string in format "BE-{YEAR}-{3-digit-number}" e.g. "BE-2026-047" (use today's year, pick a random 3-digit number between 001 and 999)
- clientName: string
- jobAddress: string
- jobType: string
- scopeSummary: string (2-3 sentence professional rewrite of the scope of work, suitable for a client-facing document)
- lineItems: array of objects, each with: { description: string, quantity: number, unit: string, unitPrice: number, total: number }
  - Include labor as a line item: description "Labor – {jobType}", quantity = estimatedHours, unit = "hrs", unitPrice = 95.00
  - Include individual material line items based on the materials provided
- laborCost: number (estimatedHours × $95.00)
- materialCost: number (sum of material line item totals, excluding labor)
- materialMarkup: number (materialCost × 0.20, i.e. 20% markup)
- subtotal: number (laborCost + materialCost + materialMarkup)
- tax: number (CT sales tax: apply 6.35% ONLY to (materialCost + materialMarkup), NOT to labor)
- grandTotal: number (subtotal + tax)
- validityDate: string in format "Month DD, YYYY" — exactly 30 days from today ({TODAY})
- notes: string (any additional notes; empty string if none)
- disclaimer: "This estimate is valid for 30 days. Final pricing subject to site conditions."

Business rules (strictly enforce):
- Labor rate: $95.00 per hour — never deviate
- Material markup: exactly 20% of materialCost
- CT sales tax: exactly 6.35% applied ONLY to (materialCost + materialMarkup) — labor is NOT taxed
- All arithmetic must be exact (no rounding errors in subtotals)
- estimateNumber must follow format BE-YYYY-XXX

Job Details:
Client Name: {CLIENT_NAME}
Job Address: {JOB_ADDRESS}
Job Type: {JOB_TYPE}
Scope of Work: {SCOPE}
Materials Required: {MATERIALS}
Estimated Hours: {HOURS}
Notes: {NOTES}

Today's Date: {TODAY}

Return ONLY the JSON object. No markdown, no explanation, no code fences.`

export async function generateEstimate(apiKey, formData) {
  const today = new Date()
  const todayStr = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const filledPrompt = PROMPT_V3
    .replace(/{TODAY}/g, todayStr)
    .replace('{CLIENT_NAME}', formData.clientName || 'Not provided')
    .replace('{JOB_ADDRESS}', formData.jobAddress || 'Not provided')
    .replace('{JOB_TYPE}', formData.jobType || 'General')
    .replace('{SCOPE}', formData.scope || 'Not provided')
    .replace('{MATERIALS}', formData.materials || 'To be determined')
    .replace('{HOURS}', formData.hours || '0')
    .replace('{NOTES}', formData.notes || 'None')

  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({
    model: 'models/gemini-2.5-flash',
    generationConfig: { responseMimeType: 'application/json' },
  })

  const result = await model.generateContent(filledPrompt)
  const text = result.response.text()

  try {
    return { data: JSON.parse(text), raw: null }
  } catch {
    return { data: null, raw: text }
  }
}

export { BUSINESS }
