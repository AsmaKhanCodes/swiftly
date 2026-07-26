import { PageHeader } from "@/components/shared/page-header"

export default function AboutPage() {
  return (
    <div className="py-20">
      <PageHeader
        title="About Swiftly"
        description="Making local delivery comparison simple, fast, and transparent."
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-col gap-8 text-secondary leading-relaxed">
          <p>
            Swiftly was built to solve a simple problem: in many cities, local
            delivery companies only operate through WhatsApp. Customers have to
            message multiple companies individually asking about availability and
            pricing, then manually compare replies.
          </p>
          <p>
            We created Swiftly to bring all this information into one place.
            Compare prices, availability, estimated delivery times, and coverage
            areas from multiple local delivery services instantly.
          </p>
          <p>
            Our AI-powered recommendation engine helps you choose the best option
            based on your needs. No account required — just enter your details and
            start comparing.
          </p>
        </div>
      </div>
    </div>
  )
}
