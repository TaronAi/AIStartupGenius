import { cn } from './cn'
import type { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost'
  size?: 'default' | 'lg'
}

export function Button({ className, variant = 'default', size = 'default', ...props }: Props) {
  const base = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50'
  const variants = {
    default: 'bg-primary text-white hover:opacity-90',
    ghost: 'bg-transparent hover:bg-muted'
  }
  const sizes = {
    default: 'h-10 px-4 py-2',
    lg: 'h-12 px-6'
  }
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />
}
