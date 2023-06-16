import { EnvVariables } from '@/constants/env.const'
import { Rsp, UserType } from '@/types'

import { api } from './interceptor'

export const getUserApi = async (): Promise<Rsp<UserType>> => {
  try {
    const result = await api.get(EnvVariables.API_SERVER + '/getMe')
    return {
      code: result.data,
      data: result.data?.user,
      error: result.data.error,
    }
  } catch (err) {
    return {
      code: -1,
    }
  }
}

export const updateUserApi = async (name: string): Promise<Rsp<{}>> => {
  const result = await api.post(EnvVariables.API_SERVER + '/updateUser', {
    name,
  })
  return result.data
}

export const refreshTokenApi = async (refreshToken: string) => {
  const { data } = await api.post('/refresh', {
    refresh_token: refreshToken,
  })

  return data
}
