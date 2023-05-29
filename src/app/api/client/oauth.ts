import axios from 'axios'

import { api } from '@/app/api/config/api'
import { EnvVariables } from '@/constants/env.const'
import { VerifyOAuth2IDResp } from '@/utils/request-response'
import { OAuth2VerifyResp } from '@/utils/type'

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

export const getTwitterAccessTokenApi = async (body: string, headers: any) => {
  const data = {
    url: 'https://api.twitter.com/2/oauth2/token',
    param: '',
    body: body,
    method: 'POST',
    headers: headers,
  }
  const result = await api.post(EnvVariables.NEXT_PUBLIC_API_URL + `/external`, data)
  return result.data
}
