import { ONE_MONTH_MILLIS } from '@/utils/time'

type CacheEntry = {
  value: any
  expiredTime: number
}

const cache = new Map<string, CacheEntry>()

/**
 * Sets an item in the cache
 *
 * @param key the key of the item
 * @param value teh value of the item
 */
export const setCache = (key: string, value: any) => {
  setCacheWithExpiration(key, value, Date.now() + ONE_MONTH_MILLIS)
}

/**
 * Sets an item in the cache with a specific expiration time.
 */
export const setCacheWithExpiration = (key: string, value: any, expiredTime: number) => {
  if (value) {
    cache.set(key, {
      value: value,
      expiredTime: expiredTime,
    })
  }
}

/**
 * Gets an item from cache. Returns undefined if the item is not found.
 */
export function getCache<T>(key: string): T | undefined {
  const entry = cache.get(key)
  if (entry) {
    if (entry.expiredTime < Date.now()) {
      // value expired. Remove from cache
      cache.delete(key)
      return undefined
    } else {
      return entry.value
    }
  }

  return undefined
}

/**
 * remove(invalidate) an item from cache.
 */
export function invalidateCache(key: string) {
  cache.delete(key)
}
