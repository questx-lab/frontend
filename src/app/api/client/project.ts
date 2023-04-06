import { EnvVariables } from '@/constants/env.const'
import { Rsp } from '@/types/common.type'
import {
  ListProjectsType,
  ProjectType,
  ReqNewProject,
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

export const getProjectApi = async (id: string): Promise<Rsp<ProjectType>> => {
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
  limit: number = 12
): Promise<Rsp<ListProjectsType>> => {
  const rs = await api.get(
    EnvVariables.NEXT_PUBLIC_API_URL +
      `/getListProject?offset=${offset}&limit=${limit}`
  )
  return rs.data
}
