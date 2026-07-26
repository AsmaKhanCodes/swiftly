import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createClient as createAdminClient } from "@supabase/supabase-js"
import { companyLoginSchema } from "@/validations"

export async function POST(request: Request) {
  const body = await request.json()
  const parsed = companyLoginSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid email or password format" },
      { status: 400 }
    )
  }

  const supabase = await createClient()

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  })

  if (!signInError) {
    return NextResponse.json({ success: true })
  }

  // If sign-in fails, try to create the user from company_users seed data
  if (
    signInError.message?.includes("Invalid login credentials") &&
    process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    const { data: companyUser } = await supabase
      .from("company_users")
      .select("*")
      .eq("email", parsed.data.email)
      .single()

    if (companyUser) {
      const adminClient = createAdminClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      )

      const { error: createError } = await adminClient.auth.admin.createUser({
        email: parsed.data.email,
        password: parsed.data.password,
        email_confirm: true,
        user_metadata: { company_id: companyUser.company_id, name: companyUser.name },
      })

      if (!createError) {
        const { error: retryError } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password,
        })

        if (!retryError) {
          return NextResponse.json({ success: true })
        }
      }
    }
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
}
