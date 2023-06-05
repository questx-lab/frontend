import { api } from '@/api/interceptor'
import { EnvVariables } from '@/constants/env.const'
import { LQuestType, QuestType, ReqNewQuestType, Rsp } from '@/utils/type'

export const updateQuestApi = async (body: ReqNewQuestType): Promise<Rsp<{ id: string }>> => {
  const { data } = await api.post(EnvVariables.NEXT_PUBLIC_API_URL + '/updateQuest', body)
  return data
}

export const newQuestApi = async (body: ReqNewQuestType): Promise<Rsp<{ id: string }>> => {
  const { data } = await api.post(EnvVariables.NEXT_PUBLIC_API_URL + '/createQuest', body)
  return data
}

export const listQuestApi = async (
  communityHandle: string,
  search: string
): Promise<Rsp<LQuestType>> => {
  if (search === undefined) {
    search = ''
  }
  const { data } = await api.get(
    EnvVariables.NEXT_PUBLIC_API_URL +
      `/getQuests?community_handle=${communityHandle}&limit=40&q=${search}`
  )
  return data
}

export const updateAllClaimedQuestApi = async (
  action: string,
  community_handle: string,
  filter_quest_id: string[],
  filter_user_id: string[],
  excludes: string[]
) => {
  const { data } = await api.post(EnvVariables.NEXT_PUBLIC_API_URL + `/reviewAll`, {
    action,
    community_handle: community_handle,
    filter_quest_id,
    filter_user_id,
    excludes,
  })
  return data
}

// Templates
export const getTemplatesApi = async (): Promise<Rsp<{ templates: QuestType[] }>> => {
  const { data } = await api.get(EnvVariables.NEXT_PUBLIC_API_URL + `/getTemplates`)
  return data
}
