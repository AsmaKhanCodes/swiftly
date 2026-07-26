"use client"

import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold tracking-tight text-foreground text-center">
        Something went wrong
      </h1>
      <p className="mt-4 text-lg text-secondary text-center max-w-md">
        An unexpected error occurred. Please try again.
      </p>
      <div className="mt-8">
        <Button onClick={reset} size="lg">
          Try Again
        </Button>
      </div>
    </div>
  )
}
