import { EnvVariables } from '@/constants/env.const'
import { OAuth2VerifyResp } from '@/types/oauth2.type'

import { api } from '../config/api'

import axios from 'axios'

export const verifyOAuth2 = async (
  type: string,
  access_token: string
): Promise<OAuth2VerifyResp> => {
  const result = await api.get(
    EnvVariables.NEXT_PUBLIC_API_URL +
      `/oauth2/verify?type=${type}&access_token=${access_token}`
  )
  return result.data
}

export const updateDiscord = async (
  project_id: string,
  server_id: string,
  oauth_access_token: string,
  access_token: string
): Promise<OAuth2VerifyResp> => {
  const result = await axios.post(
    EnvVariables.NEXT_PUBLIC_API_URL + `/updateDiscord`,
    {
      id: project_id,
      access_token: oauth_access_token,
      server_id: server_id,
    },
    {
      headers: {
        ContentType: 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
    }
  )
  return result.data
}
