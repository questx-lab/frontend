import { TotalUsersResponseType } from '@/admin-portal/types/response'
import { api } from '@/api/interceptor'
import { EnvVariables } from '@/constants/env.const'
import { Rsp } from '@/types'

export const getTotalUserCount = async (): Promise<Rsp<TotalUsersResponseType>> => {
  const res = await api.get(EnvVariables.API_SERVER + `/getTotalUsers`)
  return res.data
}
