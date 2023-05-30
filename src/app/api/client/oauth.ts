import axios from 'axios'

import { api } from '@/app/api/config/api'
import { EnvVariables } from '@/constants/env.const'
import { VerifyOAuth2IDResp } from '@/utils/request-response'
import { OAuth2VerifyResp, Rsp, UserType } from '@/utils/type'

export const verifyOAuth2ID = async (type: string, token: string): Promise<VerifyOAuth2IDResp> => {
  const result = await axios.post(
    EnvVariables.NEXT_PUBLIC_API_URL + `/verifyOAuth2ID`,
    {
      type: type,
      id_token: token,
    },
    {
      headers: {
        ContentType: 'application/json',
      },
    }
  )
  return result.data
}

export const verifyOAuth2 = async (
  type: string,
  access_token: string
): Promise<OAuth2VerifyResp> => {
  const result = await api.post(EnvVariables.NEXT_PUBLIC_API_URL + `/verifyOAuth2`, {
    type,
    access_token,
  })
  return result.data
}

export interface TwitterVerifyType {
  code: string
  code_verifier: string
  redirect_uri: string
  type: string
}

export const getTwitterAccessTokenApi = async (
  data: TwitterVerifyType
): Promise<
  Rsp<{
    user: UserType
    access_token: string
    refresh_token: string
  }>
> => {
  const result = await api.post(EnvVariables.NEXT_PUBLIC_API_URL + `/verifyOAuth2Code`, data)
  return result.data
}
