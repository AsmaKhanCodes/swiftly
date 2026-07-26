import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { pricingUpdateSchema } from "@/validations"

export async function GET() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const companyId = user.user_metadata?.company_id
  if (!companyId) {
    return NextResponse.json({ error: "No company associated" }, { status: 403 })
  }

  const { data, error } = await supabase
    .from("pricing")
    .select("*")
    .eq("company_id", companyId)
    .order("category")

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ pricing: data })
}

export async function PATCH(request: Request) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const companyId = user.user_metadata?.company_id
  if (!companyId) {
    return NextResponse.json({ error: "No company associated" }, { status: 403 })
  }

  const body = await request.json()
  const parsed = pricingUpdateSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid pricing data" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("pricing")
    .update({
      base_fee: parsed.data.base_fee,
      price_per_km: parsed.data.price_per_km,
      estimated_time_minutes: parsed.data.estimated_time_minutes,
    })
    .eq("company_id", companyId)
    .eq("category", parsed.data.category)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ pricing: data })
}
