import { EnvVariables } from '@/constants/env.const'
import { Rsp } from '@/types/common.type'
import { LQuestType, QuestType, ReqNewQuestType } from '@/types/project.type'

import { api } from '../config/api'

export const newQuestApi = async (
  body: ReqNewQuestType
): Promise<Rsp<{ id: string }>> => {
  const { data } = await api.post(
    EnvVariables.NEXT_PUBLIC_API_URL + '/createQuest',
    body
  )
  return data
}

export const listQuestApi = async (
  projectId: string
): Promise<Rsp<LQuestType>> => {
  const { data } = await api.get(
    EnvVariables.NEXT_PUBLIC_API_URL +
      `/getListQuest?project_id=${projectId}&limit=40`
  )
  return data
}

export const getQuestApi = async (id: string): Promise<Rsp<QuestType>> => {
  const { data } = await api.get(
    EnvVariables.NEXT_PUBLIC_API_URL + `/getQuest?id=${id}`
  )
  return data
}
