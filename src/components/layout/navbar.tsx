"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        scrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-gray-200/50"
          : "bg-background"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white text-sm font-bold">
            S
          </div>
          <span className="text-xl font-semibold tracking-tight text-foreground">
            Swiftly
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-secondary hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/company/login">
            <Button variant="outline" size="sm">
              Company Login
            </Button>
          </Link>
          <Link href="/compare">
            <Button size="sm">Start Comparing</Button>
          </Link>
        </div>

        <Sheet>
          <SheetTrigger
            className="md:hidden inline-flex items-center justify-center rounded-lg h-9 w-9 hover:bg-gray-100 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col gap-6 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg text-secondary hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <hr className="border-gray-200" />
              <Link href="/company/login">
                <Button variant="outline" className="w-full">
                  Company Login
                </Button>
              </Link>
              <Link href="/compare">
                <Button className="w-full">Start Comparing</Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
