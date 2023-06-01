import { api } from '@/app/api/config/api'
import { ClaimedQuestStatus } from '@/constants/common.const'
import { EnvVariables } from '@/constants/env.const'
import { ListClaimQuestType, ReqClaimReward, Rsp } from '@/utils/type'

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

export const updateClaimedQuestApi = async (ids: string[], action: string): Promise<Rsp<{}>> => {
  const { data } = await api.post(EnvVariables.NEXT_PUBLIC_API_URL + `/review`, {
    ids,
    action,
  })
  return data
}

export const claimRewardApi = async (
  body: ReqClaimReward
): Promise<Rsp<{ id: string; status: string }>> => {
  const { data } = await api.post(EnvVariables.NEXT_PUBLIC_API_URL + '/claim', body)
  return data
}
