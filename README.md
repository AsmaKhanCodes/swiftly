<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.2-000000?logo=next.js&logoColor=white" alt="Next.js 16">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4">
  <img src="https://img.shields.io/badge/Supabase-FF3E00?logo=supabase&logoColor=white" alt="Supabase">
  <img src="https://img.shields.io/badge/Gemini-8E75B2?logo=googlegemini&logoColor=white" alt="Gemini API">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT License">
</p>

# Swiftly

**AI-powered local delivery comparison in seconds.**

Swiftly lets customers compare local delivery companies side by side — prices, availability, estimated times, and coverage — then submit requests directly. No account required.

---

## Problem

In many cities, local delivery companies operate primarily through WhatsApp. Customers face a repetitive manual workflow:

1. Open WhatsApp.
2. Message Company A: *"Are riders available? How much to deliver from X to Y?"*
3. Wait for a reply.
4. Message Company B with the same question.
5. Wait again.
6. Manually compare prices, availability, and response times across scattered chat threads.
7. Repeat until finding a suitable company.

This wastes time, creates friction, and makes price comparison impractical. Customers often settle for the first company that replies rather than the best option.

## Solution

Swiftly aggregates participating delivery companies into a single comparison interface. Customers enter their pickup location, select a category, and instantly see side-by-side pricing, estimated times, and coverage across multiple companies.

**This MVP demonstrates the concept with seeded demo companies** stored in Supabase. A production version would allow delivery companies to register themselves, manage their own pricing and availability, and receive requests through the platform.

## Why Swiftly?

Existing food delivery apps (Uber Eats, Deliveroo, etc.) are restaurant-focused. They serve a single marketplace with a fixed set of drivers. Swiftly targets a different niche: **local courier companies** that already operate independently through WhatsApp.

| Problem | How Swiftly Helps |
|---|---|
| Manual WhatsApp messaging | One comparison interface instead of many chat threads |
| Opaque pricing | Transparent fees side by side |
| Unknown availability | See which companies are available instantly |
| Limited visibility for small couriers | Marketplace model gives smaller companies equal footing |
| No price competition | Customers choose the best value, not the first reply |

Swiftly is a **marketplace**, not a delivery service. It connects customers with existing delivery companies and lets the customer choose.

## MVP Scope

### What's implemented today

- Category-based comparison (Grocery, Medicine, Food Pickup, Parcel, Documents, Other)
- Estimated fee and time calculation using configured pricing tables
- Mock distance estimation (randomized 2–7 km range)
- AI-powered recommendation with natural-language explanation (Gemini 2.0 Flash)
- Delivery request submission with confirmation
- Company dashboard: stats, request management, pricing editor, coverage area CRUD, availability toggle
- Supabase authentication with auto-provisioning for demo accounts
- Route protection via Next.js 16 proxy
- Responsive, mobile-first design with WCAG AA accessibility

### What a production version would include

- **WhatsApp Business API** — submit requests directly via WhatsApp
- **Live rider availability** — real-time driver status per company
- **Real Google Maps distance calculation** — accurate fee and time estimates
- **Online payments** — integrated Stripe checkout per request
- **Company self-registration** — onboarding flow for new delivery businesses
- **Customer accounts** — request history, saved locations, favorites
- **Live tracking** — real-time delivery status updates

---

## How Comparison Works

**Step 1 — Filter companies** by delivery category and enter pickup/destination areas.

**Step 2 — Calculate estimated fee** using the configured pricing for each company:

```
Estimated Fee = Base Fee + (Distance × Price per km)
Estimated Time = Base Minutes + (Distance × 2)
```

Distance is calculated via a mock function (randomized 2–7 km in MVP). A production version would use the Google Maps Distance Matrix API.

**Step 3 — Rank companies** by estimated fee (ascending). Results display company name, estimated fee, estimated time, coverage badge, and verification status.

**Step 4 — Gemini explains the recommendation.** The backend scores each company algorithmically:

| Factor | Weight |
|---|---|
| Normalized estimated fee | 40% |
| Normalized estimated time | 30% |
| Coverage area match | 20% |
| Verification status | 10% |

The highest-scoring company is selected as the recommendation. Gemini 2.0 Flash generates 2–3 sentences explaining *why* this company is the best option — mentioning specific advantages like lowest cost, fastest delivery, or area coverage. If the Gemini API key is not configured, a template explanation is used instead.

**The backend calculates all pricing. Gemini only explains the recommendation.**

## System Architecture

```
┌──────────┐
│ Customer │  (No account required)
└────┬─────┘
     │
     ▼
┌──────────────────┐
│  Next.js 16      │
│  Frontend         │
│  (App Router)    │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│  Next.js API     │
│  Routes (13)     │
└───┬──────────────┘
    │
    ├──────────────┐
    │              │
    ▼              ▼
┌──────────┐ ┌──────────┐
│ Supabase │ │ Gemini   │
│ DB +     │ │ 2.0      │
│ Auth     │ │ Flash    │
└──────────┘ └──────────┘
```

The frontend communicates exclusively with Next.js API routes. API routes query Supabase for pricing, coverage, and company data. The recommendation route calls Gemini only for natural-language explanation — scoring and selection are computed server-side.

## Features

### Customer Features

- **Category-first comparison** — Select what you need (Grocery, Medicine, Food Pickup, Parcel, Documents, Other), then compare companies side by side
- **AI recommendation** — Highlighted best option with Gemini-generated explanation
- **Request submission** — Fill pickup location, shopping list, and phone; submit directly to the chosen company
- **Confirmation page** — Track request ID after submission
- **No account required** — Full comparison and request flow are anonymous
- **About & Contact pages** — Project information and company contact details

### Company Features

- **Dashboard** — Today's requests, pending count, completed count, availability toggle
- **Request management** — Filter by status (All/Pending/Accepted/Completed) with accept/complete/cancel actions
- **Pricing editor** — Inline edit base fee, price per km, and estimated time per category; save changes per row
- **Coverage area management** — Add and remove coverage areas
- **Profile page** — Read-only company profile (MVP placeholder; editing is not yet implemented)
- **Authentication** — Login via Supabase Auth with auto-account provisioning from seed data

### AI Features

- **Algorithmic scoring** — Fee (40%), time (30%), coverage (20%), verified status (10%)
- **Gemini explanation** — Natural-language justification for the recommended company (model: `gemini-2.0-flash`)
- **Graceful fallback** — Client-side template explanation used if Gemini API key is unset or the API call fails

### Platform Features

- **Mobile-first responsive design** — Optimized for all screen sizes
- **WCAG AA accessibility** — Skip-link navigation, `:focus-visible` outlines, semantic HTML, `aria-label` attributes
- **Dark/light awareness** — CSS variables adapt to system color scheme
- **Framer Motion animations** — Micro-interactions and page transitions
- **Zod validation** — All API inputs validated server-side before processing
- **Route protection** — Dashboard routes guarded via Next.js 16 proxy pattern

---

## Tech Stack

| Technology | Why It Was Chosen |
|---|---|
| **Next.js 16** (App Router) | React framework with server components, API routes, and Turbopack for fast development. The App Router supports route groups and layouts that match our page structure naturally. |
| **TypeScript** | Type safety across the full stack — database queries, API responses, component props, and Zod schemas share consistent types. |
| **Tailwind CSS v4** | Utility-first CSS with the new `@theme inline` system. Zero runtime, small bundles, and rapid responsive design. |
| **shadcn/ui** (base-nova) | Copy-paste UI components built on `@base-ui/react`. Accessible, unstyled primitives wrapped with Tailwind — no npm dependency on pre-built components. |
| **Supabase** | PostgreSQL database with built-in authentication. The same platform handles schema, auth, and API queries. Free tier is generous for an MVP. |
| **Gemini API** (`gemini-2.0-flash`) | Fast, cost-effective LLM for generating natural-language recommendation explanations. The model is called only after all calculations are done server-side. |
| **React Hook Form + Zod** | Performant form handling with schema-based validation. Reduces re-renders and keeps validation logic in one place. |
| **Framer Motion** | Lightweight animation library for page transitions, hover effects, and micro-interactions. |
| **Lucide React** | Consistent, tree-shakeable icon set with first-class React support. |

---

## Screenshots

> Add screenshots here once deployed to a live environment.

### Landing Page

```
[Screenshot: Hero section with category cards, how-it-works steps, and partner companies]
```

### Comparison Page

```
[Screenshot: Category selector, pickup/destination inputs, comparison cards grid, AI recommendation badge]
```

### AI Recommendation

```
[Screenshot: Expanded recommendation card showing Gemini-generated explanation with reason badges]
```

### Company Dashboard

```
[Screenshot: Stats cards (Today's Requests, Pending, Completed), availability toggle, recent requests table]
```

### Company Login

```
[Screenshot: Split-screen login page with brand illustration and email/password form]
```

---

## Getting Started

### Prerequisites

- Node.js 20.9+
- npm 10+
- A Supabase project (free tier)
- A Google Gemini API key (free tier)

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

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase anon / publishable key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (used to auto-create auth users on first login) |
| `GEMINI_API_KEY` | Google Gemini API key (optional — recommendations work with fallback text without it) |

### Database Setup

1. Create a Supabase project at [supabase.com](https://supabase.com).
2. Open the SQL Editor and run `supabase/schema.sql` to create the five tables (companies, coverage_areas, pricing, delivery_requests, company_users) with triggers and indexes.
3. Run `supabase/seed.sql` to populate demo companies, pricing, coverage areas, and company user records.

**Important:** The `seed.sql` file inserts company user records into the `company_users` table for reference, but it does **not** create Supabase Authentication users. Authentication accounts are created automatically on first login via the `/api/auth/login` route, which uses the `SUPABASE_SERVICE_ROLE_KEY` to provision users through the Supabase Admin API. The seed data table provides the email addresses and metadata needed for this auto-provisioning.

### Demo Credentials

After database setup, log in to the company dashboard at `/company/login`:

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

### Build & Production

```bash
npm run build
npm start
```

---

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Set the following environment variables in the Vercel dashboard (Settings → Environment Variables):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `GEMINI_API_KEY`

The project uses `next build` as the build command, which Vercel detects automatically. Ensure your Supabase project's IP restrictions (if any) allow inbound requests from Vercel's deployment regions.

---

## Project Structure

```
src/
├── app/
│   ├── (landing)/          # Landing, about, contact pages — public consumer site
│   ├── (compare)/          # Comparison flow: compare, request form, confirmation
│   ├── (company)/          # Company dashboard: layout with auth check + sidebar
│   ├── company/login/      # Branded split-screen login page (public)
│   └── api/                # 13 API route handlers for comparison, auth, company operations
├── components/
│   ├── layout/             # Navbar, footer, company sidebar — shared across route groups
│   ├── shared/             # EmptyState, PageHeader — reusable content components
│   └── ui/                 # shadcn/ui primitives (button, card, dialog, input, select, etc.)
├── lib/
│   ├── supabase/           # Browser and server Supabase client factories
│   ├── gemini.ts           # Gemini AI recommendation engine with fallback
│   ├── pricing-calculator.ts  # Fee and time estimation formulas
│   ├── distance.ts         # Mock distance calculator (MVP: random 2–7 km)
│   └── utils.ts            # cn() utility for conditional Tailwind class merging
├── types/                  # TypeScript interfaces for companies, pricing, requests, API responses
├── validations/            # Zod schemas for compare, request, login, and pricing update inputs
├── proxy.ts                # Next.js 16 middleware replacement — guards /company/* routes
├── hooks/                  # (Available for custom React hooks)
└── services/               # (Available for service-layer abstractions)
```

Key design decisions:

- **Route groups** (`(landing)`, `(compare)`, `(company)`) organize pages by consumer journey without affecting URL paths.
- **API routes** are organized by resource (`/api/company/*`, `/api/auth/*`), with a flat `/api/` for public endpoints.
- **The proxy pattern** (`proxy.ts`) replaces `middleware.ts` from earlier Next.js versions, matching Next.js 16's breaking change.
- **Empty directories** (`hooks/`, `services/`, `features/`) are scaffolding for future iterations.

---

## Roadmap

- [ ] **Company self-registration** — Onboarding flow with invite codes or public signup
- [ ] **WhatsApp Business API** — Send request submissions and status updates via WhatsApp
- [ ] **Live rider availability** — Real-time toggle per rider, not just per company
- [ ] **Google Maps Distance Matrix API** — Accurate distance and duration for fee calculation
- [ ] **Push notifications** — Alert companies of new requests and customers of status changes
- [ ] **Online payments (Stripe)** — Pay per request with escrow-style release on completion
- [ ] **Analytics dashboard** — Request volume, revenue trends, peak hours, customer locations
- [ ] **Rider mobile application** — Dedicated app for delivery personnel
- [ ] **Customer accounts** — Request history, saved addresses, favorite companies
- [ ] **Reviews and ratings** — Post-delivery feedback visible on company profiles
- [ ] **Multi-language support** — i18n for customer and company interfaces
- [ ] **GPS live tracking** — Real-time rider location sharing during delivery

---

## License

MIT © 2026 Swiftly

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

## Acknowledgements

- **Supabase** — PostgreSQL database and authentication platform
- **Google Gemini** — AI language model for recommendation explanations
- **shadcn/ui** — Accessible component system and design patterns
- **Vercel** — Next.js framework and deployment platform
- **Lucide** — Open-source icon set
- **Framer Motion** — Motion library for React
- All demo delivery companies (QuickDash, GoParcel, MediExpress, FreshCart, FoodRush, SwiftCourier) — placeholder brands for MVP demonstration
