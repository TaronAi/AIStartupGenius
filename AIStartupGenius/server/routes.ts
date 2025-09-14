import type { Express } from 'express'
import { createServer, type Server } from 'http'
import { generateStartupPlan, generateChatResponse } from './openai'
import { startupIdeaSchema, chatMessageSchema } from '@shared/schema'
import { z } from 'zod'

export async function registerRoutes(app: Express): Promise<Server> {
  app.post('/api/generate-plan', async (req, res) => {
    try {
      const validatedData = startupIdeaSchema.parse(req.body)
      const plan = await generateStartupPlan(validatedData)
      res.json({ success: true, plan })
    } catch (error) {
      console.error('Error generating plan:', error)
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, error: 'Invalid input data', details: error.errors })
      }
      res.status(500).json({ success: false, error: error instanceof Error ? error.message : 'Failed to generate startup plan' })
    }
  })

  app.post('/api/chat', async (req, res) => {
    try {
      const validatedData = chatMessageSchema.parse(req.body)
      const response = await generateChatResponse(validatedData.content, validatedData.context)
      res.json({ success: true, response, timestamp: new Date().toISOString() })
    } catch (error) {
      console.error('Error generating chat response:', error)
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, error: 'Invalid message data', details: error.errors })
      }
      res.status(500).json({ success: false, error: error instanceof Error ? error.message : 'Failed to generate response' })
    }
  })

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
  })

  const httpServer = createServer(app)
  return httpServer
}
