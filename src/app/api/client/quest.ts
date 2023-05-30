import { api } from '@/app/api/config/api'
import { ClaimedQuestStatus } from '@/constants/common.const'
import { EnvVariables } from '@/constants/env.const'
import { LQuestType, ListClaimQuestType, ReqNewQuestType, Rsp } from '@/utils/type'

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
      `/getClaimedQuests?community_handle=${id}&status=${status}&quest_id=${questIds}&offset=${offset}&limit=${limit}`
  )
  return data
}
