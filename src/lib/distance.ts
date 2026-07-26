export interface DistanceResult {
  distanceKm: number
  durationMinutes: number
}

export async function calculateDistance(
  _origin: string,
  _destination: string | null
): Promise<DistanceResult> {
  const distanceKm = Math.floor(Math.random() * 6) + 2
  const durationMinutes = Math.floor(distanceKm * 3) + 5
  return { distanceKm, durationMinutes }
}
