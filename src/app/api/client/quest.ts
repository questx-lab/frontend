import { api } from '@/app/api/config/api'
import { EnvVariables } from '@/constants/env.const'
import { LQuestType, ReqNewQuestType, Rsp } from '@/utils/type'

export const updateQuestApi = async (body: ReqNewQuestType): Promise<Rsp<{ id: string }>> => {
  const { data } = await api.post(EnvVariables.NEXT_PUBLIC_API_URL + '/updateQuest', body)
  return data
}

export const newQuestApi = async (body: ReqNewQuestType): Promise<Rsp<{ id: string }>> => {
  const { data } = await api.post(EnvVariables.NEXT_PUBLIC_API_URL + '/createQuest', body)
  return data
}

export const listQuestApi = async (
  communityId: string,
  search: string
): Promise<Rsp<LQuestType>> => {
  if (search === undefined) {
    search = ''
  }
  const { data } = await api.get(
    EnvVariables.NEXT_PUBLIC_API_URL + `/getQuests?community_id=${communityId}&limit=40&q=${search}`
  )
  return data
}
