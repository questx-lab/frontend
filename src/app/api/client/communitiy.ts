import { api } from '@/app/api/config/api'
import { EnvVariables } from '@/constants/env.const'
import { CollaboratorType, CommunityType, ListCommunitiesType, Rsp } from '@/utils/type'

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
  return rs.data
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
  const rs = await api.get(EnvVariables.NEXT_PUBLIC_API_URL + '/getFollowingCommunities')
  return rs.data
}
