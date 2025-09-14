import { z } from 'zod'

export const startupIdeaSchema = z.object({
  idea: z.string().min(10, 'Startup idea must be at least 10 characters'),
  industry: z.string().optional(),
  targetMarket: z.string().optional(),
  budget: z.string().optional()
})

export const planSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  content: z.array(z.string()),
  actionItems: z.array(z.string()).optional(),
  priority: z.enum(['high', 'medium', 'low']).optional(),
  timeframe: z.string().optional()
})

export const generatedPlanSchema = z.object({
  title: z.string(),
  summary: z.string(),
  sections: z.array(planSectionSchema),
  estimatedReadTime: z.string(),
  generatedAt: z.string()
})

export const chatMessageSchema = z.object({
  content: z.string().min(1, 'Message cannot be empty'),
  context: z.string().optional()
})

export type StartupIdeaData = z.infer<typeof startupIdeaSchema>
export type PlanSectionData = z.infer<typeof planSectionSchema>
export type GeneratedPlanData = z.infer<typeof generatedPlanSchema>
export type ChatMessageData = z.infer<typeof chatMessageSchema>
