import type { PropsWithChildren } from 'react'
export function Card({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  return <div className={`rounded-2xl border bg-white ${className}`}>{children}</div>
}
export function CardHeader({ children }: PropsWithChildren) { return <div className="p-6 border-b">{children}</div> }
export function CardTitle({ children, className = '' }: PropsWithChildren<{ className?: string }>) { return <h3 className={`text-xl font-semibold ${className}`}>{children}</h3> }
export function CardDescription({ children }: PropsWithChildren) { return <p className="text-sm text-muted-foreground">{children}</p> }
export function CardContent({ children }: PropsWithChildren) { return <div className="p-6">{children}</div> }
