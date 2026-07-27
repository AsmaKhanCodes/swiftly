"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { companyLoginSchema } from "@/validations"

export default function CompanyLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const parsed = companyLoginSchema.safeParse({ email, password })
    if (!parsed.success) {
      setError(parsed.error.flatten().fieldErrors.email?.[0] ?? "Invalid input")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? "Invalid credentials")
        return
      }

      router.push("/company/dashboard")
      router.refresh()
    } catch {
      setError("Connection error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left: Branding */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary-600 to-primary-800 items-center justify-center p-12">
        <div className="max-w-md text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white text-lg font-bold backdrop-blur-sm">
              S
            </div>
            <span className="text-2xl font-semibold">Swiftly</span>
          </div>
          <h1 className="text-3xl font-bold leading-tight mb-4">
            AI-powered local delivery in seconds.
          </h1>
          <p className="text-white/70 text-lg leading-relaxed">
            Manage your delivery requests, update pricing, and control coverage
            areas — all from one dashboard.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-6">
            {[
              { value: "6+", label: "Partner Companies" },
              { value: "Real-time", label: "Request Updates" },
              { value: "AI", label: "Smart Insights" },
              { value: "1-Click", label: "Status Changes" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-white/60 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white text-xs font-bold">
              S
            </div>
            <span className="text-lg font-semibold text-foreground">
              Swiftly
            </span>
          </div>

          <Card className="p-6 border border-gray-200/60">
            <h1 className="text-xl font-bold text-foreground mb-1">
              Company Login
            </h1>
            <p className="text-sm text-secondary mb-6">
              Sign in to manage your delivery operations
            </p>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="demo@quickdash.com"
                  className="mt-1.5"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1.5">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-foreground transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-lg bg-error/10 text-error text-sm p-3">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full"
                size="lg"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-6 rounded-lg bg-gray-50 p-4 text-xs text-secondary">
              <p className="font-medium text-foreground mb-1">
                Demo Credentials
              </p>
              <p>
                Email: <span className="font-mono">demo@quickdash.com</span>
              </p>
              <p>
                Password: <span className="font-mono">demo123456</span>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}