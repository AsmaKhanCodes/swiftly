# Swiftly — Build Instructions

## Stack
- Next.js 16 (App Router) — Turbopack by default
- Tailwind CSS v4 — theme defined in `globals.css` via `@theme inline`
- shadcn/ui v4 (base-nova style) — uses `@base-ui/react` not Radix
- Supabase — PostgreSQL + Auth
- Gemini API — AI recommendations
- Framer Motion — micro-animations

## Key Conventions
- `proxy.ts` replaces `middleware.ts` (Next.js 16 breaking change)
- Async request APIs: `params`, `searchParams`, `cookies()`, `headers()` must be `await`ed
- No `asChild` prop — base-ui uses `render` prop instead
- All API routes validate with Zod before processing
- Mobile-first responsive design
- WCAG AA: skip-link, focus-visible, semantic HTML, aria labels

## Build Commands
```bash
npm run dev     # next dev (Turbopack)
npm run build   # next build
npx tsc --noEmit  # TypeScript check
eslint .         # ESLint
```

## Database
- Schema: `supabase/schema.sql`
- Seed: `supabase/seed.sql`
- Auto-update `updated_at` via trigger on all tables
