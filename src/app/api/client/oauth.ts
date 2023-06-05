import { api } from '@/app/api/config/api'
import { EnvVariables } from '@/constants/env.const'
import { OAuth2LinkReq, OAuth2VerifyResp, Rsp, TelegramAuthType, UserType } from '@/utils/type'

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
  const result = await api.post(EnvVariables.NEXT_PUBLIC_API_URL + `/verifyOAuth2`, data)
  return result.data
}

export const linkOAuth2 = async (payload: OAuth2LinkReq): Promise<OAuth2VerifyResp> => {
  const result = await api.post(EnvVariables.NEXT_PUBLIC_API_URL + `/linkOAuth2`, payload)
  return result.data
}

export const linkTelegram = async (payload: TelegramAuthType): Promise<Rsp<{}>> => {
  const { data } = await api.post(EnvVariables.NEXT_PUBLIC_API_URL + `/linkTelegram`, payload)
  return data
}
