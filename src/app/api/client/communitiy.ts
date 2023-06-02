import axios from 'axios'

import { api } from '@/app/api/config/api'
import { EnvVariables } from '@/constants/env.const'
import {
  CollaboratorType,
  CommunityType,
  ListCommunitiesType,
  OAuth2VerifyResp,
  ReqNewCommunity,
  Rsp,
} from '@/utils/type'

class CommunityLoader {
  myCommunities: CollaboratorType[] | undefined
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

  const rs = await api.get(EnvVariables.NEXT_PUBLIC_API_URL + url)
  return rs.data as Rsp<ListCommunitiesType>
}

export const getMyCommunitiesApi = async (): Promise<
  Rsp<{ collaborators: CollaboratorType[] }>
> => {
  // Check the cache
  if (communityLoader.myCommunities) {
    return {
      code: 0,
      collaborators: communityLoader.myCommunities,
    } as Rsp<{ collaborators: CollaboratorType[] }>
  }

  // Load from server
  const rs = await api.get(EnvVariables.NEXT_PUBLIC_API_URL + '/getMyCollaborators')
  return rs.data
}

export const getFollowCommunitiesApi = async (): Promise<Rsp<{ communities: CommunityType[] }>> => {
  const rs = await api.get(EnvVariables.NEXT_PUBLIC_API_URL + '/getMyFollowing')
  return rs.data
}

export const getCommunityApi = async (id: string): Promise<Rsp<{ community: CommunityType }>> => {
  const rs = await api.get(
    EnvVariables.NEXT_PUBLIC_API_URL + `/getCommunity?community_handle=${id}`
  )
  return rs.data
}

export const newCommunityApi = async (body: ReqNewCommunity): Promise<Rsp<{ handle: string }>> => {
  const rs = await api.post(EnvVariables.NEXT_PUBLIC_API_URL + '/createCommunity', body)
  return rs.data
}

export const getMyFollowerInfoApi = async (
  communityHandle: string
): Promise<Rsp<{ invite_code: string }>> => {
  const rs = await api.get(
    EnvVariables.NEXT_PUBLIC_API_URL + `/getMyFollowerInfo?community_handle=${communityHandle}`
  )
  return rs.data
}

export const updateCommunityDiscord = async (
  handle: string,
  server_id: string,
  oauth_access_token: string,
  access_token: string
): Promise<OAuth2VerifyResp> => {
  const result = await axios.post(
    EnvVariables.NEXT_PUBLIC_API_URL + `/updateCommunityDiscord`,
    {
      community_handle: handle,
      access_token: oauth_access_token,
      server_id: server_id,
    },
    {
      headers: {
        ContentType: 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
    }
  )
  return result.data
}
