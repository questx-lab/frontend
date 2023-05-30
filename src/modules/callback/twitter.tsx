import React, { FC, useEffect } from 'react'

import { useStoreActions } from 'easy-peasy'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'

import { getTwitterAccessTokenApi, TwitterVerifyType } from '@/app/api/client/oauth'
import { EnvVariables } from '@/constants/env.const'
import { KeysEnum } from '@/constants/key.const'
import { RouterConst } from '@/constants/router.const'
import { GlobalStoreModel } from '@/store/store'
import { setAccessToken, setRefreshToken, setUserLocal } from '@/utils/helper'
import { LoadingModal } from '@/widgets/modal'

// filling up the query parameters needed to request for getting the token
export const twitterOauthTokenParams = {
  redirect_uri: `${EnvVariables.FRONTEND_URL}/api/auth/callback/twitter`,
  grant_type: 'authorization_code',
}

// the shape of the object we should recieve from twitter in the request
export type TwitterTokenResponse = {
  token_type?: string
  expires_in?: number
  access_token?: string
  scope?: string
}

// the main step 1 function, getting the access token from twitter using the code that twitter sent us
const getTwitterOAuthToken = async (code: string) => {
  try {
    // POST request to the token url to get the access token
    const codeVerifier = localStorage.getItem(KeysEnum.CODE_VERIFIER) ?? ''
    localStorage.removeItem(KeysEnum.CODE_VERIFIER)
    const payload: TwitterVerifyType = {
      code,
      code_verifier: codeVerifier,
      redirect_uri: twitterOauthTokenParams.redirect_uri,
      type: 'twitter',
    }

    const rs = await getTwitterAccessTokenApi(payload)

    return rs
  } catch (err) {
    console.error(err)
  }
  return undefined
}

const TwitterCallback: FC = () => {
  let effectCallOnce = true

  // hook
  const location = useLocation()
  const navigate = useNavigate()

  // Global action
  const setUser = useStoreActions<GlobalStoreModel>((action) => action.setUser)

  useEffect(() => {
    if (effectCallOnce) {
      effectCallOnce = false
      const searchParams = new URLSearchParams(location.search)
      const authCode = searchParams.get('code')
      if (authCode) {
        twitterAuth(authCode)
      }
    }
  }, [])

  const twitterAuth = async (authCode: string) => {
    try {
      const data = await getTwitterOAuthToken(authCode)
      if (data?.error) {
        toast.error(data.error)
      }

      if (data?.data) {
        setUser(data.data.user)
        setUserLocal(data.data.user)
        setAccessToken(data.data.access_token)
        setRefreshToken(data.data.refresh_token)
        navigate(RouterConst.HOME, { replace: true })
      }
    } catch (error) {}
  }

  return <LoadingModal isOpen />
}

export default TwitterCallback
