import { getProjectApi, listProjectsApi } from '@/app/api/client/project'
import { ProjectType, ListProjectsType } from '@/types/project.type'
import { Rsp } from '@/types/common.type'
import { serialize, deserialize, loadCache, storeCache } from './service'

export const getProjectByID = async (
  id: string
): Promise<Rsp<{ project: ProjectType }>> => {
  const key = `getProjectByID/${id}`
  const val = loadCache(key)
  const parseData = deserialize(val)
  if (val) return parseData
  const data = await getProjectApi(id)
  storeCache(key, serialize(data))
  return data
}

export const listProjects = async (
  offset: number = 0,
  limit: number = 12
): Promise<Rsp<ListProjectsType>> => {
  const key = `listProjects/${offset}/${limit}`
  const val = loadCache(key)
  const parseData = deserialize(val)
  if (val) return parseData
  const data = await listProjectsApi(offset, limit)
  storeCache(key, serialize(data))
  return data
}
