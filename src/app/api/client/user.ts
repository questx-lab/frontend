import { EnvVariables } from '@/constants/env.const'
import { UserType } from '@/types/account.type'
import { Rsp } from '@/types/common.type'

import { api } from '../config/api'

export const getUserApi = async (): Promise<Rsp<UserType>> => {
  const result = await api.get(EnvVariables.NEXT_PUBLIC_API_URL + '/getMe')
  return result.data
}

export const updateUserApi = async (name: string): Promise<Rsp<{}>> => {
  const result = await api.post(
    EnvVariables.NEXT_PUBLIC_API_URL + '/updateUser',
    {
      name,
    }
  )
  return result.data
}

export const refreshTokenApi = async (refreshToken: string) => {
  const { data } = await api.post('/refresh', {
    refresh_token: refreshToken,
  })

  return data
}
