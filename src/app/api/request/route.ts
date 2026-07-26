import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { requestSchema } from "@/validations"

export async function POST(request: Request) {
  const body = await request.json()
  const parsed = requestSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  const supabase = await createClient()

  const { data, error } = await supabase
    .from("delivery_requests")
    .insert({
      company_id: parsed.data.company_id,
      pickup_location: parsed.data.pickup,
      destination: parsed.data.destination ?? null,
      category: parsed.data.category,
      shopping_list: parsed.data.shopping_list,
      notes: parsed.data.notes ?? null,
      phone_number: parsed.data.phone_number,
      estimated_fee: parsed.data.estimated_fee,
      estimated_time: parsed.data.estimated_time,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ request: data }, { status: 201 })
}
