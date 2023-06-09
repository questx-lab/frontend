import { EnvVariables } from '@/constants/env.const'
import { Rsp } from '@/types'

import { api } from './interceptor'

export const uploadImageApi = async (body: FormData): Promise<Rsp<{ url: string }>> => {
  const { data } = await api.post(EnvVariables.API_SERVER + '/uploadImage', body, {
    headers: {
      'Content-Type': `multipart/form-data`,
    },
  })
  return data
}

export const uploadCommunityLogo = async (body: FormData): Promise<Rsp<{ url: string }>> => {
  const { data } = await api.post(EnvVariables.API_SERVER + '/uploadCommunityLogo', body, {
    headers: {
      'Content-Type': `multipart/form-data`,
    },
  })
  return data
}

export const uploadAvatarUserApi = async (body: FormData): Promise<Rsp<{ url: string }>> => {
  const result = await api.post(EnvVariables.API_SERVER + '/uploadAvatar', body, {
    headers: {
      'Content-Type': `multipart/form-data`,
    },
  })
  return result.data
}
