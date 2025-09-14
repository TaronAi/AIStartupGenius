import { cn } from './cn'
import type { InputHTMLAttributes } from 'react'
export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn('w-full h-10 rounded-lg border px-3', className)} {...props} />
}
