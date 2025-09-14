import type { LabelHTMLAttributes, PropsWithChildren } from 'react'
export function Label({ children, ...props }: PropsWithChildren<LabelHTMLAttributes<HTMLLabelElement>>) {
  return <label {...props} className="text-sm font-medium">{children}</label>
}
