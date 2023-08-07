import { UserType } from '@/types'

const MAX_CACHE_QUERY = 50
const QUERY_CACHE_EXPIRED = 24 * 60 * 60 * 1000 // cache for 1 day

type CacheEntry = {
  community_handle: string
  query: string
  expiredTime: number
  users: UserType[]
}

let cache: CacheEntry[] = []

/**
 * Lazy update clean in every function calls.
 */
const clean = () => {
  cache = cache.filter((user) => user.expiredTime > Date.now())
}

export const getQuery = (query: string, community_handle: string): UserType[] | undefined => {
  clean()
  const result = cache.find(
    (entry) => entry.query === query && entry.community_handle === community_handle
  )

  if (!result || result.users.length === 0) return undefined
  return result.users
}

export const setQuery = (query: string, community_handle: string, users: UserType[]) => {
  clean()
  // If cache full delete the old one.
  if (cache.length === MAX_CACHE_QUERY) cache.shift()
  cache.push({
    community_handle: community_handle,
    query: query,
    users: users,
    expiredTime: Date.now() + QUERY_CACHE_EXPIRED,
  })
}
