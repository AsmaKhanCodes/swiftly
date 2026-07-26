export type DeliveryCategory =
  | "grocery"
  | "medicine"
  | "food_pickup"
  | "parcel"
  | "documents"
  | "other"

export type RequestStatus = "pending" | "accepted" | "completed" | "cancelled"

export interface Company {
  id: string
  name: string
  slug: string
  description: string
  logo_url: string | null
  brand_color: string
  is_available: boolean
  is_verified: boolean
  average_rating: number | null
  created_at: string
  updated_at: string
}

export interface CoverageArea {
  id: string
  company_id: string
  area_name: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Pricing {
  id: string
  company_id: string
  category: DeliveryCategory
  base_fee: number
  price_per_km: number
  estimated_time_minutes: number
  created_at: string
  updated_at: string
}

export interface CompareResult {
  company: Company
  pricing: Pricing
  estimated_fee: number
  estimated_time: number
  covers_area: boolean
  match_reasons: string[]
}

export interface DeliveryRequest {
  id: string
  company_id: string
  pickup_location: string
  destination: string | null
  category: DeliveryCategory
  shopping_list: string
  notes: string | null
  phone_number: string
  estimated_fee: number
  estimated_time: number
  status: RequestStatus
  created_at: string
  updated_at: string
}

export interface CompanyUser {
  id: string
  company_id: string
  email: string
  name: string
  created_at: string
  updated_at: string
}

export interface Recommendation {
  company: CompareResult
  reasons: string[]
  explanation: string
}
