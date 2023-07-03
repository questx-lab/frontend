import { EnvVariables } from '@/constants/env.const'
import { BadgeDetailType, Rsp, UserType } from '@/types'

import { api } from './interceptor'
import StorageConst from '@/constants/storage.const'

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

export const getMyBadgeDetailsApi = async (
  community_handle: string
): Promise<Rsp<{ badge_details: BadgeDetailType[] }>> => {
  return {
    code: 0,
    data: {
      badge_details: [
        {
          badge: {
            name: 'quest_warrior',
            level: 1,
            description: 'description',
            icon_url: StorageConst.CHICKEN.src,
          },
        },
        {
          badge: {
            name: 'quest_warrior',
            level: 2,
            description: 'description',
            icon_url: StorageConst.CHICKEN.src,
          },
        },
      ],
    },
  }
}
