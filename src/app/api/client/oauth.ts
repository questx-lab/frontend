import { EnvVariables } from '@/constants/env.const'
import axios from 'axios'
import { VerifyOAuth2IDResp } from '@/utils/request-response'
import { OAuth2VerifyResp } from '@/utils/type'
import { api } from '@/app/api/config/api'

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
