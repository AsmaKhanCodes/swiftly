"use client"

import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function ConfirmationPage() {
  const params = useParams()
  const searchParams = useSearchParams()

  const requestId = params.id as string
  const companyName = searchParams.get("company_name") ?? "the company"

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="text-center"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
          <CheckCircle2 className="h-8 w-8 text-success" />
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Request Submitted!
        </h1>
        <p className="mt-3 text-lg text-secondary max-w-md mx-auto">
          Your delivery request has been sent to{" "}
          <span className="font-semibold text-foreground">{companyName}</span>.
        </p>

        <Card className="mt-8 p-5 border border-gray-200/60 max-w-xs mx-auto">
          <p className="text-xs text-secondary mb-1">Request ID</p>
          <p className="text-sm font-mono text-foreground break-all">
            {requestId}
          </p>
        </Card>

        <div className="mt-8 rounded-lg bg-gray-50 p-5 text-sm text-secondary max-w-md mx-auto">
          <p className="font-medium text-foreground mb-1">
            What happens next?
          </p>
          <p>
            {companyName} will review your request and contact you shortly at
            the phone number you provided.
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/compare">
            <Button size="lg" className="w-full sm:w-auto">
              Compare Again
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
