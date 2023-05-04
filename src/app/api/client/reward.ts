import { EnvVariables } from '@/constants/env.const'
import { Rsp } from '@/types/common.type'
import { ReqClaimReward } from '@/types/project.type'

import { api } from '../config/api'

export const claimRewardApi = async (
  body: ReqClaimReward
): Promise<Rsp<{ id: string }>> => {
  const { data } = await api.post(
    EnvVariables.NEXT_PUBLIC_API_URL + '/claim',
    body
  )
  return data
}
