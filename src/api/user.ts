import { EnvVariables } from '@/constants/env.const'
import { CharacterType, Rsp, UserType } from '@/types'

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

export const getMyCharactersApi = async (
  communityHandle: string
): Promise<Rsp<{ user_characters: CharacterType[] }>> => {
  try {
    const { data } = await api.get(
      EnvVariables.API_SERVER + `/getMyCharacters?community_handle=${communityHandle}`
    )

    return data
  } catch (err) {
    return {
      code: -1,
    }
  }
}
