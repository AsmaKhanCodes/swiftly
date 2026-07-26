import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { calculateDistance } from "@/lib/distance"
import {
  calculateEstimatedFee,
  calculateEstimatedTime,
} from "@/lib/pricing-calculator"
import { compareSchema } from "@/validations"
import type { CompareResult } from "@/types"

export async function POST(request: Request) {
  const body = await request.json()
  const parsed = compareSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  const { category, pickup, destination } = parsed.data
  const supabase = await createClient()

  const [distanceResult, { data: pricing, error }] = await Promise.all([
    calculateDistance(pickup, destination ?? ""),
    supabase
      .from("pricing")
      .select("*, company:companies(*)")
      .eq("category", category)
      .not("company_id", "is", null),
  ])

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!pricing || pricing.length === 0) {
    return NextResponse.json({ results: [], distance: distanceResult })
  }

  const results: CompareResult[] = pricing
    .filter((p: any) => p.company)
    .map((p: any) => {
      const fee = calculateEstimatedFee(
        p.base_fee,
        p.price_per_km,
        distanceResult.distanceKm
      )
      const time = calculateEstimatedTime(
        p.estimated_time_minutes,
        distanceResult.distanceKm
      )

      const reasons: string[] = []
      if (p.company.is_verified) reasons.push("Verified")

      return {
        company: {
          id: p.company.id,
          name: p.company.name,
          slug: p.company.slug,
          description: p.company.description,
          logo_url: p.company.logo_url,
          brand_color: p.company.brand_color,
          is_available: p.company.is_available,
          is_verified: p.company.is_verified,
          average_rating: p.company.average_rating,
          created_at: p.company.created_at,
          updated_at: p.company.updated_at,
        },
        pricing: {
          id: p.id,
          company_id: p.company_id,
          category: p.category,
          base_fee: p.base_fee,
          price_per_km: p.price_per_km,
          estimated_time_minutes: p.estimated_time_minutes,
          created_at: p.created_at,
          updated_at: p.updated_at,
        },
        estimated_fee: fee,
        estimated_time: time,
        covers_area: true,
        match_reasons: reasons,
      }
    })
    .filter((r: CompareResult) => r.company.is_available)
    .sort((a: CompareResult, b: CompareResult) => a.estimated_fee - b.estimated_fee)

  return NextResponse.json({ results, distance: distanceResult })
}
