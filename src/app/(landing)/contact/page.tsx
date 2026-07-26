import { PageHeader } from "@/components/shared/page-header"
import { Card } from "@/components/ui/card"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="py-20">
      <PageHeader
        title="Contact Us"
        description="Get in touch with the Swiftly team."
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <Card className="flex flex-col items-center gap-3 p-6 text-center border border-gray-200/60">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary">
              <Mail className="h-5 w-5" />
            </div>
            <p className="font-medium text-foreground text-sm">Email</p>
            <p className="text-sm text-secondary">hello@swiftly.demo</p>
          </Card>
          <Card className="flex flex-col items-center gap-3 p-6 text-center border border-gray-200/60">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary">
              <Phone className="h-5 w-5" />
            </div>
            <p className="font-medium text-foreground text-sm">Phone</p>
            <p className="text-sm text-secondary">+1 (555) 123-4567</p>
          </Card>
          <Card className="flex flex-col items-center gap-3 p-6 text-center border border-gray-200/60">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary">
              <MapPin className="h-5 w-5" />
            </div>
            <p className="font-medium text-foreground text-sm">Location</p>
            <p className="text-sm text-secondary">San Francisco, CA</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
