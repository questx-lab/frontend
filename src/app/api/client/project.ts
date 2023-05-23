import { EnvVariables } from '@/constants/env.const'
import { Rsp } from '@/types/common.type'
import {
  CategoryType,
  CollaboratorType,
  LeaderboardType,
  ListProjectsType,
  ProjectType,
  ReqNewProject,
  ReqNewRoleProject,
  ReqUpdateProject,
} from '@/types/project.type'

import { api } from '../config/api'

export const newProjectApi = async (
  body: ReqNewProject
): Promise<Rsp<{ id: string }>> => {
  const rs = await api.post(
    EnvVariables.NEXT_PUBLIC_API_URL + '/createCommunity',
    body
  )
  return rs.data
}

export const getProjectApi = async (
  id: string
): Promise<Rsp<{ community: ProjectType }>> => {
  const rs = await api.get(
    EnvVariables.NEXT_PUBLIC_API_URL + `/getCommunity?id=${id}`
  )
  return rs.data
}

export const updateProjectApi = async (
  data: ReqUpdateProject
): Promise<Rsp<unknown>> => {
  const rs = await api.post(
    EnvVariables.NEXT_PUBLIC_API_URL + '/updateCommunity',
    data
  )
  return rs.data
}

export const listProjectsApi = async (
  offset: number = 0,
  limit: number = 12,
  search?: string,
  byTrending: boolean = false
): Promise<Rsp<ListProjectsType>> => {
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

export const addRoleProjectApi = async (
  data: ReqNewRoleProject
): Promise<Rsp<{ id: string }>> => {
  const rs = await api.post(
    EnvVariables.NEXT_PUBLIC_API_URL + '/createCollaborator',
    data
  )
  return rs.data
}

export const getMyProjectsApi = async (): Promise<
  Rsp<{ collaborators: CollaboratorType[] }>
> => {
  const rs = await api.get(
    EnvVariables.NEXT_PUBLIC_API_URL + '/getMyCollaborators'
  )
  return rs.data
}

export const getFollowProjectApi = async (): Promise<
  Rsp<{ communities: ProjectType[] }>
> => {
  const rs = await api.get(
    EnvVariables.NEXT_PUBLIC_API_URL + '/getFollowingCommunities'
  )
  return rs.data
}

export const newFollowProjectApi = async (
  projectId: string
): Promise<Rsp<{}>> => {
  const rs = await api.post(EnvVariables.NEXT_PUBLIC_API_URL + '/follow', {
    community_id: projectId,
  })
  return rs.data
}

export const createCategoryApi = async (
  projectId: string,
  name: string
): Promise<Rsp<{}>> => {
  const rs = await api.post(
    EnvVariables.NEXT_PUBLIC_API_URL + '/createCategory',
    {
      community_id: projectId,
      name,
    }
  )
  return rs.data
}

export const getCategoriesApi = async (
  projectId: string
): Promise<Rsp<{ categories: CategoryType[] }>> => {
  const rs = await api.get(
    EnvVariables.NEXT_PUBLIC_API_URL +
      `/getCategories?community_id=${projectId}`
  )
  return rs.data
}

export const getLeaderboardApi = async (
  projectId: string,
  range: string,
  type: string
): Promise<Rsp<{ leaderboard: LeaderboardType[] }>> => {
  const rs = await api.get(
    EnvVariables.NEXT_PUBLIC_API_URL +
      `/getLeaderBoard?community_id=${projectId}&range=${range}&type=${type}`
  )
  return rs.data
}

export const generateProjectKeyApi = async (
  projectId: string
): Promise<Rsp<{ key: string }>> => {
  const { data } = await api.post(
    EnvVariables.NEXT_PUBLIC_API_URL + '/generateAPIKey',
    {
      community_id: projectId,
    }
  )
  return data
}

export const getProjectApiKeys = async (
  projectId: string
): Promise<Rsp<{}>> => {
  const { data } = await api.post(
    EnvVariables.NEXT_PUBLIC_API_URL + '/generateAPIKey',
    {
      community_id: projectId,
    }
  )
  return data
}
