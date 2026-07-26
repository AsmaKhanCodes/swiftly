import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ShoppingCart,
  Pill,
  UtensilsCrossed,
  Package,
  FileText,
  Ellipsis,
  Clock,
  ShieldCheck,
  Zap,
  ArrowRight,
  Sparkles,
} from "lucide-react"

const categories = [
  { icon: ShoppingCart, label: "Grocery", desc: "Fresh produce & essentials", href: "/compare?category=grocery" },
  { icon: Pill, label: "Medicine", desc: "Prescriptions & health products", href: "/compare?category=medicine" },
  { icon: UtensilsCrossed, label: "Food Pickup", desc: "Restaurant meals to go", href: "/compare?category=food_pickup" },
  { icon: Package, label: "Parcel", desc: "Packages & shipments", href: "/compare?category=parcel" },
  { icon: FileText, label: "Documents", desc: "Important papers & contracts", href: "/compare?category=documents" },
  { icon: Ellipsis, label: "Other", desc: "Everything else", href: "/compare?category=other" },
]

const steps = [
  { icon: Zap, title: "Enter Your Details", desc: "Tell us your pickup location, category, and destination." },
  { icon: Clock, title: "Compare Companies", desc: "See prices, availability, and estimated times side by side." },
  { icon: ShieldCheck, title: "Submit & Relax", desc: "Choose the best option and submit your request." },
]

const benefits = [
  { title: "Save Time", desc: "No more messaging multiple companies on WhatsApp. Compare everything in one place instantly." },
  { title: "Compare Fairly", desc: "See all prices, availability, and estimated delivery times side by side with AI-powered recommendations." },
  { title: "No Account Needed", desc: "Start comparing immediately. No sign-up, no password, no hassle." },
]

const partners = [
  { name: "QuickDash", color: "#3B82F6" },
  { name: "GoParcel", color: "#14B8A6" },
  { name: "MediExpress", color: "#EF4444" },
  { name: "FreshCart", color: "#22C55E" },
  { name: "FoodRush", color: "#F97316" },
  { name: "SwiftCourier", color: "#6366F1" },
]

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm">
              <Sparkles className="mr-1.5 h-3.5 w-3.5 text-primary" />
              AI-Powered Delivery Comparison
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Compare Local Delivery Services in Seconds.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-secondary sm:text-xl">
              Stop messaging multiple companies on WhatsApp. Compare prices,
              availability, and delivery times from local delivery services all
              in one place — powered by AI.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/compare">
                <Button size="lg" className="w-full sm:w-auto text-base px-8">
                  Start Comparing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-base px-8"
                >
                  See How It Works
                </Button>
              </a>
            </div>
          </div>

          {/* Hero mockup */}
          <div className="mt-20 mx-auto max-w-5xl">
            <Card className="overflow-hidden border border-gray-200/80 shadow-xl">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200/80 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-error" />
                <div className="h-3 w-3 rounded-full bg-warning" />
                <div className="h-3 w-3 rounded-full bg-success" />
                <span className="ml-3 text-xs text-secondary font-medium">
                  Swiftly — Compare Results
                </span>
              </div>
              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {[
                    { name: "MediExpress", fee: "$8.50", time: "12 min", color: "#EF4444" },
                    { name: "QuickDash", fee: "$9.00", time: "14 min", color: "#3B82F6" },
                    { name: "SwiftCourier", fee: "$11.00", time: "16 min", color: "#6366F1" },
                  ].map((item, i) => (
                    <Card key={i} className="p-4 border border-gray-200/60">
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-lg text-white text-sm font-bold"
                          style={{ backgroundColor: item.color }}
                        >
                          {item.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.name}</p>
                          <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-success" />
                            <span className="text-xs text-success">Available</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-secondary">Est. Fee</span>
                        <span className="font-semibold text-foreground">{item.fee}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-1">
                        <span className="text-secondary">Est. Time</span>
                        <span className="font-medium text-foreground">{item.time}</span>
                      </div>
                      {i === 0 && (
                        <Badge className="mt-3 w-full justify-center bg-primary/10 text-primary hover:bg-primary/20 border-0">
                          <Sparkles className="mr-1 h-3 w-3" />
                          Recommended
                        </Badge>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Popular Categories
            </h2>
            <p className="mt-3 text-secondary text-lg">
              Choose what you need delivered
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat) => (
              <Link key={cat.label} href={cat.href}>
                <Card className="flex flex-col items-center gap-3 p-6 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer border border-gray-200/60 h-full">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary">
                    <cat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{cat.label}</p>
                    <p className="text-xs text-secondary mt-1">{cat.desc}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              How It Works
            </h2>
            <p className="mt-3 text-secondary text-lg">
              Three simple steps to get your delivery
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.title} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px border-t border-dashed border-gray-300" />
                )}
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary mb-6">
                  <step.icon className="h-7 w-7" />
                </div>
                <div className="mx-auto mb-4 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                  {i + 1}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-secondary leading-relaxed max-w-xs mx-auto">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Swiftly */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Why Swiftly?
            </h2>
            <p className="mt-3 text-secondary text-lg">
              The smarter way to find local delivery
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {benefits.map((benefit) => (
              <Card
                key={benefit.title}
                className="p-8 border border-gray-200/60 hover:shadow-md transition-shadow duration-200"
              >
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-sm text-secondary leading-relaxed">
                  {benefit.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Companies */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Demo Partner Companies
            </h2>
            <p className="mt-3 text-secondary text-lg">
              Compare and choose from our trusted delivery partners
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {partners.map((p) => (
              <Card
                key={p.name}
                className="flex flex-col items-center gap-3 p-6 text-center border border-gray-200/60"
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-xl text-white text-lg font-bold"
                  style={{ backgroundColor: p.color }}
                >
                  {p.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{p.name}</p>
                  <Badge variant="outline" className="mt-1 text-[10px] px-1.5 py-0 h-5">
                    <ShieldCheck className="mr-0.5 h-3 w-3 text-success" />
                    Verified
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-3xl text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Ready to Find Your Delivery?
          </h2>
          <p className="mt-4 text-lg text-secondary">
            No account needed. Start comparing local delivery services now.
          </p>
          <div className="mt-8">
            <Link href="/compare">
              <Button size="lg" className="text-base px-10">
                Start Comparing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
