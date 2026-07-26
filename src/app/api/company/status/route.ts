import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

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
  const { is_available } = body

  if (typeof is_available !== "boolean") {
    return NextResponse.json({ error: "is_available must be a boolean" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("companies")
    .update({ is_available })
    .eq("id", companyId)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ company: data })
}
