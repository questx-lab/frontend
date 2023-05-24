import { ClaimedQuestStatus } from '@/constants/common.const'
import { EnvVariables } from '@/constants/env.const'
import {
  ClaimQuestType,
  ListClaimQuestType,
  LQuestType,
  QuestType,
  ReqNewQuestType,
  Rsp,
} from '@/utils/type'

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
  communityId: string,
  search: string
): Promise<Rsp<LQuestType>> => {
  if (search == undefined) {
    search = ''
  }
  const { data } = await api.get(
    EnvVariables.NEXT_PUBLIC_API_URL +
      `/getQuests?community_id=${communityId}&limit=40&q=${search}`
  )
  return data
}

export const getQuestApi = async (id: string): Promise<Rsp<QuestType>> => {
  const { data } = await api.get(
    EnvVariables.NEXT_PUBLIC_API_URL + `/getQuest?id=${id}`
  )
  return data
}

export const updateQuestApi = async (
  body: ReqNewQuestType
): Promise<Rsp<{ id: string }>> => {
  const { data } = await api.post(
    EnvVariables.NEXT_PUBLIC_API_URL + '/updateQuest',
    body
  )
  return data
}

export const getClaimedQuestApi = async (
  id: string
): Promise<Rsp<ClaimQuestType>> => {
  const { data } = await api.get(
    EnvVariables.NEXT_PUBLIC_API_URL + `/getClaimedQuest?id=${id}`
  )
  return data
}

export const listClaimedQuestsApi = async (
  id: string,
  status: string = ClaimedQuestStatus.PENDING,
  filterQuestIds: string[],
  offset: number = 0,
  limit: number = 10
): Promise<Rsp<ListClaimQuestType>> => {
  const questIds = filterQuestIds.join(',')
  const { data } = await api.get(
    EnvVariables.NEXT_PUBLIC_API_URL +
      `/getClaimedQuests?community_id=${id}&status=${status}&quest_id=${questIds}&offset=${offset}&limit=${limit}`
  )
  return data
}

export const updateClaimedQuestApi = async (
  ids: string[],
  action: string
): Promise<Rsp<{}>> => {
  const { data } = await api.post(
    EnvVariables.NEXT_PUBLIC_API_URL + `/review`,
    {
      ids,
      action,
    }
  )
  return data
}

export const updateAllClaimedQuestApi = async (
  action: string,
  community_id: string,
  filter_quest_id: string,
  filter_user_id: string,
  excludes: string[]
) => {
  const { data } = await api.post(
    EnvVariables.NEXT_PUBLIC_API_URL + `/reviewAll`,
    {
      action,
      community_id,
      filter_quest_id,
      filter_user_id,
      excludes,
    }
  )
  return data
}

// Templates
export const getTemplates = async () => {
  const { data } = await api.get(
    EnvVariables.NEXT_PUBLIC_API_URL + `/getTemplates`,
    {}
  )
  return data
}
