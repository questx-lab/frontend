import { api } from '@/api/interceptor'
import { getCache, setCacheWithExpiration } from '@/cache'
import { leaderboardCacheKey } from '@/cache/keys'
import { LeaderboardRangeEnum, LeaderboardSortType } from '@/constants/common.const'
import { EnvVariables } from '@/constants/env.const'
import {
  CategoryType,
  LeaderboardType,
  ListCommunitiesType,
  ListDiscordRoleType,
  OAuth2VerifyResp,
  ReqNewCommunity,
  Rsp,
  UpdateCommunityRequest,
  UpdateCommunityResponse,
  UserType,
} from '@/types'
import {
  CommunityRoleType,
  CommunityType,
  FollowCommunityType,
  ReferralType,
} from '@/types/community'
import { ONE_MINUTE_MILLIS } from '@/utils/time'

class CommunityLoader {
  myCommunities: CommunityType[] | undefined
}

const communityLoader = new CommunityLoader()

export const invalidateMyCommunities = () => (communityLoader.myCommunities = undefined)

/////// List of API ////////
export const getTrendingCommunities = async (): Promise<Rsp<ListCommunitiesType>> => {
  try {
    const result = await listCommunitiesApi(0, 50, '', true)
    return result as Rsp<ListCommunitiesType>
  } catch (err) {
    return {
      code: -1,
      error: 'Failed to load trending community',
    } as Rsp<ListCommunitiesType>
  }
}

export const listCommunitiesApi = async (
  offset: number = 0,
  limit: number = 12,
  search?: string,
  byTrending: boolean = false
): Promise<Rsp<ListCommunitiesType>> => {
  let url = `/getCommunities?offset=${offset}&limit=${limit}`
  if (search && search.length > 2) {
    url = url + `&q=${search}`
  }
  if (byTrending) {
    url = url + `&by_trending=${byTrending}`
  }

  const rs = await api.get(EnvVariables.API_SERVER + url)
  return rs.data as Rsp<ListCommunitiesType>
}

export const getMyCommunitiesApi = async (): Promise<Rsp<{ communities: CommunityType[] }>> => {
  // Check the cache
  if (communityLoader.myCommunities) {
    return {
      code: 0,
      communities: communityLoader.myCommunities,
    } as Rsp<{ communities: CommunityType[] }>
  }

  // Load from server
  const rs = await api.get(EnvVariables.API_SERVER + '/getMyOwnCommunities')
  return rs.data
}

export const getFollowCommunitiesApi = async (): Promise<
  Rsp<{ followers: FollowCommunityType[] }>
> => {
  const rs = await api.get(EnvVariables.API_SERVER + '/getMyFollowing')
  return rs.data
}

export const getCommunityApi = async (id: string): Promise<Rsp<{ community: CommunityType }>> => {
  const rs = await api.get(EnvVariables.API_SERVER + `/getCommunity?community_handle=${id}`)
  return rs.data
}

export const newCommunityApi = async (body: ReqNewCommunity): Promise<Rsp<{ handle: string }>> => {
  const rs = await api.post(EnvVariables.API_SERVER + '/createCommunity', body)
  return rs.data
}

export const getMyFollowerInfoApi = async (
  communityHandle: string
): Promise<Rsp<{ invite_code: string }>> => {
  const rs = await api.get(
    EnvVariables.API_SERVER + `/getMyFollowerInfo?community_handle=${communityHandle}`
  )
  return rs.data
}

export const updateCommunityDiscord = async (
  handle: string,
  server_id: string,
  oauth_access_token: string
): Promise<OAuth2VerifyResp> => {
  const result = await api.post(EnvVariables.API_SERVER + `/updateCommunityDiscord`, {
    community_handle: handle,
    access_token: oauth_access_token,
    server_id: server_id,
  })
  return result.data
}

export const updateCommunityApi = async (
  data: UpdateCommunityRequest
): Promise<Rsp<UpdateCommunityResponse>> => {
  const rs = await api.post(EnvVariables.API_SERVER + '/updateCommunity', data)
  return rs.data
}

export const newFollowCommunityApi = async (
  communityHandle: string,
  invitedBy: string
): Promise<Rsp<{}>> => {
  const rs = await api.post(EnvVariables.API_SERVER + '/follow', {
    community_handle: communityHandle,
    invited_by: invitedBy,
  })
  return rs.data
}

export const getLeaderboardApi = async (
  communityHandle: string,
  range: LeaderboardRangeEnum,
  type: LeaderboardSortType,
  limit: number
): Promise<Rsp<{ leaderboard: LeaderboardType[] }>> => {
  const cacheKey = leaderboardCacheKey(communityHandle, range, type)
  // try getting from cache.
  const cachedValue = getCache<LeaderboardType[]>(cacheKey)
  if (cachedValue) {
    return {
      code: 0,
      data: { leaderboard: cachedValue },
    }
  }

  // fetch from server and saves the result into cache for 5 minutes.
  try {
    const result = await api.get(
      EnvVariables.API_SERVER +
        `/getLeaderBoard?community_handle=${communityHandle}&period=${range}&type=${type}&ordered_by=point&limit=${limit}`
    )

    const data = result.data as Rsp<{ leaderboard: LeaderboardType[] }>
    if (data && data.code === 0 && data.data?.leaderboard) {
      // cache the data.
      setCacheWithExpiration(cacheKey, data.data?.leaderboard, Date.now() + 5 * ONE_MINUTE_MILLIS)
    }

    return data
  } catch {
    return {
      code: -1,
    }
  }
}

export const getInviteApi = async (
  inviteCode: string
): Promise<
  Rsp<{
    user: UserType
    community: CommunityType
  }>
> => {
  const rs = await api.get(EnvVariables.API_SERVER + `/getInvite?invite_code=${inviteCode}`)
  return rs.data
}

export const createCategoryApi = async (
  communityHandle: string,
  name: string
): Promise<Rsp<{ category: CategoryType }>> => {
  const rs = await api.post(EnvVariables.API_SERVER + '/createCategory', {
    community_handle: communityHandle,
    name,
  })
  return rs.data
}

export const getCategoriesApi = async (
  communityHandle: string
): Promise<Rsp<{ categories: CategoryType[] }>> => {
  const rs = await api.get(
    EnvVariables.API_SERVER + `/getCategories?community_handle=${communityHandle}`
  )
  return rs.data
}

export const getReferralApi = async (): Promise<Rsp<{ referrals: ReferralType[] }>> => {
  const rs = await api.get(EnvVariables.API_SERVER + `/getReferrals`)
  return rs.data
}

export const approveReferralApi = async (handle: string, action: string): Promise<Rsp<{}>> => {
  const rs = await api.post(EnvVariables.API_SERVER + '/reviewReferral', {
    community_handle: handle,
    action,
  })
  return rs.data
}

// /approvePendingCommunity
export const approvePendingCommunityApi = async (handle: string): Promise<Rsp<{}>> => {
  const rs = await api.post(EnvVariables.API_SERVER + '/approvePendingCommunity', {
    community_handle: handle,
  })
  return rs.data
}

export const getPendingCommunitiesApi = async (): Promise<Rsp<ListCommunitiesType>> => {
  let url = `/getPendingCommunities`

  const rs = await api.get(EnvVariables.API_SERVER + url)
  return rs.data as Rsp<ListCommunitiesType>
}

export const getDiscordRolesApi = async (handle: string): Promise<Rsp<ListDiscordRoleType>> => {
  const rs = await api.get(EnvVariables.API_SERVER + `/getDiscordRoles?community_handle=${handle}`)
  return rs.data
}

export const getWalletAddressApi = async (
  handle: string
): Promise<Rsp<{ wallet_address: string }>> => {
  const rs = await api.get(EnvVariables.API_SERVER + `/getWalletAddress?community_handle=${handle}`)
  return rs.data
}

export const getCommunityFollowersApi = async (
  communityHandle: string,
  search?: string
): Promise<Rsp<{ followers: FollowCommunityType[] }>> => {
  const rs = await api.get(
    EnvVariables.API_SERVER +
      `/getCommunityFollowers?community_handle=${communityHandle}&q=${search || ''}`
  )
  return rs.data
}

// ROLE
export const getRolesApi = async (handle: string): Promise<Rsp<{ roles: CommunityRoleType[] }>> => {
  const rs = await api.get(EnvVariables.API_SERVER + `/getRoles?community_handle=${handle}`)
  return rs.data
}

export const createRoleApi = async (
  communityHandle: string,
  name: string,
  permissions: bigint,
  color: string
): Promise<Rsp<{}>> => {
  const rs = await api.post(EnvVariables.API_SERVER + '/createRole', {
    community_handle: communityHandle,
    name,
    permissions,
    color,
  })
  return rs.data
}

export const updateRoleApi = async (
  roleId: string,
  name: string,
  permissions: bigint,
  color: string,
  priority?: number
): Promise<Rsp<{}>> => {
  const rs = await api.post(EnvVariables.API_SERVER + '/updateRole', {
    role_id: roleId,
    name,
    permissions,
    color,
    priority,
  })
  return rs.data
}

export const deleteRoleApi = async (roleId: string): Promise<Rsp<{}>> => {
  const rs = await api.post(EnvVariables.API_SERVER + '/deleteRole', {
    role_id: roleId,
  })
  return rs.data
}

export const assignCommunityRoleApi = async (roleId: string, userId: string): Promise<Rsp<{}>> => {
  const rs = await api.post(EnvVariables.API_SERVER + '/assignCommunityRole', {
    role_id: roleId,
    user_id: userId,
  })
  return rs.data
}

export const deleteRoleMemberApi = async (
  communityHandle: string,
  userId: string,
  roleIds: string[]
): Promise<Rsp<{}>> => {
  const rs = await api.post(EnvVariables.API_SERVER + '/deleteUserCommunityRole', {
    community_handle: communityHandle,
    user_id: userId,
    role_ids: roleIds,
  })
  return rs.data
}
