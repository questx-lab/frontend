const cache = new Map<string, string>()

export const setCache = (key: string, value: unknown) => {
  if (value) {
    cache.set(key, JSON.stringify(value))
  }
}

export function getCache<T>(key: string): T | undefined {
  const value = cache.get(key)
  if (value) {
    return JSON.parse(value)
  }

  return undefined
}
