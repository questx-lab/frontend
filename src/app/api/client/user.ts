import { EnvVariables } from '@/constants/env.const'
import { UserType } from '@/types/account.type'
import { Rsp } from '@/types/common.type'

import { api } from '../config/api'

export const GetUserApi = async (): Promise<Rsp<UserType>> => {
  const result = await api.get(EnvVariables.NEXT_PUBLIC_API_URL + '/getUser')
  return result.data
}
