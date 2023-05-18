import { EnvVariables } from '@/constants/env.const'
import { Rsp } from '@/types/common.type'
import { RefferalType, ReqClaimReward } from '@/types/project.type'

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

export const getMyReferralInfoApi = async (): Promise<Rsp<RefferalType>> => {
  const { data } = await api.get(
    EnvVariables.NEXT_PUBLIC_API_URL + '/getMyReferralInfo'
  )
  return data
}

export const claimReferralApi = async (address: string): Promise<Rsp<{}>> => {
  const { data } = await api.post(
    EnvVariables.NEXT_PUBLIC_API_URL + '/claimReferral',
    { address }
  )
  return data
}
