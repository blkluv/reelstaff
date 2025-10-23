// lib/safeFeatures.ts
export function safeFeatures(features: unknown): string[] {
  if (Array.isArray(features)) {
    return features.filter(
      (x): x is string => typeof x === 'string' && x.trim() !== ''
    )
  }

  if (typeof features === 'string' && features.trim() !== '') {
    return features.split(',').map((s) => s.trim())
  }

  return []
}
