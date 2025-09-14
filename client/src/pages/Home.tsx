import { useState } from 'react'
import HeroSection, { type StartupIdeaData } from '@/components/HeroSection'
import GeneratedPlan, { type GeneratedPlanData } from '@/components/GeneratedPlan'
import ChatInterface from '@/components/ChatInterface'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function Home() {
  const [currentView, setCurrentView] = useState<'hero' | 'plan'>('hero')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedPlanData | null>(null)

  const handleGeneratePlan = async (data: StartupIdeaData) => {
    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      const result = await response.json()
      if (!result.success) throw new Error(result.error || 'Failed to generate plan')
      const plan: GeneratedPlanData = { ...result.plan, generatedAt: new Date(result.plan.generatedAt) }
      setGeneratedPlan(plan)
      setCurrentView('plan')
    } catch (error) {
      console.error('Error generating plan:', error)
      alert('Failed to generate startup plan. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleBackToHero = () => {
    setCurrentView('hero')
    setGeneratedPlan(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {currentView === 'hero' && (
        <HeroSection onGeneratePlan={handleGeneratePlan} isGenerating={isGenerating} />
      )}

      {currentView === 'plan' && generatedPlan && (
        <div>
          <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
            <div className="max-w-4xl mx-auto p-4">
              <Button variant="ghost" onClick={handleBackToHero} data-testid="button-back-to-hero">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Generate New Plan
              </Button>
            </div>
          </div>
          <GeneratedPlan plan={generatedPlan} onStartChat={() => setIsChatOpen(true)} />
        </div>
      )}

      <ChatInterface isVisible={isChatOpen} onClose={() => setIsChatOpen(false)} plan={generatedPlan ?? undefined} />
    </div>
  )
}

