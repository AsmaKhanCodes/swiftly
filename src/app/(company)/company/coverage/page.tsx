"use client"

import { useEffect, useState } from "react"
import { MapPin, Plus, Trash2, Power } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { EmptyState } from "@/components/shared/empty-state"
import type { CoverageArea } from "@/types"

export default function CompanyCoveragePage() {
  const [areas, setAreas] = useState<CoverageArea[]>([])
  const [newArea, setNewArea] = useState("")
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)

  const fetchAreas = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/company/coverage")
      const data = await res.json()
      if (res.ok) setAreas(data.coverage_areas ?? [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAreas()
  }, [])

  const addArea = async () => {
    if (newArea.trim().length < 2) return
    setAdding(true)
    try {
      const res = await fetch("/api/company/coverage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ area_name: newArea.trim() }),
      })
      if (res.ok) {
        const data = await res.json()
        setAreas((prev) => [...prev, data.coverage_area])
        setNewArea("")
      }
    } finally {
      setAdding(false)
    }
  }

  const deleteArea = async (id: string) => {
    try {
      const res = await fetch(`/api/company/coverage?id=${id}`, {
        method: "DELETE",
      })
      if (res.ok) {
        setAreas((prev) => prev.filter((a) => a.id !== id))
      }
    } catch (err) {
      console.error("Delete error:", err)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 w-36 rounded bg-gray-200" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-14 rounded-xl bg-gray-100" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">
        Coverage Areas
      </h1>

      <div className="flex items-center gap-3">
        <Input
          placeholder="Add a coverage area..."
          value={newArea}
          onChange={(e) => setNewArea(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addArea()}
          className="max-w-xs"
        />
        <Button
          size="sm"
          onClick={addArea}
          disabled={adding || newArea.trim().length < 2}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>

      {areas.length === 0 ? (
        <Card className="border border-gray-200/60">
          <EmptyState
            icon={MapPin}
            title="No coverage areas added"
            message="Add your coverage areas above to let customers know where you deliver."
          />
        </Card>
      ) : (
        <div className="space-y-2">
          {areas.map((area) => (
            <Card
              key={area.id}
              className="p-4 border border-gray-200/60 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-secondary" />
                <span className="text-sm font-medium text-foreground">
                  {area.area_name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => deleteArea(area.id)}
                  className="text-secondary hover:text-error transition-colors"
                  aria-label={`Delete ${area.area_name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <p className="text-xs text-secondary">
        {areas.length} area{areas.length !== 1 ? "s" : ""} configured
      </p>
    </div>
  )
}
