import { EnvVariables } from '@/constants/env.const'
import { OAuth2VerifyResp } from '@/types/oauth2.type'

import { api } from '../config/api'

export const verifyOAuth2 = async (
  type: string, access_token: string
): Promise<OAuth2VerifyResp> => {
  const result = await api.get(
    EnvVariables.NEXT_PUBLIC_API_URL + `/oauth2/verify?type=${type}&access_token=${access_token}`
  )
  return result.data
}
