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

Swiftly aggregates local delivery companies into a single comparison interface. Enter your pickup and destination, choose a category, and compare pricing, estimated times, and availability across multiple companies — no account required.

---

## Live Demo

- **Live Application:** `https://your-vercel-url.vercel.app`
- **GitHub Repository:** `https://github.com/your-username/swiftly`

Open the live application in your browser — no installation or account needed.

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

This wastes time, creates friction, and makes price comparison impractical. Customers often settle for the first company that replies rather than the best option. Small courier companies struggle to get discovered because there is no central directory.

---

## Solution

Swiftly aggregates participating delivery companies into a single comparison interface. Customers enter their pickup location, select a category, and instantly see side-by-side pricing, estimated times, and coverage across multiple companies.

**This MVP demonstrates the concept with seeded demo companies** stored in Supabase. A production version would allow delivery companies to register themselves, manage their own pricing and availability, and receive requests through the platform.

---

## Why Swiftly?

Most delivery applications represent a single company or marketplace with internal fleets. Swiftly targets a different niche: **local courier companies** that already operate independently through WhatsApp.

| Problem | How Swiftly Helps |
|---|---|
| Manual WhatsApp messaging | One comparison interface instead of many chat threads |
| Opaque pricing | Transparent fees side by side |
| Unknown availability | See which companies are available instantly |
| Limited visibility for small couriers | Marketplace model gives smaller companies equal footing |
| No price competition | Customers choose the best value, not the first reply |

Swiftly is a **marketplace**, not a delivery service. It connects customers with existing delivery companies and lets the customer choose.

---

## Features

### Customer Features

- **Category-first comparison** — Select what you need (Grocery, Medicine, Food Pickup, Parcel, Documents, Other), then compare companies side by side
- **AI recommendation** — Highlighted best option with Gemini-generated explanation
- **Request submission** — Fill pickup location, shopping list, and phone; submit directly to the chosen company
- **Confirmation page** — Track request ID after submission
- **No account required** — Full comparison and request flow are anonymous
- **About & Contact pages** — Company information and contact details

### Company Features

- **Dashboard** — Today's requests, pending count, completed count, availability toggle
- **Request management** — Filter by status (All/Pending/Accepted/Completed) with accept, complete, and cancel actions
- **Pricing editor** — Inline edit base fee, price per km, and estimated time per category; save changes per row
- **Coverage area management** — Add and remove delivery coverage areas
- **Profile page** — Read-only company profile (editing is not yet implemented)
- **Authentication** — Login via Supabase Auth with auto-account provisioning from seed data

### AI Features

- **Algorithmic scoring** — Fee (40%), time (30%), coverage (20%), verified status (10%)
- **Gemini explanation** — Natural-language justification for the recommended company (model: `gemini-2.0-flash`)
- **Graceful fallback** — Template explanation used if Gemini API key is unset or the call fails

### Platform Features

- **Mobile-first responsive design** — Optimized for all screen sizes
- **WCAG AA accessibility** — Skip-link navigation, `:focus-visible` outlines, semantic HTML, `aria-label` attributes
- **Dark/light awareness** — CSS variables adapt to system color scheme
- **Framer Motion animations** — Micro-interactions and page transitions
- **Zod validation** — All API inputs validated server-side before processing
- **Route protection** — Company dashboard routes guarded via Next.js 16 proxy pattern

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

## Tech Stack

| Technology | Why It Was Chosen |
|---|---|
| **Next.js 16** (App Router) | React framework with server components, API routes, and Turbopack for fast development. App Router route groups match our page structure naturally. |
| **TypeScript** | Type safety across the full stack — database queries, API responses, component props, and Zod schemas share consistent types. |
| **Tailwind CSS v4** | Utility-first CSS with the new `@theme inline` system. Zero runtime, small bundles, and rapid responsive design. |
| **shadcn/ui** (base-nova) | Copy-paste UI components built on `@base-ui/react` and `@radix-ui/react`. Accessible, unstyled primitives wrapped with Tailwind — no npm dependency on pre-built components. |
| **Supabase** | PostgreSQL database with built-in authentication. The same platform handles schema, auth, and API queries. Free tier is generous for an MVP. |
| **Gemini API** (`gemini-2.0-flash`) | Fast, cost-effective LLM for generating natural-language recommendation explanations. Called only after all calculations are done server-side. |
| **React Hook Form + Zod** | Performant form handling with schema-based validation. Reduces re-renders and keeps validation logic in one place. |
| **Framer Motion** | Lightweight animation library for page transitions, hover effects, and micro-interactions. |
| **Lucide React** | Consistent, tree-shakeable icon set with first-class React support. |

---

## System Architecture

```
┌──────────┐
│ Customer │  (No account required)
└────┬─────┘
     │
     ▼
┌──────────────────────┐
│  Next.js 16          │
│  Frontend            │
│  (App Router)        │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  Next.js API Routes  │
│  (10 route handlers) │
└───┬──────────────────┘
    │
    ├────────────────┐
    │                │
    ▼                ▼
┌──────────┐   ┌──────────┐
│ Supabase │   │ Gemini   │
│ DB +     │   │ 2.0      │
│ Auth     │   │ Flash    │
└──────────┘   └──────────┘
```

The frontend communicates exclusively with Next.js API routes. API routes query Supabase for pricing, coverage, and company data. The recommendation route calls Gemini only for natural-language explanation — scoring and selection are computed server-side.

---

## How It Works

### Customer Journey

1. **Browse categories** on the landing page or go directly to `/compare`.
2. **Select a delivery category** (Grocery, Medicine, Food Pickup, Parcel, Documents, Other).
3. **Enter pickup and destination** areas.
4. **Compare results** — cards display each company's estimated fee, estimated time, coverage badge, and verification status, sorted by price ascending.
5. **View the AI recommendation** — the top pick is highlighted with an explanation.
6. **Select a company** and fill in the request form (shopping list, notes, phone number).
7. **Submit the request** — the company receives it in their dashboard.
8. **Confirmation page** displays the request ID and next steps (the company will contact the customer via phone).

### Company Dashboard

Companies log in at `/company/login` to access their management portal:

- **Dashboard** — Overview of today's requests, pending count, completed count, and an availability toggle
- **Requests** — View and manage incoming delivery requests (accept, complete, or cancel)
- **Pricing** — Edit base fee, price per km, and estimated time per delivery category
- **Coverage** — Add or remove delivery coverage areas
- **Profile** — Read-only company information (editing coming in a future release)

### Comparison & Pricing

When a customer initiates a comparison, the backend:

1. Fetches all pricing rows for the selected category, joined with company data
2. Calculates estimated fees and times using:

```
Estimated Fee   = Base Fee + (Distance × Price per km)
Estimated Time  = Base Minutes + (Distance × 2)
```

3. Filters to available companies only
4. Sorts results by estimated fee ascending

Distance is currently simulated (randomized 2–7 km). A production version would use the Google Maps Distance Matrix API for accurate calculations.

---

## AI Recommendation Engine

The AI recommendation follows a strict separation of concerns:

**Backend calculation (always runs):**
- Scores each company using a weighted formula
- Fee score (40% weight) — normalized across all results
- Time score (30% weight) — normalized across all results
- Coverage bonus (20% weight) — awarded if the company covers the customer's area
- Verification bonus (10% weight) — awarded if the company is verified

**Gemini explanation (optional):**
- The highest-scoring company is selected algorithmically
- Gemini 2.0 Flash receives the best company and all result data
- It generates 2–3 sentences explaining *why* this company is the best option
- If the Gemini API key is not configured, a template explanation is used instead

**The backend calculates all pricing and scoring. Gemini only explains the recommendation.**

---

## MVP Scope

### What's Implemented Today

- Category-based comparison (Grocery, Medicine, Food Pickup, Parcel, Documents, Other)
- Estimated fee and time calculation using configured pricing tables
- Mock distance estimation (randomized 2–7 km range)
- AI-powered recommendation with Gemini-generated explanation
- Delivery request submission with confirmation page
- Company dashboard: stats, request management, pricing editor, coverage area CRUD, availability toggle
- Supabase authentication with auto-provisioning for demo accounts
- Route protection via Next.js 16 proxy pattern
- Responsive, mobile-first design with WCAG AA accessibility

### What Belongs to the Production Roadmap

- **Company self-registration** — onboarding flow for new delivery businesses
- **WhatsApp Business API** — submit requests and receive status updates via WhatsApp
- **Live rider availability** — real-time driver status per company
- **Google Maps Distance Matrix API** — accurate distance and duration for fee calculation
- **Online payments** — integrated checkout per request
- **Customer accounts** — request history, saved locations, favorite companies
- **Push notifications** — alert companies of new requests and customers of status changes
- **Analytics dashboard** — request volume, revenue trends, peak hours, customer locations
- **Ratings & Reviews** — post-delivery feedback visible on company profiles
- **GPS live tracking** — real-time rider location during delivery

---

## Getting Started

### Prerequisites

- Node.js 20.9+
- npm 10+
- A Supabase project (free tier)
- A Google Gemini API key (free tier, optional)

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
2. Open the SQL Editor and run `supabase/schema.sql` to create all tables, triggers, and indexes.
3. Run `supabase/seed.sql` to populate demo companies, pricing, coverage areas, and company user records.

**Important:** The `seed.sql` file inserts company user records into the `company_users` table for reference, but it does **not** create Supabase Authentication users. Authentication accounts are created automatically on first login via the `/api/auth/login` route, which uses the `SUPABASE_SERVICE_ROLE_KEY` to provision users through the Supabase Admin API.

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

### Production Build

```bash
npm run build
npm start
```

---

## Deployment

The application is designed for deployment on Vercel. Set the environment variables listed above in your Vercel project settings.

**Live Application:** `https://your-vercel-url.vercel.app`

---

## Roadmap

- [ ] **Company self-registration** — Onboarding flow with public signup for delivery businesses
- [ ] **WhatsApp Business API** — Send request submissions and status updates via WhatsApp
- [ ] **Live rider availability** — Real-time toggle per rider, not just per company
- [ ] **Google Maps Distance Matrix API** — Accurate distance and duration for fee calculation
- [ ] **Push notifications** — Alert companies of new requests and customers of status changes
- [ ] **Online payments** — Pay per request with escrow-style release on completion
- [ ] **Analytics dashboard** — Request volume, revenue trends, peak hours, customer locations
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

- **Next.js** — React framework and App Router architecture
- **Supabase** — PostgreSQL database, authentication, and hosting infrastructure
- **Google Gemini** — AI language model for recommendation explanations
- **shadcn/ui** — Accessible component system and design patterns
- **Framer Motion** — Motion library for React animations
- **Lucide** — Open-source icon set
- **Radix UI** — Unstyled, accessible UI primitives
- **React Hook Form** — Performant form management
- **Zod** — TypeScript-first schema validation