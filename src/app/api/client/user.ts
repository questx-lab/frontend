import { EnvVariables } from '@/constants/env.const'
import {
  Rsp,
  UserType,
  UserProfileType,
  FollowerType,
  BadgeType,
} from '@/utils/type'

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

export const getMyBadgesApi = async (): Promise<
  Rsp<{
    badges: BadgeType[]
  }>
> => {
  const { data } = await api.get('/getMyBadges')

  return data
}

// export const getMyUserProfileApi = async (): Promise<Rsp<UserProfileType>> => {
//   const { data } = await api.get('/getMyUserProfile')

//   return data
// }

export const getMyFollowersInfoApi = async (): Promise<
  Rsp<{
    followers: FollowerType[]
  }>
> => {
  const { data } = await api.get('/getMyFollowersInfo')

  return data
}
