"use client"

import { useEffect, useState } from "react"
import { DollarSign, Save } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EmptyState } from "@/components/shared/empty-state"
import type { DeliveryCategory, Pricing } from "@/types"

interface PricingRow {
  category: DeliveryCategory
  base_fee: number
  price_per_km: number
  estimated_time_minutes: number
}

const categoryLabels: Record<DeliveryCategory, string> = {
  grocery: "Grocery",
  medicine: "Medicine",
  food_pickup: "Food Pickup",
  parcel: "Parcel",
  documents: "Documents",
  other: "Other",
}

export default function CompanyPricingPage() {
  const [rows, setRows] = useState<PricingRow[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const fetchPricing = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/company/pricing")
      const data = await res.json()
      if (res.ok) {
        setRows(
          (data.pricing ?? []).map((p: Pricing) => ({
            category: p.category,
            base_fee: p.base_fee,
            price_per_km: p.price_per_km,
            estimated_time_minutes: p.estimated_time_minutes,
          }))
        )
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPricing()
  }, [])

  const updateRow = (category: DeliveryCategory, field: keyof PricingRow, value: string) => {
    setRows((prev) =>
      prev.map((r) =>
        r.category === category ? { ...r, [field]: Number.parseFloat(value) || 0 } : r
      )
    )
  }

  const saveRow = async (category: DeliveryCategory) => {
    setSaving(category)
    setMessage(null)
    const row = rows.find((r) => r.category === category)
    if (!row) return

    try {
      const res = await fetch("/api/company/pricing", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(row),
      })

      if (res.ok) {
        setMessage(`Updated ${categoryLabels[category]} pricing`)
        setTimeout(() => setMessage(null), 2000)
      } else {
        setMessage("Failed to save")
      }
    } finally {
      setSaving(null)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 w-32 rounded bg-gray-200" />
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-16 rounded-xl bg-gray-100" />
        ))}
      </div>
    )
  }

  if (rows.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Pricing
        </h1>
        <Card className="border border-gray-200/60">
          <EmptyState
            icon={DollarSign}
            title="No pricing configured"
            message="Set up your delivery pricing to start receiving requests."
          />
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Pricing
        </h1>
        {message && (
          <Badge variant="outline" className="border-success/30 text-success">
            {message}
          </Badge>
        )}
      </div>

      <div className="space-y-3">
        {rows.map((row) => (
          <Card
            key={row.category}
            className="p-4 border border-gray-200/60 flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <div className="sm:w-28 shrink-0">
              <p className="text-sm font-medium text-foreground">
                {categoryLabels[row.category]}
              </p>
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-secondary mb-1">
                  Base Fee ($)
                </label>
                <Input
                  type="number"
                  step="0.5"
                  min="0"
                  value={row.base_fee}
                  onChange={(e) => updateRow(row.category, "base_fee", e.target.value)}
                  className="h-8 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-secondary mb-1">
                  Price/km ($)
                </label>
                <Input
                  type="number"
                  step="0.25"
                  min="0"
                  value={row.price_per_km}
                  onChange={(e) =>
                    updateRow(row.category, "price_per_km", e.target.value)
                  }
                  className="h-8 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-secondary mb-1">
                  Est. Time (min)
                </label>
                <Input
                  type="number"
                  step="1"
                  min="1"
                  value={row.estimated_time_minutes}
                  onChange={(e) =>
                    updateRow(
                      row.category,
                      "estimated_time_minutes",
                      e.target.value
                    )
                  }
                  className="h-8 text-sm"
                />
              </div>
            </div>
            <Button
              size="sm"
              className="shrink-0"
              onClick={() => saveRow(row.category)}
              disabled={saving === row.category}
            >
              <Save className="h-3.5 w-3.5 mr-1" />
              Save
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
