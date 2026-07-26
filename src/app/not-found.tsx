import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Package } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-50 text-primary mb-8">
        <Package className="h-10 w-10" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight text-foreground text-center">
        Looks like this delivery went missing.
      </h1>
      <p className="mt-4 text-lg text-secondary text-center max-w-md">
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get
        you back on track.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Link href="/">
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            Go Home
          </Button>
        </Link>
        <Link href="/compare">
          <Button size="lg" className="w-full sm:w-auto">
            Start Comparing
          </Button>
        </Link>
      </div>
    </div>
  )
}
