export function calculateEstimatedFee(
  baseFee: number,
  pricePerKm: number,
  distanceKm: number
): number {
  return Math.round((baseFee + distanceKm * pricePerKm) * 100) / 100
}

export function calculateEstimatedTime(
  baseMinutes: number,
  distanceKm: number
): number {
  return baseMinutes + distanceKm * 2
}
