import { api } from '@/api/interceptor'
import { EnvVariables } from '@/constants/env.const'
import { ClaimableRewardType, RefferalType, Rsp } from '@/types'

export const getMyReferralInfoApi = async (): Promise<Rsp<RefferalType>> => {
  const { data } = await api.get(EnvVariables.API_SERVER + '/getMyReferrals')
  return data
}

export const claimReferralApi = async (wallet_address: string): Promise<Rsp<{}>> => {
  const { data } = await api.post(EnvVariables.API_SERVER + '/claimReferral', { wallet_address })
  return data
}

export const getClaimRewardsApi = async (): Promise<Rsp<ClaimableRewardType>> => {
  const { data } = await api.get(EnvVariables.API_SERVER + '/getClaimableRewards')
  return data
}
