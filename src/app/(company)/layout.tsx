import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import CompanySidebar from "@/components/layout/company-sidebar"

export default async function CompanyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/company/login")
  }

  return (
    <div className="flex min-h-screen bg-background">
      <CompanySidebar />
      <main className="flex-1 overflow-auto p-6 sm:p-8">{children}</main>
    </div>
  )
}
