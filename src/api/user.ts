import { EnvVariables } from '@/constants/env.const'
import { Rsp, UserType } from '@/types'

import { api } from './interceptor'
import { getCache, invalidateCache, setCacheWithExpiration } from '@/cache'
import { KeysEnum } from '@/constants/key.const'

export const getUserApi = async (isNotUseCache?: boolean): Promise<Rsp<UserType>> => {
  if (!isNotUseCache) {
    const result = getCache(KeysEnum.USER) as UserType
    return {
      code: 0,
      data: result,
    }
  }
  try {
    const result = await api.get(EnvVariables.API_SERVER + '/getMe')
    if (result.data.code === 0 && result.data.data)
      setCacheWithExpiration(KeysEnum.USER, result.data.data.user, 10 * 60 * 1000) // set cache user for 10 minutes
    return {
      code: result.data.code,
      data: result.data?.data.user,
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
  if (result.data && result.data.code === 0 && result.data.data) invalidateCache(KeysEnum.USER)
  return result.data
}

export const refreshTokenApi = async (
  refreshToken: string
): Promise<
  Rsp<{
    access_token: string
    refresh_token: string
  }>
> => {
  const { data } = await api.post('/refresh', {
    refresh_token: refreshToken,
  })

  return data
}

export const getUserByIdApi = async (userId: string): Promise<Rsp<UserType>> => {
  try {
    const result = await api.get(EnvVariables.API_SERVER + `/getUser?user_id=${userId}`)
    return {
      code: result.data.code,
      data: result.data?.data.user,
      error: result.data.error,
    }
  } catch (err) {
    return {
      code: -1,
    }
  }
}
