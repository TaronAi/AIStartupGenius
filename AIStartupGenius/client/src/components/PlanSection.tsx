import { useState } from 'react'
import type { PlanSectionData } from '@shared/schema'
import { Button } from './ui/button'

export default function PlanSection({ section }: { section: PlanSectionData }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="border rounded-xl p-4 bg-white/70 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{section.title}</h3>
          <p className="text-sm text-muted-foreground">{section.description}</p>
        </div>
        <Button variant="ghost" onClick={() => setOpen(!open)}>{open ? 'Hide' : 'Show'}</Button>
      </div>
      {open && (
        <div className="mt-4 space-y-3">
          <ul className="list-disc pl-5 space-y-1">
            {section.content.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
          {section.actionItems && section.actionItems.length > 0 && (
            <div>
              <h4 className="font-medium">Action Items</h4>
              <ul className="list-disc pl-5 space-y-1">
                {section.actionItems.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="text-xs text-muted-foreground">
            {section.priority && <span className="mr-3">Priority: {section.priority}</span>}
            {section.timeframe && <span>Timeframe: {section.timeframe}</span>}
          </div>
        </div>
      )}
    </div>
  )
}
