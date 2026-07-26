# Swiftly

**AI-powered local delivery comparison in seconds.**

Swiftly lets customers compare local delivery companies in one place — prices, availability, estimated times, and coverage — then submit requests directly. No account required.

## Problem

In many cities, local delivery companies only operate through WhatsApp. Customers have to message multiple companies individually asking about availability and pricing, then manually compare replies.

## Solution

Swiftly aggregates all delivery companies into a single comparison interface. Customers enter their pickup location, choose a category, and instantly see side-by-side comparisons with AI-powered recommendations.

## Features

- **Category-first comparison** — Select what you need (Grocery, Medicine, Food Pickup, Parcel, Documents, Other), then compare
- **AI recommendations** — Gemini-powered analysis of the best option with reasons and explanation
- **No account required** — Customers start comparing immediately
- **Company dashboard** — Manage requests, pricing, coverage, and availability
- **Responsive design** — Works on mobile, tablet, and desktop
- **Premium UI** — Inspired by Linear, Stripe, and Vercel design principles

## Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** (App Router) | React framework |
| **TypeScript** | Type safety |
| **Tailwind CSS v4** | Styling |
| **shadcn/ui** (base-nova) | UI components |
| **Supabase** | Database & authentication |
| **Gemini API** | AI recommendations |
| **React Hook Form + Zod** | Form validation |
| **Framer Motion** | Animations |
| **Lucide React** | Icons |

## Screenshots

> Screenshots pending — deploy and capture for production README.

- **Landing Page**: Hero with mockup, category cards, how it works, partner companies
- **Compare Page**: Category-first selection, pickup/destination inputs, comparison cards grid, AI recommendation
- **Company Dashboard**: Split-screen login, stats cards, request management, pricing editor, coverage areas

## Getting Started

### Prerequisites

- Node.js 20.9+ 
- npm 10+
- Supabase project (free tier)
- Gemini API key (free tier)

### Installation

```bash
git clone <repo-url>
cd swiftly
npm install
```

### Environment Variables

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Fill in your credentials:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (for auto-creating demo users) |
| `GEMINI_API_KEY` | Google Gemini API key |

### Database Setup

1. Create a Supabase project
2. Run the schema in `supabase/schema.sql` in the Supabase SQL editor
3. Run the seed data in `supabase/seed.sql` to create demo companies, pricing, and coverage areas

### Demo Credentials

After seeding, log in to the company dashboard with:

| Company | Email | Password |
|---|---|---|
| QuickDash | demo@quickdash.com | demo123456 |
| GoParcel | demo@goparcel.com | demo123456 |
| MediExpress | demo@mediexpress.com | demo123456 |
| FreshCart | demo@freshcart.com | demo123456 |
| FoodRush | demo@foodrush.com | demo123456 |
| SwiftCourier | demo@swiftcourier.com | demo123456 |

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── (landing)/       # Landing page, about, contact
│   ├── (compare)/       # Compare, request, confirmation
│   ├── (company)/       # Company dashboard pages
│   └── api/             # API routes (compare, recommend, request, auth, company)
├── components/
│   ├── layout/          # Navbar, Footer, CompanySidebar
│   ├── shared/          # EmptyState, PageHeader, CompanyCard, RecommendationCard
│   └── ui/              # shadcn/ui components
├── lib/                 # Supabase clients, Gemini, distance, pricing calculator
├── types/               # TypeScript interfaces
├── validations/         # Zod schemas
├── hooks/               # Custom React hooks
└── proxy.ts             # Route protection (Next.js 16 middleware replacement)
```

## AI Feature

The AI recommendation engine:
1. **Scores** each company by estimated fee (40%), delivery time (30%), coverage (20%), and verification status (10%)
2. **Selects** the best option
3. **Calls Gemini** to generate a natural-language explanation with specific reasons (e.g., "✓ Lowest Cost", "✓ Fastest Delivery", "✓ Covers Your Area", "✓ Category Specialist")
4. **Falls back** to a template explanation if Gemini is unavailable

The backend calculates all pricing — Gemini only *explains* the recommendation.

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Set environment variables in the Vercel dashboard:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `GEMINI_API_KEY`

The project is fully optimized for Vercel deployment with `next build`.

## Roadmap

- [ ] WhatsApp integration
- [ ] Online payments (Stripe)
- [ ] GPS tracking
- [ ] Rider mobile app
- [ ] Customer accounts & history
- [ ] Multi-language support
- [ ] Real Google Maps distance calculation
- [ ] Analytics dashboard for companies

## License

MIT
