import React, { FC, useEffect, useState } from 'react'

import { useStoreActions } from 'easy-peasy'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'

import { getTwitterAccessTokenApi, linkOAuth2, TwitterVerifyType } from '@/api/oauth'
import { getUserApi } from '@/api/user'
import { EnvVariables } from '@/constants/env.const'
import { KeysEnum } from '@/constants/key.const'
import { RouterConst } from '@/constants/router.const'
import { GlobalStoreModel } from '@/store/store'
import { OAuth2LinkReq } from '@/types'
import { getAccessToken, setAccessToken, setRefreshToken, setUserLocal } from '@/utils/helper'
import LoadingModal from '@/widgets/modal/loading'

// filling up the query parameters needed to request for getting the token
export const twitterOauthTokenParams = {
  redirect_uri: `${EnvVariables.FRONTEND_URL}/api/auth/callback/twitter`,
  grant_type: 'authorization_code',
}

// the main step 1 function, getting the access token from twitter using the code that twitter sent us
const getTwitterOAuthToken = async (
  code: string,
  setSuccess: (value: boolean) => void,
  setMessage: (value: string) => void
) => {
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
      if (!user) {
        return undefined
      }

      return user?.data
    }

    // For login or register new accout
    const result = await getTwitterAccessTokenApi(payload)

    if (result?.error) {
      setMessage(result.error)
      setSuccess(false)
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
      return
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
  const [success, setSuccess] = useState<boolean>()
  const [message, setMessage] = useState<string>('')

  const clientAccessToken = getAccessToken()

  // Global action
  const setUser = useStoreActions<GlobalStoreModel>((action) => action.setUser)

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const authCode = searchParams.get('code')
    const error = searchParams.get('error')

    if (error) {
      setSuccess(false)
      setMessage(error)
      setTimeout(() => navigate(RouterConst.HOME, { replace: true }), 2000)
    }

    if (authCode) {
      twitterAuth(authCode)
    } else {
      setSuccess(false)
      setMessage('Not responding from twitter')
      setTimeout(() => navigate(RouterConst.HOME, { replace: true }), 2000)
    }
  }, [])

  const twitterAuth = async (authCode: string) => {
    try {
      const user = await getTwitterOAuthToken(authCode, setSuccess, setMessage)
      if (!user) {
        setMessage('Connect to Twitter was failed, please try more again')
        setSuccess(false)
        return
      }

      setUser(user)
      setUserLocal(user)
      setMessage('Connect to Twitter successfull')
      setSuccess(true)
    } catch (error) {
      setMessage('Connect to Twitter was failed, please try more again')
      setSuccess(false)
    } finally {
      if (clientAccessToken) {
        setTimeout(() => navigate(RouterConst.ACCOUNT_SETTING, { replace: true }), 2000)
      } else {
        setTimeout(() => navigate(RouterConst.HOME, { replace: true }), 2000)
      }
    }
  }

  return <LoadingModal isOpen isSuccess={success} message={message} />
}

export default TwitterCallback
