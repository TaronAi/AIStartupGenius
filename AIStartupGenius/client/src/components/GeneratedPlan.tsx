import type { GeneratedPlanData } from '@shared/schema'
import PlanSection from './PlanSection'
import { Button } from './ui/button'
import { Sparkles } from 'lucide-react'

export interface GeneratedPlanProps {
  plan: GeneratedPlanData
  onStartChat?: () => void
}

export type { GeneratedPlanData }

export default function GeneratedPlan({ plan, onStartChat }: GeneratedPlanProps) {
  const generatedAt = new Date(plan.generatedAt)
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">{plan.title}</h1>
        <p className="text-muted-foreground">{plan.summary}</p>
        <div className="text-xs text-muted-foreground">Generated {generatedAt.toLocaleString()} • ~{plan.estimatedReadTime}
        </div>
      </header>

      <div className="space-y-4">
        {plan.sections.map((s) => (
          <PlanSection key={s.id} section={s} />
        ))}
      </div>

      <div className="pt-2">
        <Button onClick={onStartChat}>
          <Sparkles className="mr-2 h-4 w-4" />
          Ask Questions About This Plan
        </Button>
      </div>
    </div>
  )
}
