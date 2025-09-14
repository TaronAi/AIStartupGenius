import { createContext, useContext, useMemo, type PropsWithChildren } from 'react'

type Ctx = { onChange?: (v: string) => void }
const Ctx = createContext<Ctx>({})

export function Select({ onValueChange, children }: PropsWithChildren<{ value?: string; onValueChange?: (v: string) => void }>) {
  const ctx = useMemo(() => ({ onChange: onValueChange }), [onValueChange])
  return <Ctx.Provider value={ctx}>{children}</Ctx.Provider>
}

export function SelectTrigger(props: React.HTMLAttributes<HTMLButtonElement>) {
  return <button type="button" className="w-full h-10 rounded-lg border px-3 flex items-center justify-between" {...props} />
}
export function SelectValue({ placeholder }: { placeholder?: string }) { return <span className="text-sm text-muted-foreground">{placeholder}</span> }
export function SelectContent({ children }: PropsWithChildren) { return <div className="mt-2 border rounded-lg p-2 space-y-1">{children}</div> }
export function SelectItem({ value, children }: PropsWithChildren<{ value: string }>) {
  const { onChange } = useContext(Ctx)
  return <div role="button" className="px-3 py-2 rounded hover:bg-muted" onClick={() => onChange?.(value)}>{children}</div>
}

