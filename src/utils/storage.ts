import { verifyOAuth2 } from '@/app/api/client/oauth'
import { KeysEnum } from '@/constants/key.const'
import { ReturnTuple } from '@/utils/type'

/**
 * updateAccessToken sends a token to server side, gets back access_token, refresh token and store
 * them locally for later usage.
 *
 * @returns true if all these operation succeeds.
 */
export const updateAccessToken = async (
  provider: string,
  token: string
): Promise<ReturnTuple<boolean>> => {
  const result = await verifyOAuth2(provider, token)
  if (!result || result.code !== 0) {
    return {
      error: 'Failed to verify login',
    }
  }

  localStorage.setItem(KeysEnum.ACCESS_TOKEN, result.data.access_token)
  localStorage.setItem(KeysEnum.REFRESH_TOKEN, result.data.refresh_token)
  localStorage.setItem(KeysEnum.USER, JSON.stringify(result.data.user))

  return {
    value: true,
  }
}
