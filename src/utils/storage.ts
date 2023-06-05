import { verifyOAuth2 } from '@/api/oauth'
import { ReturnTuple } from '@/utils/type'

import { setAccessToken, setRefreshToken, setUserLocal } from './helper'

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

  setAccessToken(result.data.access_token)
  setRefreshToken(result.data.refresh_token)
  setUserLocal(result.data.user)

  return {
    value: true,
  }
}
