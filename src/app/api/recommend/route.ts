import { NextResponse } from "next/server"
import { getRecommendation } from "@/lib/gemini"
import type { CompareResult, Recommendation } from "@/types"

export async function POST(request: Request) {
  const body = await request.json()
  const { results } = body as { results: CompareResult[] }

  if (!results || !Array.isArray(results) || results.length === 0) {
    return NextResponse.json(
      { error: "No comparison results provided" },
      { status: 400 }
    )
  }

  const scored = results.map((r) => {
    const feeScore = 1 - r.estimated_fee / Math.max(...results.map((x) => x.estimated_fee))
    const timeScore = 1 - r.estimated_time / Math.max(...results.map((x) => x.estimated_time))
    const coverageScore = r.covers_area ? 0.2 : 0
    const verifiedScore = r.company.is_verified ? 0.1 : 0
    const total = feeScore * 0.4 + timeScore * 0.3 + coverageScore + verifiedScore
    return { result: r, score: total }
  })

  scored.sort((a, b) => b.score - a.score)
  const best = scored[0].result

  const reasons: string[] = []
  if (best.estimated_fee === Math.min(...results.map((r) => r.estimated_fee))) {
    reasons.push("Lowest Estimated Cost")
  }
  if (best.estimated_time === Math.min(...results.map((r) => r.estimated_time))) {
    reasons.push("Fastest Estimated Delivery")
  }
  if (best.covers_area) {
    reasons.push("Covers Your Area")
  }
  if (best.match_reasons.includes("Verified")) {
    reasons.push("Category Specialist")
  }

  let explanation = ""

  try {
    explanation = await getRecommendation(best, results)
  } catch {
    explanation = `${best.company.name} offers the best balance of price, speed, and coverage for your delivery needs. With an estimated fee of $${best.estimated_fee.toFixed(2)} and delivery time of approximately ${best.estimated_time} minutes, it provides excellent value for this category.`
  }

  const recommendation: Recommendation = {
    company: best,
    reasons,
    explanation,
  }

  return NextResponse.json({ recommendation })
}
