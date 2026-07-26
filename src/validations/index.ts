import { z } from "zod"

export const compareSchema = z.object({
  category: z.enum([
    "grocery",
    "medicine",
    "food_pickup",
    "parcel",
    "documents",
    "other",
  ]),
  pickup: z.string().min(2, "Pickup location is required"),
  destination: z.string().optional(),
})

export const requestSchema = z.object({
  company_id: z.string().uuid(),
  pickup: z.string().min(2, "Pickup location is required"),
  destination: z.string().optional(),
  category: z.enum([
    "grocery",
    "medicine",
    "food_pickup",
    "parcel",
    "documents",
    "other",
  ]),
  shopping_list: z
    .string()
    .min(3, "Please describe what you need delivered"),
  notes: z.string().optional(),
  phone_number: z
    .string()
    .regex(/^\+?[\d\s\-()]{7,15}$/, "Valid phone number required"),
  estimated_fee: z.number().positive(),
  estimated_time: z.number().positive(),
})

export const companyLoginSchema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const pricingUpdateSchema = z.object({
  category: z.enum([
    "grocery",
    "medicine",
    "food_pickup",
    "parcel",
    "documents",
    "other",
  ]),
  base_fee: z.number().min(0),
  price_per_km: z.number().min(0),
  estimated_time_minutes: z.number().min(1),
})
