"use client"

import { useEffect, useState } from "react"
import { Settings, Save } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export default function CompanyProfilePage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: "",
    description: "",
    logo_url: "",
  })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/companies")
        const data = await res.json()
        if (res.ok && data.companies?.length > 0) {
          const c = data.companies[0]
          setForm({
            name: c.name ?? "",
            description: c.description ?? "",
            logo_url: c.logo_url ?? "",
          })
        }
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)
    // Profile editing is read-only for MVP
    setMessage("Profile editing coming soon")
    setTimeout(() => setMessage(null), 2000)
    setSaving(false)
  }

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-32 rounded bg-gray-200" />
        <div className="h-64 rounded-xl bg-gray-100" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">
        Profile
      </h1>

      <Card className="p-6 border border-gray-200/60 max-w-2xl">
        <div className="flex flex-col gap-5">
          <div>
            <Label htmlFor="name">Company Name</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="mt-1.5"
              disabled
            />
            <p className="text-xs text-secondary mt-1">
              Company name cannot be changed
            </p>
          </div>

          <div>
            <Label htmlFor="desc">Description</Label>
            <Textarea
              id="desc"
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              className="mt-1.5 min-h-[100px]"
              disabled
            />
          </div>

          <div>
            <Label htmlFor="logo">Logo URL</Label>
            <Input
              id="logo"
              value={form.logo_url}
              onChange={(e) =>
                setForm((f) => ({ ...f, logo_url: e.target.value }))
              }
              className="mt-1.5"
              placeholder="https://example.com/logo.png"
              disabled
            />
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={handleSave} disabled={saving}>
              <Save className="h-4 w-4 mr-1.5" />
              Save Changes
            </Button>
            {message && (
              <Badge
                variant="outline"
                className="border-success/30 text-success"
              >
                {message}
              </Badge>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
