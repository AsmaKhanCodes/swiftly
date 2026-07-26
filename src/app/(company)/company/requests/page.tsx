"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ClipboardList, CheckCircle2, XCircle, Eye } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EmptyState } from "@/components/shared/empty-state"
import type { DeliveryRequest, RequestStatus } from "@/types"

const tabs: { label: string; value: RequestStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Accepted", value: "accepted" },
  { label: "Completed", value: "completed" },
]

export default function CompanyRequestsPage() {
  const [requests, setRequests] = useState<DeliveryRequest[]>([])
  const [filter, setFilter] = useState<RequestStatus | "all">("all")
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)

  const fetchRequests = async (status?: string) => {
    setLoading(true)
    try {
      const params = status && status !== "all" ? `?status=${status}` : ""
      const res = await fetch(`/api/company/requests${params}`)
      const data = await res.json()
      if (res.ok) setRequests(data.requests ?? [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRequests(filter === "all" ? undefined : filter)
  }, [filter])

  const updateStatus = async (requestId: string, status: RequestStatus) => {
    setUpdating(requestId)
    try {
      const res = await fetch("/api/company/requests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ request_id: requestId, status }),
      })
      if (res.ok) {
        setRequests((prev) =>
          prev.map((r) => (r.id === requestId ? { ...r, status } : r))
        )
      }
    } finally {
      setUpdating(null)
    }
  }

  const filtered =
    filter === "all" ? requests : requests.filter((r) => r.status === filter)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">
        Requests
      </h1>

      <div className="flex items-center gap-1 rounded-lg bg-gray-100 p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`px-4 py-1.5 text-sm rounded-md transition-colors ${
              filter === tab.value
                ? "bg-white text-foreground font-medium shadow-sm"
                : "text-secondary hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3 animate-pulse">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-gray-100" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Card className="border border-gray-200/60">
          <EmptyState
            icon={ClipboardList}
            title="No requests found"
            message={
              filter === "all"
                ? "You haven't received any delivery requests yet."
                : `No ${filter} requests at the moment.`
            }
          />
        </Card>
      ) : (
        <AnimatePresence>
          <div className="space-y-3">
            {filtered.map((req) => (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
              >
                <Card className="p-5 border border-gray-200/60">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          variant="outline"
                          className={`${
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
                        <span className="text-xs text-secondary">
                          {new Date(req.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-foreground">
                        {req.pickup_location}
                        {req.destination && (
                          <span className="text-secondary">
                            {" "}
                            → {req.destination}
                          </span>
                        )}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-secondary">
                        <span>{req.category.replace("_", " ")}</span>
                        <span>&middot;</span>
                        <span>${req.estimated_fee.toFixed(2)}</span>
                        <span>&middot;</span>
                        <span>~{req.estimated_time} min</span>
                        <span>&middot;</span>
                        <span>{req.phone_number}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {req.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-success/30 text-success hover:bg-success/5"
                            onClick={() => updateStatus(req.id, "accepted")}
                            disabled={updating === req.id}
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-error/30 text-error hover:bg-error/5"
                            onClick={() => updateStatus(req.id, "cancelled")}
                            disabled={updating === req.id}
                          >
                            <XCircle className="h-3.5 w-3.5 mr-1" />
                            Cancel
                          </Button>
                        </>
                      )}
                      {req.status === "accepted" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-success/30 text-success hover:bg-success/5"
                          onClick={() => updateStatus(req.id, "completed")}
                          disabled={updating === req.id}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                          Complete
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-secondary"
                        title="View details"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  )
}
