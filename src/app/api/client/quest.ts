import { EnvVariables } from '@/constants/env.const'
import { QuestType, ReqNewQuestType, Rsp } from '@/utils/type'

import { api } from '../config/api'

export const newQuestApi = async (body: ReqNewQuestType): Promise<Rsp<{ id: string }>> => {
  const { data } = await api.post(EnvVariables.NEXT_PUBLIC_API_URL + '/createQuest', body)
  return data
}

// Templates
export const getTemplatesApi = async (): Promise<Rsp<{ templates: QuestType[] }>> => {
  const { data } = await api.get(EnvVariables.NEXT_PUBLIC_API_URL + `/getTemplates`)
  return data
}
