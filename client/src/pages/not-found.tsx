export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center p-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">404 — Page Not Found</h1>
        <p className="text-muted-foreground">The page you’re looking for doesn’t exist.</p>
        <a href="/" className="underline">Go home</a>
      </div>
    </div>
  )
}

