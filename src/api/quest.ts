import { api } from '@/api/interceptor'
import { EnvVariables } from '@/constants/env.const'
import { LQuestType, ReqNewQuestType, Rsp } from '@/types'
import { QuestType } from '@/types/quest'

export const updateQuestApi = async (body: ReqNewQuestType): Promise<Rsp<{ id: string }>> => {
  const { data } = await api.post(EnvVariables.API_SERVER + '/updateQuest', body)
  return data
}

export const newQuestApi = async (body: ReqNewQuestType): Promise<Rsp<{ id: string }>> => {
  const { data } = await api.post(EnvVariables.API_SERVER + '/createQuest', body)
  return data
}

export const listQuestApi = async (
  communityHandle: string,
  search: string,
  includeUnclaimableReason: boolean = false
): Promise<Rsp<LQuestType>> => {
  if (search === undefined) {
    search = ''
  }
  const { data } = await api.get(
    EnvVariables.API_SERVER +
      `/getQuests?community_handle=${communityHandle}&limit=40&q=${search}&include_unclaimable_reason=${includeUnclaimableReason}`
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
  const { data } = await api.post(EnvVariables.API_SERVER + `/reviewAll`, {
    action,
    community_handle: community_handle,
    filter_quest_id,
    filter_user_id,
    excludes,
  })
  return data
}

export const deleteQuest = async (id: string): Promise<Rsp<{}>> => {
  const { data } = await api.post(EnvVariables.API_SERVER + `/deleteQuest`, {
    id,
  })

  return data
}

// Templates
export const getTemplatesApi = async (): Promise<Rsp<{ templates: QuestType[] }>> => {
  const { data } = await api.get(EnvVariables.API_SERVER + `/getTemplates`)
  return data
}
