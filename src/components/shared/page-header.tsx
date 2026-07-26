interface PageHeaderProps {
  title: string
  description?: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mx-auto max-w-3xl text-center px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">
        {title}
      </h1>
      {description && (
        <p className="mt-4 text-lg text-secondary">{description}</p>
      )}
    </div>
  )
}
