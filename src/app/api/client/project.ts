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
    EnvVariables.NEXT_PUBLIC_API_URL + '/createProject',
    body
  )
  return rs.data
}

export const getProjectApi = async (
  id: string
): Promise<Rsp<{ project: ProjectType }>> => {
  const rs = await api.get(
    EnvVariables.NEXT_PUBLIC_API_URL + `/getProjectByID?id=${id}`
  )
  return rs.data
}

export const updateProjectApi = async (
  data: ReqUpdateProject
): Promise<Rsp<unknown>> => {
  const rs = await api.post(
    EnvVariables.NEXT_PUBLIC_API_URL + '/updateProjectByID',
    data
  )
  return rs.data
}

export const listProjectsApi = async (
  offset: number = 0,
  limit: number = 12,
  search?: string
): Promise<Rsp<ListProjectsType>> => {
  let url = `/getListProject?offset=${offset}&limit=${limit}`
  if (search && search.length > 2) {
    url = `/getListProject?offset=${offset}&limit=${limit}&q=${search}`
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
  Rsp<{ projects: ProjectType[] }>
> => {
  const rs = await api.get(
    EnvVariables.NEXT_PUBLIC_API_URL + '/getFollowingProjects'
  )
  return rs.data
}

export const newFollowProjectApi = async (
  projectId: string
): Promise<Rsp<{}>> => {
  const rs = await api.post(EnvVariables.NEXT_PUBLIC_API_URL + '/follow', {
    project_id: projectId,
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
      project_id: projectId,
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
      `/getListCategory?project_id=${projectId}`
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
      `/getLeaderBoard?project_id=${projectId}&range=${range}&type=${type}`
  )
  return rs.data
}

export const generateProjectKeyApi = async (
  projectId: string
): Promise<Rsp<{ key: string }>> => {
  const { data } = await api.post(
    EnvVariables.NEXT_PUBLIC_API_URL + '/generateAPIKey',
    {
      project_id: projectId,
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
      project_id: projectId,
    }
  )
  return data
}
