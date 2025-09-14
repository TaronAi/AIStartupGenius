import { cn } from './cn'
import type { TextareaHTMLAttributes } from 'react'
export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn('w-full rounded-lg border p-3', className)} {...props} />
}

