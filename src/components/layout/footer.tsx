import Link from "next/link"

const categories = [
  { label: "Grocery", href: "/compare?category=grocery" },
  { label: "Medicine", href: "/compare?category=medicine" },
  { label: "Food Pickup", href: "/compare?category=food_pickup" },
  { label: "Parcel", href: "/compare?category=parcel" },
  { label: "Documents", href: "/compare?category=documents" },
  { label: "Other", href: "/compare?category=other" },
]

const quickLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Company Login", href: "/company/login" },
  { label: "Start Comparing", href: "/compare" },
]

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white text-sm font-bold">
                S
              </div>
              <span className="text-xl font-semibold text-white">Swiftly</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              AI-powered local delivery comparison. Compare prices, availability,
              and delivery times from local services in one place.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">
              Categories
            </h3>
            <ul className="flex flex-col gap-3">
              {categories.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/company/login"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Partner Login
                </Link>
              </li>
              <li>
                <span className="text-sm text-gray-500">
                  Become a Partner
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} Swiftly. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
