import { GoogleGenerativeAI } from '@google/generative-ai'

export default async (request) => {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'API key not configured on server.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const { prompt } = await request.json()

  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({
    model: 'models/gemini-2.5-flash',
    generationConfig: { responseMimeType: 'application/json' },
  })

  const result = await model.generateContent(prompt)
  const text = result.response.text()

  return new Response(text, {
    headers: { 'Content-Type': 'application/json' },
  })
}

export const config = { path: '/api/generate' }
