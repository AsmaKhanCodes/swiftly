"use client"

import { useState } from "react"
import { useRouter, useParams, useSearchParams } from "next/navigation"
import { ArrowLeft, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { requestSchema } from "@/validations"

export default function RequestPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()

  const companyId = params.id as string
  const companyName = searchParams.get("company_name") ?? ""
  const brandColor = searchParams.get("brand_color") ?? "#4F46E5"
  const pickup = searchParams.get("pickup") ?? ""
  const destination = searchParams.get("destination") ?? ""
  const category = searchParams.get("category") ?? ""
  const estimatedFee = Number.parseFloat(searchParams.get("estimated_fee") ?? "0")
  const estimatedTime = Number.parseInt(searchParams.get("estimated_time") ?? "0")

  const [shoppingList, setShoppingList] = useState("")
  const [notes, setNotes] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const parsed = requestSchema.safeParse({
      company_id: companyId,
      pickup,
      destination: destination || undefined,
      category,
      shopping_list: shoppingList,
      notes: notes || undefined,
      phone_number: phoneNumber,
      estimated_fee: estimatedFee,
      estimated_time: estimatedTime,
    })

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors
      const firstError = Object.values(fieldErrors).flat()[0]
      setError(firstError ?? "Please fix the form errors")
      return
    }

    setSubmitting(true)

    try {
      const res = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(
          typeof data.error === "string"
            ? data.error
            : "Failed to submit request"
        )
      }

      router.push(
        `/request/confirmation/${data.request.id}?company_name=${encodeURIComponent(companyName)}`
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm text-secondary hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to results
        </button>

        <Card className="p-6 border border-gray-200/60">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl text-white text-lg font-bold"
              style={{ backgroundColor: brandColor }}
            >
              {companyName[0]}
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                {companyName}
              </h1>
              <p className="text-sm text-secondary">
                ${estimatedFee.toFixed(2)} &middot; ~{estimatedTime} min
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-sm text-secondary space-y-1">
            <p>
              <span className="font-medium text-foreground">Pickup:</span>{" "}
              {pickup}
            </p>
            {destination && (
              <p>
                <span className="font-medium text-foreground">
                  Destination:
                </span>{" "}
                {destination}
              </p>
            )}
            <p>
              <span className="font-medium text-foreground">Category:</span>{" "}
              {category.replace("_", " ")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <Label htmlFor="shopping-list">Shopping List / Items</Label>
              <Textarea
                id="shopping-list"
                placeholder="e.g., 2kg rice, 1L milk, eggs (12 pack), bread..."
                className="mt-1.5 min-h-[100px]"
                value={shoppingList}
                onChange={(e) => setShoppingList(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="notes">
                Notes <span className="text-secondary font-normal">(optional)</span>
              </Label>
              <Textarea
                id="notes"
                placeholder="Any special instructions for the delivery..."
                className="mt-1.5 min-h-[80px]"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                className="mt-1.5"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="rounded-lg bg-error/10 text-error text-sm p-3">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={submitting}
              className="w-full"
              size="lg"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Submitting...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Submit Request
                </span>
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
