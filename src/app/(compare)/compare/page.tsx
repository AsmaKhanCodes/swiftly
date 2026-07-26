"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Sparkles, MapPin, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { EmptyState } from "@/components/shared/empty-state"
import type {
  CompareResult,
  DeliveryCategory,
  Recommendation,
} from "@/types"

const categories: {
  value: DeliveryCategory
  label: string
  icon: string
}[] = [
  { value: "grocery", label: "Grocery", icon: "🛒" },
  { value: "medicine", label: "Medicine", icon: "💊" },
  { value: "food_pickup", label: "Food Pickup", icon: "🍔" },
  { value: "parcel", label: "Parcel", icon: "📦" },
  { value: "documents", label: "Documents", icon: "📄" },
  { value: "other", label: "Other", icon: "✨" },
]

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-gray-200/60 bg-white p-5 animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-lg bg-gray-200" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-28 rounded bg-gray-200" />
          <div className="h-3 w-16 rounded bg-gray-200" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-gray-100" />
        <div className="h-3 w-3/4 rounded bg-gray-100" />
        <div className="h-3 w-1/2 rounded bg-gray-100" />
      </div>
    </div>
  )
}

export default function ComparePage() {
  const router = useRouter()
  const [category, setCategory] = useState<DeliveryCategory | null>(null)
  const [pickup, setPickup] = useState("")
  const [destination, setDestination] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<CompareResult[]>([])
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null)
  const [recommendLoading, setRecommendLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleCompare = async () => {
    if (!category || pickup.length < 2) return

    setLoading(true)
    setSearched(true)
    setResults([])
    setRecommendation(null)

    try {
      const res = await fetch("/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          pickup,
          destination: destination || undefined,
        }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error)

      setResults(data.results)

      if (data.results.length > 0) {
        setRecommendLoading(true)
        try {
          const recRes = await fetch("/api/recommend", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ results: data.results }),
          })
          const recData = await recRes.json()
          if (recRes.ok) {
            setRecommendation(recData.recommendation)
          }
        } finally {
          setRecommendLoading(false)
        }
      }
    } catch (err) {
      console.error("Compare error:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = (companyId: string, result: CompareResult) => {
    if (!category) return
    const params = new URLSearchParams({
      company_id: companyId,
      pickup,
      category,
      estimated_fee: result.estimated_fee.toString(),
      estimated_time: result.estimated_time.toString(),
      company_name: result.company.name,
      brand_color: result.company.brand_color,
    })
    if (destination) params.set("destination", destination)
    router.push(`/request/${companyId}?${params.toString()}`)
  }

  const isFormValid = category !== null && pickup.length >= 2

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Compare Delivery Services
          </h1>
          <p className="mt-3 text-lg text-secondary">
            Find the best option for your delivery in seconds
          </p>
        </div>

        {/* Category Selection */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-foreground mb-3">
            What do you need delivered?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all duration-200 hover:shadow-sm ${
                  category === cat.value
                    ? "border-primary bg-primary-50 shadow-sm"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <span className="text-2xl">{cat.icon}</span>
                <span
                  className={`text-sm font-medium ${
                    category === cat.value ? "text-primary" : "text-foreground"
                  }`}
                >
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Pickup & Destination */}
        <Card className="p-5 border border-gray-200/60 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label
                htmlFor="pickup"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Pickup Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary" />
                <Input
                  id="pickup"
                  placeholder="e.g., Downtown Market"
                  className="pl-9"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1">
              <label
                htmlFor="destination"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Destination <span className="text-secondary font-normal">(optional)</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary" />
                <Input
                  id="destination"
                  placeholder="Leave blank if unknown"
                  className="pl-9"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Button
              onClick={handleCompare}
              disabled={!isFormValid || loading}
              className="w-full sm:w-auto"
              size="lg"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Comparing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Compare
                </span>
              )}
            </Button>
          </div>
        </Card>

        {/* Loading Skeleton */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI Recommendation */}
        <AnimatePresence>
          {recommendLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 rounded-xl border border-primary-200 bg-primary-50/50 p-5 animate-pulse"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="h-5 w-5 rounded bg-primary-200" />
                <div className="h-4 w-36 rounded bg-primary-200" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-40 rounded bg-primary-100" />
                <div className="h-3 w-full rounded bg-primary-100" />
                <div className="h-3 w-3/4 rounded bg-primary-100" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recommendation */}
        <AnimatePresence>
          {recommendation && !recommendLoading && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="mb-8 rounded-xl border border-primary-200 bg-primary-50 p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-primary">
                  AI Recommendation
                </span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-white text-sm font-bold"
                  style={{
                    backgroundColor: recommendation.company.company.brand_color,
                  }}
                >
                  {recommendation.company.company.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {recommendation.company.company.name}
                  </p>
                  <p className="text-xs text-secondary">
                    ${recommendation.company.estimated_fee.toFixed(2)} &middot; ~
                    {recommendation.company.estimated_time} min
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {recommendation.reasons.map((reason) => (
                  <Badge
                    key={reason}
                    variant="outline"
                    className="bg-white text-primary border-primary-200 text-xs"
                  >
                    {reason}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-secondary leading-relaxed">
                {recommendation.explanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {searched && !loading && results.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <EmptyState
                icon={Package}
                title="No companies found"
                message="No delivery companies are currently available for this category and location. Try a different category or pickup area."
              />
            </motion.div>
          )}
        </AnimatePresence>

        {results.length > 0 && !loading && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.06 },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {results.map((result) => (
              <motion.div
                key={result.company.id}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full flex flex-col p-5 border border-gray-200/60 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white text-sm font-bold"
                      style={{
                        backgroundColor: result.company.brand_color,
                      }}
                    >
                      {result.company.name[0]}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="font-semibold text-foreground text-sm truncate">
                          {result.company.name}
                        </p>
                        {result.company.is_verified && (
                          <Badge
                            variant="outline"
                            className="text-[10px] px-1 py-0 h-4 border-success/30 text-success"
                          >
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div
                          className={`h-1.5 w-1.5 rounded-full ${
                            result.company.is_available
                              ? "bg-success"
                              : "bg-error"
                          }`}
                        />
                        <span className="text-xs text-secondary">
                          {result.company.is_available
                            ? "Available"
                            : "Unavailable"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-secondary">Estimated Fee</span>
                    <span className="font-semibold text-foreground">
                      ${result.estimated_fee.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-secondary">Estimated Time</span>
                    <span className="font-medium text-foreground">
                      ~{result.estimated_time} min
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-4">
                    <span className="text-secondary">Coverage</span>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        result.covers_area
                          ? "border-success/30 text-success"
                          : "border-warning/30 text-warning"
                      }`}
                    >
                      {result.covers_area
                        ? "Covers your area"
                        : "Limited coverage"}
                    </Badge>
                  </div>

                  <div className="mt-auto">
                    <Button
                      className="w-full"
                      size="sm"
                      disabled={!result.company.is_available}
                      onClick={() => handleSelect(result.company.id, result)}
                    >
                      {result.company.is_available
                        ? "Select Company"
                        : "Unavailable"}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
