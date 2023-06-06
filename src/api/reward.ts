import { api } from '@/api/interceptor'
import { EnvVariables } from '@/constants/env.const'
import { RefferalType, Rsp } from '@/types'

export const getMyReferralInfoApi = async (): Promise<Rsp<RefferalType>> => {
  const { data } = await api.get(EnvVariables.NEXT_PUBLIC_API_URL + '/getMyReferrals')
  return data
}

export const claimReferralApi = async (address: string): Promise<Rsp<{}>> => {
  const { data } = await api.post(EnvVariables.NEXT_PUBLIC_API_URL + '/claimReferral', { address })
  return data
}
