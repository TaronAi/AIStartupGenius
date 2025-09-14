export function useToast() {
  return { toast: (_: { title?: string; description?: string }) => {} }
}
