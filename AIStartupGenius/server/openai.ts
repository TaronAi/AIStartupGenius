import OpenAI from 'openai'
import type { StartupIdeaData, GeneratedPlanData } from '@shared/schema'
import { generatedPlanSchema } from '@shared/schema'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function generateStartupPlan(ideaData: StartupIdeaData): Promise<GeneratedPlanData> {
  const { idea, industry, targetMarket, budget } = ideaData

  const prompt = `You are an expert startup advisor and business consultant. Generate a comprehensive startup business plan based on the following information:\n\nStartup Idea: ${idea}\nIndustry: ${industry || 'Not specified'}\nTarget Market: ${targetMarket || 'Not specified'}\nBudget Range: ${budget || 'Not specified'}\n\nCreate a detailed business plan with the following sections. Respond with JSON in the exact format specified:\n\n{\n  "title": "A concise, compelling title for the startup plan",\n  "summary": "A 2-3 sentence executive summary of the business concept and value proposition",\n  "estimatedReadTime": "X min",\n  "generatedAt": "${new Date().toISOString()}",\n  "sections": [\n    {\n      "id": "market-analysis",\n      "title": "Market Analysis",\n      "description": "Comprehensive analysis of target market and competitive landscape",\n      "content": ["3-4 bullet points analyzing market size, trends, competition, and opportunities"],\n      "actionItems": ["3-4 specific actionable tasks for market research and validation"],\n      "priority": "high|medium|low",\n      "timeframe": "estimated timeframe"\n    },\n    {\n      "id": "business-model",\n      "title": "Business Model & Revenue Strategy",\n      "description": "Revenue streams and monetization approach",\n      "content": ["3-4 bullet points covering revenue model, pricing, customer acquisition"],\n      "actionItems": ["3-4 specific tasks for implementing the business model"],\n      "priority": "high|medium|low",\n      "timeframe": "estimated timeframe"\n    },\n    {\n      "id": "funding-strategy",\n      "title": "Funding Strategy",\n      "description": "Capital requirements and fundraising approach",\n      "content": ["3-4 bullet points about funding needs, sources, and strategy"],\n      "actionItems": ["3-4 specific fundraising tasks"],\n      "priority": "high|medium|low",\n      "timeframe": "estimated timeframe"\n    },\n    {\n      "id": "mvp-development",\n      "title": "MVP Development",\n      "description": "Minimum viable product strategy and development plan",\n      "content": ["3-4 bullet points about MVP features, technology, and development approach"],\n      "actionItems": ["3-4 specific development tasks"],\n      "priority": "high|medium|low",\n      "timeframe": "estimated timeframe"\n    },\n    {\n      "id": "marketing-strategy",\n      "title": "Marketing & Customer Acquisition",\n      "description": "Go-to-market strategy and customer acquisition plan",\n      "content": ["3-4 bullet points about marketing channels, customer acquisition, and growth"],\n      "actionItems": ["3-4 specific marketing tasks"],\n      "priority": "high|medium|low",\n      "timeframe": "estimated timeframe"\n    }\n  ]\n}\n\nMake the plan specific, actionable, and tailored to the provided startup idea. Include realistic timelines and prioritize tasks based on importance for early-stage startups.`

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-5',
      messages: [
        { role: 'system', content: 'You are an expert startup advisor. Always respond with valid JSON that exactly matches the requested format.' },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7
    })

    const result = JSON.parse(response.choices[0].message.content || '{}')
    const validationResult = generatedPlanSchema.safeParse(result)

    if (!validationResult.success) {
      console.error('OpenAI response validation failed:', validationResult.error)
      throw new Error('AI generated an invalid response format. Please try again.')
    }

    return validationResult.data
  } catch (error) {
    console.error('Error generating startup plan:', error)
    throw new Error('Failed to generate startup plan. Please try again.')
  }
}

export async function generateChatResponse(message: string, context?: string): Promise<string> {
  const systemPrompt = `You are an AI startup advisor assistant. You help entrepreneurs with questions about their startup plans, business strategy, fundraising, product development, marketing, and general startup advice.\n\n${context ? `Context about the user's startup plan: ${context}` : ''}\n\nProvide helpful, actionable advice. Be encouraging but realistic. Keep responses concise but comprehensive.`

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-5',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 500
    })

    return response.choices[0].message.content || 'I apologize, but I could not generate a response. Please try again.'
  } catch (error) {
    console.error('Error generating chat response:', error)
    throw new Error('Failed to generate response. Please try again.')
  }
}
