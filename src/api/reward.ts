import { api } from '@/api/interceptor'
import { EnvVariables } from '@/constants/env.const'
import { RefferalType, Rsp } from '@/types'

export const getMyReferralInfoApi = async (): Promise<Rsp<RefferalType>> => {
  const { data } = await api.get(EnvVariables.NEXT_PUBLIC_API_URL + '/getMyReferrals')
  return data
}
