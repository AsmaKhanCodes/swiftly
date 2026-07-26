import { GoogleGenerativeAI } from "@google/generative-ai"
import type { CompareResult } from "@/types"

const apiKey = process.env.GEMINI_API_KEY

export async function getRecommendation(
  bestCompany: CompareResult,
  allResults: CompareResult[]
): Promise<string> {
  if (!apiKey) {
    const fee = bestCompany.estimated_fee.toFixed(2)
    return `${bestCompany.company.name} offers the best value at $${fee} with an estimated ${bestCompany.estimated_time}-minute delivery. Their combination of competitive pricing, coverage in your area, and verified service makes them the recommended choice for this delivery.`
  }

  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction:
      "You are Swiftly's AI recommendation engine. You analyze delivery company comparisons and explain recommendations concisely. Never mention you are an AI. Write naturally as if giving advice.",
  })

  const resultsSummary = allResults
    .map(
      (r, i) =>
        `${i + 1}. ${r.company.name}: $${r.estimated_fee.toFixed(2)}, ${r.estimated_time}min, ${r.covers_area ? "covers area" : "limited coverage"}, ${r.company.is_verified ? "verified" : "unverified"}`
    )
    .join("\n")

  const prompt = `Based on this comparison, explain in 2-3 sentences why ${bestCompany.company.name} is the best choice:

Best: ${bestCompany.company.name} - $${bestCompany.estimated_fee.toFixed(2)} - ${bestCompany.estimated_time}min

All options:
${resultsSummary}

Write 2-3 concise sentences explaining the recommendation. Mention specific advantages like price, speed, or coverage. No greetings, no JSON.`

  try {
    const result = await model.generateContent(prompt)
    const text = result.response.text()
    if (text.length < 20) throw new Error("Response too short")
    return text
  } catch {
    const fee = bestCompany.estimated_fee.toFixed(2)
    return `${bestCompany.company.name} offers the best balance at $${fee} with ~${bestCompany.estimated_time} minute delivery, combining competitive pricing with reliable service for your delivery needs.`
  }
}
