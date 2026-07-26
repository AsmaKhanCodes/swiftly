import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

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
    .from("coverage_areas")
    .select("*")
    .eq("company_id", companyId)
    .order("area_name")

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ coverage_areas: data })
}

export async function POST(request: Request) {
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
  const { area_name } = body

  if (!area_name || typeof area_name !== "string" || area_name.length < 2) {
    return NextResponse.json(
      { error: "Area name must be at least 2 characters" },
      { status: 400 }
    )
  }

  const { data, error } = await supabase
    .from("coverage_areas")
    .insert({ company_id: companyId, area_name })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ coverage_area: data }, { status: 201 })
}

export async function DELETE(request: Request) {
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

  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "Coverage area ID required" }, { status: 400 })
  }

  const { error } = await supabase
    .from("coverage_areas")
    .delete()
    .eq("id", id)
    .eq("company_id", companyId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
