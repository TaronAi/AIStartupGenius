import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Lightbulb, Sparkles, TrendingUp } from 'lucide-react'

interface HeroSectionProps {
  onGeneratePlan: (data: StartupIdeaData) => void
  isGenerating?: boolean
}

export interface StartupIdeaData {
  idea: string
  industry: string
  targetMarket: string
  budget: string
}

export default function HeroSection({ onGeneratePlan, isGenerating = false }: HeroSectionProps) {
  const [formData, setFormData] = useState<StartupIdeaData>({ idea: '', industry: '', targetMarket: '', budget: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.idea.trim()) onGeneratePlan(formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Turn Any Idea Into a Complete Startup Plan</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get AI-powered step-by-step guidance to transform your startup idea into a comprehensive business plan with market analysis, funding strategies, and execution roadmap.
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-chart-2" />
              <span>Describe Your Startup Idea</span>
            </CardTitle>
            <CardDescription>Provide details about your business concept and we'll generate a comprehensive startup plan</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="idea">Your Startup Idea *</Label>
                <Textarea id="idea" data-testid="input-startup-idea" placeholder="Describe your startup idea in detail..." value={formData.idea} onChange={(e) => setFormData({ ...formData, idea: e.target.value })} className="min-h-32 resize-none" required />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, industry: value })}>
                    <SelectTrigger data-testid="select-industry">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="fintech">FinTech</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="sustainability">Sustainability</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="food">Food & Beverage</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="target-market">Target Market</Label>
                  <Input id="target-market" data-testid="input-target-market" placeholder="e.g., Small businesses, Millennials" value={formData.targetMarket} onChange={(e) => setFormData({ ...formData, targetMarket: e.target.value })} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Initial Budget Range</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, budget: value })}>
                    <SelectTrigger data-testid="select-budget">
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-10k">Under $10K</SelectItem>
                      <SelectItem value="10k-50k">$10K - $50K</SelectItem>
                      <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                      <SelectItem value="100k-500k">$100K - $500K</SelectItem>
                      <SelectItem value="500k-plus">$500K+</SelectItem>
                      <SelectItem value="seeking-funding">Seeking Funding</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={!formData.idea.trim() || isGenerating} data-testid="button-generate-plan">
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating Your Startup Plan...
                  </>
                ) : (
                  <>
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Generate My Startup Plan
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-chart-1/10 rounded-lg flex items-center justify-center mx-auto">
              <TrendingUp className="h-6 w-6 text-chart-1" />
            </div>
            <h3 className="font-semibold">Market Analysis</h3>
            <p className="text-sm text-muted-foreground">Comprehensive market research and competitive landscape analysis</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-chart-2/10 rounded-lg flex items-center justify-center mx-auto">
              <Lightbulb className="h-6 w-6 text-chart-2" />
            </div>
            <h3 className="font-semibold">Business Model</h3>
            <p className="text-sm text-muted-foreground">Revenue streams, pricing strategies, and business model design</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold">Execution Plan</h3>
            <p className="text-sm text-muted-foreground">Step-by-step roadmap with timelines and milestones</p>
          </div>
        </div>
      </div>
    </div>
  )
}
