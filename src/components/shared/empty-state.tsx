import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  message: string
  actionLabel?: string
  actionHref?: string
  onAction?: () => void
}

export function EmptyState({
  icon: Icon,
  title,
  message,
  actionLabel,
  actionHref,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-400 mb-6">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-secondary max-w-sm mb-6">{message}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref}>
          <Button variant="outline" size="sm">
            {actionLabel}
          </Button>
        </Link>
      )}
      {actionLabel && onAction && !actionHref && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
