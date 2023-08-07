import { getCommunityFollowersApi } from '@/api/communitiy'
import { ErrorCodes } from '@/constants/code.const'
import { UserType } from '@/types'

const QUERY_CACHE_EXPIRED = 24 * 60 * 60 * 1000 // cache for 1 day

export interface SearchListener {
  onLoaded: (query: string, community_handle: string, users: UserType[]) => void
}

type CacheEntry = {
  community_handle: string
  query: string
  expiredTime: number
  users: UserType[]
}

class SearchController {
  private searchListeners = new Set<SearchListener>()
  private queryUsers = new Map<string, CacheEntry>()

  addListener(listener: SearchListener) {
    this.searchListeners.add(listener)
  }

  removeListener(listener: SearchListener) {
    this.searchListeners.delete(listener)
  }

  getKey(query: string, community_handle: string) {
    return `${query}|${community_handle}`
  }

  getFromCache(query: string, community_handle: string) {
    const key = this.getKey(query, community_handle)
    const entry = this.queryUsers.get(key)
    if (entry) {
      if (entry.expiredTime < Date.now()) {
        // value expired. Remove from cache
        this.queryUsers.delete(key)
        return []
      } else {
        return entry.users
      }
    }

    return []
  }

  setToCache(query: string, community_handle: string, users: UserType[]) {
    const key = this.getKey(query, community_handle)
    this.queryUsers.set(key, {
      community_handle: community_handle,
      query: query,
      expiredTime: Date.now() + QUERY_CACHE_EXPIRED,
      users: users,
    })
  }

  async getFromApi(query: string, community_handle: string) {
    const resp = await getCommunityFollowersApi(community_handle, query, 5) // only get 5 followers
    if (resp.code === ErrorCodes.NOT_ERROR && resp.data) {
      return resp.data.followers.map((follower) => {
        return follower.user
      })
    }

    return []
  }

  async get(
    query: string,
    community_handle: string,
    callback: (query: string, community_handle: string, users: UserType[]) => void
  ) {
    const cachedUsers = this.getFromCache(query, community_handle)
    callback(query, community_handle, cachedUsers)
    const apiUsers = await this.getFromApi(query, community_handle)
    this.setToCache(query, community_handle, apiUsers)
    callback(query, community_handle, apiUsers)
  }
}

const searchController = new SearchController()

export default searchController
