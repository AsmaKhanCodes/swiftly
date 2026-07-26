"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  ClipboardList,
  DollarSign,
  MapPin,
  Settings,
  LogOut,
  ChevronLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"

const navItems = [
  { href: "/company/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/company/requests", label: "Requests", icon: ClipboardList },
  { href: "/company/pricing", label: "Pricing", icon: DollarSign },
  { href: "/company/coverage", label: "Coverage", icon: MapPin },
  { href: "/company/profile", label: "Profile", icon: Settings },
]

export default function CompanySidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/company/login")
    router.refresh()
  }

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-gray-200/60 bg-white transition-all duration-200",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200/60">
        {!collapsed && (
          <Link href="/company/dashboard" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-white text-xs font-bold">
              S
            </div>
            <span className="text-sm font-semibold text-foreground">
              Swiftly
            </span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center h-7 w-7 rounded-md hover:bg-gray-100 transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 text-secondary transition-transform duration-200",
              collapsed && "rotate-180"
            )}
          />
        </button>
      </div>

      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-primary-50 text-primary font-medium"
                  : "text-secondary hover:text-foreground hover:bg-gray-50"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      <div className="p-2 border-t border-gray-200/60">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-secondary hover:text-error hover:bg-error/5 transition-colors"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}
