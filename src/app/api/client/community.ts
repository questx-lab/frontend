import axios from 'axios'

import { EnvVariables } from '@/constants/env.const'
import {
  CategoryType,
  CollaboratorType,
  CommunityType,
  LeaderboardType,
  ListCommunitiesType,
  ReqNewCommunity,
  ReqNewRoleCommunity,
  ReqUpdateCommunity,
  Rsp,
  UserType,
} from '@/utils/type'

import { api } from '../config/api'

export const newCommunityApi = async (
  body: ReqNewCommunity
): Promise<Rsp<{ id: string; handle: string }>> => {
  const rs = await api.post(
    EnvVariables.NEXT_PUBLIC_API_URL + '/createCommunity',
    body
  )
  return rs.data
}

export const getCommunityApi = async (
  id: string
): Promise<Rsp<{ community: CommunityType }>> => {
  const rs = await api.get(
    EnvVariables.NEXT_PUBLIC_API_URL + `/getCommunity?id=@${id}`
  )
  return rs.data
}

export const updateCommunityApi = async (
  data: ReqUpdateCommunity
): Promise<Rsp<unknown>> => {
  const rs = await api.post(
    EnvVariables.NEXT_PUBLIC_API_URL + '/updateCommunity',
    data
  )
  return rs.data
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

export const addRoleCommunityApi = async (
  data: ReqNewRoleCommunity
): Promise<Rsp<{ id: string }>> => {
  const rs = await api.post(
    EnvVariables.NEXT_PUBLIC_API_URL + '/createCollaborator',
    data
  )
  return rs.data
}

export const getMyCommunitiesApi = async (): Promise<
  Rsp<{ collaborators: CollaboratorType[] }>
> => {
  const rs = await api.get(
    EnvVariables.NEXT_PUBLIC_API_URL + '/getMyCollaborators'
  )
  return rs.data
}

export const getFollowCommunitiesApi = async (): Promise<
  Rsp<{ communities: CommunityType[] }>
> => {
  const rs = await api.get(
    EnvVariables.NEXT_PUBLIC_API_URL + '/getFollowingCommunities'
  )
  return rs.data
}

export const newFollowCommunityApi = async (
  communityId: string,
  invitedBy: string
): Promise<Rsp<{}>> => {
  const rs = await api.post(EnvVariables.NEXT_PUBLIC_API_URL + '/follow', {
    community_id: communityId,
    invited_by: invitedBy,
  })
  return rs.data
}

export const getMyFollowerInfoApi = async (
  communityId: string
): Promise<Rsp<{ invite_code: string }>> => {
  const rs = await api.get(
    EnvVariables.NEXT_PUBLIC_API_URL +
      `/getMyFollowerInfo?community_id=${communityId}`
  )
  return rs.data
}

export const createCategoryApi = async (
  communityId: string,
  name: string
): Promise<Rsp<{}>> => {
  const rs = await api.post(
    EnvVariables.NEXT_PUBLIC_API_URL + '/createCategory',
    {
      community_id: communityId,
      name,
    }
  )
  return rs.data
}

export const getCategoriesApi = async (
  communityId: string
): Promise<Rsp<{ categories: CategoryType[] }>> => {
  const rs = await api.get(
    EnvVariables.NEXT_PUBLIC_API_URL +
      `/getCategories?community_id=${communityId}`
  )
  return rs.data
}

export const getLeaderboardApi = async (
  communityId: string,
  range: string,
  type: string
): Promise<Rsp<{ leaderboard: LeaderboardType[] }>> => {
  const rs = await api.get(
    EnvVariables.NEXT_PUBLIC_API_URL +
      `/getLeaderBoard?community_id=${communityId}&range=${range}&type=${type}`
  )
  return rs.data
}

export const generateCommunityKeyApi = async (
  communityId: string
): Promise<Rsp<{ key: string }>> => {
  const { data } = await api.post(
    EnvVariables.NEXT_PUBLIC_API_URL + '/generateAPIKey',
    {
      community_id: communityId,
    }
  )
  return data
}

export const getInviteApi = async (
  inviteCode: string
): Promise<
  Rsp<{
    community: CommunityType
    user: UserType
  }>
> => {
  const resp = await axios.get(
    EnvVariables.NEXT_PUBLIC_API_URL + `/getInvite?invite_code=${inviteCode}`
  )
  return resp.data
}
