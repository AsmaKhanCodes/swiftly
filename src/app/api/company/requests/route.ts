import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
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
  const status = searchParams.get("status")

  let query = supabase
    .from("delivery_requests")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false })

  if (status && ["pending", "accepted", "completed", "cancelled"].includes(status)) {
    query = query.eq("status", status)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ requests: data })
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
  const { request_id, status } = body

  if (!request_id || !status) {
    return NextResponse.json(
      { error: "request_id and status are required" },
      { status: 400 }
    )
  }

  if (!["pending", "accepted", "completed", "cancelled"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("delivery_requests")
    .update({ status })
    .eq("id", request_id)
    .eq("company_id", companyId)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ request: data })
}
