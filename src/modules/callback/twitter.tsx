import React, { FC, useEffect } from 'react'

import { useStoreActions } from 'easy-peasy'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'

import { getTwitterAccessTokenApi, linkOAuth2, TwitterVerifyType } from '@/app/api/client/oauth'
import { getUserApi } from '@/app/api/client/user'
import { EnvVariables } from '@/constants/env.const'
import { KeysEnum } from '@/constants/key.const'
import { RouterConst } from '@/constants/router.const'
import { GlobalStoreModel } from '@/store/store'
import { getAccessToken, setAccessToken, setRefreshToken, setUserLocal } from '@/utils/helper'
import { OAuth2LinkReq, UserType } from '@/utils/type'
import LoadingModal from '@/widgets/modal/loading'

// filling up the query parameters needed to request for getting the token
export const twitterOauthTokenParams = {
  redirect_uri: `${EnvVariables.FRONTEND_URL}/api/auth/callback/twitter`,
  grant_type: 'authorization_code',
}

// the main step 1 function, getting the access token from twitter using the code that twitter sent us
const getTwitterOAuthToken = async (code: string) => {
  try {
    // POST request to the token url to get the access token
    const codeVerifier = localStorage.getItem(KeysEnum.CODE_VERIFIER) ?? ''
    localStorage.removeItem(KeysEnum.CODE_VERIFIER)

    // AccessToken of user
    const clientAccessToken = getAccessToken()

    const payload: TwitterVerifyType = {
      code,
      code_verifier: codeVerifier,
      redirect_uri: twitterOauthTokenParams.redirect_uri,
      type: 'twitter',
    }

    // For link account to Twitter
    if (clientAccessToken) {
      const user = await linkAccount(
        payload.type,
        payload.code,
        payload.code_verifier,
        payload.redirect_uri
      )

      return user?.data
    }

    // For login or register new accout
    const result = await getTwitterAccessTokenApi(payload)

    if (result?.error) {
      toast.error(result.error)
    }

    if (result?.data) {
      setAccessToken(result.data.access_token)
      setRefreshToken(result.data.refresh_token)
    }

    return result.data?.user
  } catch (err) {
    console.error(err)
  }
  return undefined
}

const linkAccount = async (
  type: string,
  code: string,
  code_verifier: string,
  redirect_uri: string
) => {
  try {
    const payload: OAuth2LinkReq = {
      type,
      code,
      code_verifier,
      redirect_uri,
    }

    const data = await linkOAuth2(payload)
    if (data.error) {
      toast.error(data.error)
    }

    if (data.code === 0) {
      toast.success('Link account successful')
    }

    const user = await getUserApi()
    return user
  } catch (error) {
    toast.error('Link account was failed')
  }
}

const TwitterCallback: FC = () => {
  // hook
  const location = useLocation()
  const navigate = useNavigate()

  const clientAccessToken = getAccessToken()

  // Global action
  const setUser = useStoreActions<GlobalStoreModel>((action) => action.setUser)

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const authCode = searchParams.get('code')

    if (authCode) {
      twitterAuth(authCode)
    }
  }, [])

  const twitterAuth = async (authCode: string) => {
    try {
      const user = await getTwitterOAuthToken(authCode)
      if (user) {
        setUser(user)
        setUserLocal(user)
      }
    } catch (error) {
      toast.error('Connect to Twitter was failed, please try more again')
    } finally {
      if (clientAccessToken) {
        setTimeout(() => navigate(RouterConst.ACCOUNT_SETTING, { replace: true }), 2000)
      } else {
        setTimeout(() => navigate(RouterConst.HOME, { replace: true }), 2000)
      }
    }
  }

  return <LoadingModal isOpen />
}

export default TwitterCallback
function setUser(data: UserType) {
  throw new Error('Function not implemented.')
}
