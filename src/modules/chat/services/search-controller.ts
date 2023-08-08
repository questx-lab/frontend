import { getCommunityFollowersApi } from '@/api/communitiy'
import { ErrorCodes } from '@/constants/code.const'
import { UserType } from '@/types'

const QUERY_CACHE_EXPIRED = 24 * 60 * 60 * 1000 // cache for 1 day

type CacheEntry = {
  community_handle: string
  query: string
  expiredTime: number
  users: UserType[]
}

class SearchController {
  private queryUsers = new Map<string, CacheEntry>()

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

  async get(query: string, community_handle: string, callback: (users: UserType[]) => void) {
    // Get data from local cache.
    const cachedUsers = this.getFromCache(query, community_handle)
    callback(cachedUsers)

    // Get data from server
    const apiUsers = await this.getFromApi(query, community_handle)
    this.setToCache(query, community_handle, apiUsers)
    callback(apiUsers)
  }
}

const searchController = new SearchController()

export default searchController
