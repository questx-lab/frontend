import { api } from '@/app/api/config/api'
import { EnvVariables } from '@/constants/env.const'
import { ReqNewQuestType, Rsp } from '@/utils/type'

export const updateQuestApi = async (body: ReqNewQuestType): Promise<Rsp<{ id: string }>> => {
  const { data } = await api.post(EnvVariables.NEXT_PUBLIC_API_URL + '/updateQuest', body)
  return data
}

export const newQuestApi = async (body: ReqNewQuestType): Promise<Rsp<{ id: string }>> => {
  const { data } = await api.post(EnvVariables.NEXT_PUBLIC_API_URL + '/createQuest', body)
  return data
}
