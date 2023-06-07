type CacheEntry = {
  value: string
  expiredTime: number
}

const cache = new Map<string, CacheEntry>()

export const setCache = (key: string, value: unknown) => {
  setCacheWithExpiration(key, value, Date.now())
}

export const setCacheWithExpiration = (key: string, value: unknown, expiredTime: number) => {
  if (value) {
    cache.set(key, {
      value: JSON.stringify(value),
      expiredTime: expiredTime,
    })
  }
}

export function getCache<T>(key: string): T | undefined {
  const entry = cache.get(key)
  if (entry) {
    if (entry.expiredTime < Date.now()) {
      // value expired. Remove from cache
      cache.delete(key)
      return undefined
    } else {
      return JSON.parse(entry.value)
    }
  }

  return undefined
}
