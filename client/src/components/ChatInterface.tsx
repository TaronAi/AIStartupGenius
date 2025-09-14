import { useEffect, useRef, useState } from 'react'
import type { GeneratedPlanData } from '@shared/schema'
import { Button } from './ui/button'
import { Input } from './ui/input'

interface ChatInterfaceProps {
  isVisible: boolean
  onClose: () => void
  plan?: GeneratedPlanData
}

export default function ChatInterface({ isVisible, onClose, plan }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([])
  const [input, setInput] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isVisible])

  if (!isVisible) return null

  const send = async () => {
    const content = input.trim()
    if (!content) return
    setInput('')
    setMessages((m) => [...m, { role: 'user', content }])
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          context: plan ? JSON.stringify({ title: plan.title, sections: plan.sections.map(s => ({ id: s.id, title: s.title })) }) : undefined
        })
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || 'Chat failed')
      setMessages((m) => [...m, { role: 'assistant', content: data.response }])
    } catch (e) {
      setMessages((m) => [...m, { role: 'assistant', content: 'Sorry—something went wrong.' }])
    }
  }

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-end sm:items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full sm:max-w-2xl max-h-[85vh] grid grid-rows-[auto,1fr,auto]">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">AI Advisor Chat</h3>
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </div>
        <div ref={ref} className="overflow-y-auto p-4 space-y-3">
          {messages.length === 0 && (
            <p className="text-sm text-muted-foreground">Ask about funding, MVP scope, marketing, pricing, or anything in the plan.</p>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`p-3 rounded-lg ${m.role === 'user' ? 'bg-chart-1/10 ml-auto max-w-[85%]' : 'bg-muted/60 max-w-[85%]'}`}>
              <div className="whitespace-pre-wrap text-sm">{m.content}</div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t flex gap-2">
          <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your question..." onKeyDown={(e) => e.key === 'Enter' && send()} />
          <Button onClick={send}>Send</Button>
        </div>
      </div>
    </div>
  )
}

