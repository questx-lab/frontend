import { EnvVariables } from '@/constants/env.const'
import { BadgeType, Rsp, UserType } from '@/types'

import { api } from './interceptor'

export const getUserApi = async (): Promise<Rsp<UserType>> => {
  try {
    const result = await api.get(EnvVariables.API_SERVER + '/getMe')
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
export const getAllBadgesApi = async (): Promise<Rsp<{ badges: BadgeType[] }>> => {
  try {
    const result = await api.get(EnvVariables.API_SERVER + `/getAllBadges`)
    console.log('result', result.data?.data.badges)

    return {
      code: result.data.code,
      data: result.data?.data,
      error: result.data.error,
    }
  } catch (err) {
    return {
      code: -1,
    }
  }
}
