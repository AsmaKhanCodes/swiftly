"use client"

import { useEffect, useState } from "react"
import {
  LayoutDashboard,
  ClipboardList,
  CheckCircle2,
  Clock,
  Power,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { EmptyState } from "@/components/shared/empty-state"
import type { DeliveryRequest } from "@/types"

interface DashboardStats {
  todayCount: number
  pendingCount: number
  completedToday: number
  isAvailable: boolean
  companyName: string
}

export default function CompanyDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [requests, setRequests] = useState<DeliveryRequest[]>([])
  const [toggling, setToggling] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const [reqRes, companyRes] = await Promise.all([
        fetch("/api/company/requests"),
        fetch("/api/companies"),
      ])

      const reqData = await reqRes.json()
      const companyData = await companyRes.json()

      if (reqRes.ok) {
        setRequests(reqData.requests ?? [])
      }

      if (companyRes.ok && companyData.companies?.length > 0) {
        setStats({
          todayCount: (reqData.requests ?? []).filter(
            (r: DeliveryRequest) =>
              new Date(r.created_at).toDateString() === new Date().toDateString()
          ).length,
          pendingCount: (reqData.requests ?? []).filter(
            (r: DeliveryRequest) => r.status === "pending"
          ).length,
          completedToday: (reqData.requests ?? []).filter(
            (r: DeliveryRequest) =>
              r.status === "completed" &&
              new Date(r.created_at).toDateString() === new Date().toDateString()
          ).length,
          isAvailable: true,
          companyName: companyData.companies[0]?.name ?? "Company",
        })
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const toggleAvailability = async () => {
    setToggling(true)
    try {
      const res = await fetch("/api/company/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_available: !stats?.isAvailable }),
      })
      if (res.ok) {
        setStats((prev) =>
          prev ? { ...prev, isAvailable: !prev.isAvailable } : prev
        )
      }
    } finally {
      setToggling(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-48 rounded bg-gray-200" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 rounded-xl bg-gray-100" />
          ))}
        </div>
        <div className="h-64 rounded-xl bg-gray-100" />
      </div>
    )
  }

  const recentRequests = requests.slice(0, 5)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        {stats && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-secondary">
              {stats.isAvailable ? "Accepting deliveries" : "Not accepting"}
            </span>
            <Switch
              checked={stats.isAvailable}
              onCheckedChange={toggleAvailability}
              disabled={toggling}
              aria-label="Toggle availability"
            />
          </div>
        )}
      </div>

      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5 border border-gray-200/60">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary">
                <ClipboardList className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {stats.todayCount}
                </p>
                <p className="text-xs text-secondary">Today&apos;s Requests</p>
              </div>
            </div>
          </Card>

          <Card className="p-5 border border-gray-200/60">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10 text-warning">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {stats.pendingCount}
                </p>
                <p className="text-xs text-secondary">Pending Requests</p>
              </div>
            </div>
          </Card>

          <Card className="p-5 border border-gray-200/60">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 text-success">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {stats.completedToday}
                </p>
                <p className="text-xs text-secondary">Completed Today</p>
              </div>
            </div>
          </Card>

          <Card className="p-5 border border-gray-200/60">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary">
                <Power className="h-5 w-5" />
              </div>
              <div>
                <Badge
                  variant="outline"
                  className={
                    stats.isAvailable
                      ? "border-success/30 text-success"
                      : "border-error/30 text-error"
                  }
                >
                  {stats.isAvailable ? "Active" : "Inactive"}
                </Badge>
                <p className="text-xs text-secondary mt-1">
                  Availability Status
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Recent Requests */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Recent Requests
        </h2>
        {recentRequests.length === 0 ? (
          <Card className="border border-gray-200/60">
            <EmptyState
              icon={LayoutDashboard}
              title="No requests yet"
              message="When customers submit delivery requests, they will appear here."
            />
          </Card>
        ) : (
          <div className="space-y-3">
            {recentRequests.map((req) => (
              <Card
                key={req.id}
                className="p-4 border border-gray-200/60 flex items-center justify-between"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {req.pickup_location}
                    {req.destination && ` → ${req.destination}`}
                  </p>
                  <p className="text-xs text-secondary mt-0.5">
                    {req.category.replace("_", " ")} &middot; $
                    {req.estimated_fee.toFixed(2)}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={`shrink-0 ml-4 ${
                    req.status === "pending"
                      ? "border-warning/30 text-warning"
                      : req.status === "accepted"
                      ? "border-primary/30 text-primary"
                      : req.status === "completed"
                      ? "border-success/30 text-success"
                      : "border-error/30 text-error"
                  }`}
                >
                  {req.status}
                </Badge>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
