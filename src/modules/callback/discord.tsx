import { FC, useEffect, useState } from 'react'

import { useStoreActions } from 'easy-peasy'
import { useLocation, useNavigate } from 'react-router-dom'

import { updateCommunityDiscord } from '@/api/communitiy'
import { linkOAuth2, verifyOAuth2 } from '@/api/oauth'
import { getUserApi } from '@/api/user'
import { newQuestRoute, RouterConst } from '@/constants/router.const'
import { GlobalStoreModel } from '@/store/store'
import { OAuth2LinkReq } from '@/types'
import { getAccessToken, setAccessToken, setRefreshToken, setUserLocal } from '@/utils/helper'
import LoadingModal from '@/widgets/modal/loading'

const DiscordCallback: FC = () => {
  // hook
  const location = useLocation()
  const navigate = useNavigate()
  const [success, setSuccess] = useState<boolean>()
  const [message, setMessage] = useState<string>('')

  // Global action
  const setUser = useStoreActions<GlobalStoreModel>((action) => action.setUser)

  useEffect(() => {
    const searchParams = new URLSearchParams(location.hash.substring(1))
    const accessToken = searchParams.get('access_token')
    const guildId = searchParams.get('guild_id')
    const communityHandle = searchParams.get('state')
    // AccessToken of user
    const clientAccessToken = getAccessToken()

    if (!accessToken) {
      setSuccess(false)
      setMessage('Connect Discord failed')
      setTimeout(() => navigate(RouterConst.HOME), 3000)
    }

    if (!clientAccessToken && accessToken) {
      // For login
      discordAuth(accessToken)
    }

    if (clientAccessToken && accessToken) {
      if (guildId && communityHandle) {
        // For discord connect to communitiy
        discordAuth(accessToken, guildId, communityHandle)
      } else {
        // For link account
        linkAccount('discord', accessToken)
      }
    }
  }, [])

  const linkAccount = async (type: string, access_token: string) => {
    try {
      const payload: OAuth2LinkReq = {
        type,
        access_token,
      }

      const data = await linkOAuth2(payload)
      if (data.error) {
        setSuccess(false)
        setMessage(data.error)
      }

      if (data.code === 0) {
        setSuccess(true)
        setMessage('Link account successful')
      }

      const user = await getUserApi()
      if (user.data) {
        setUserLocal(user.data)
        setUser(user.data)
      }
    } catch (error) {
      setMessage('Link account was failed')
      setSuccess(false)
    } finally {
      setTimeout(() => navigate(RouterConst.ACCOUNT_SETTING, { replace: true }), 3000)
    }
  }

  const discordAuth = async (
    accessToken: string,
    guildId?: string | null,
    communityHandle?: string | null
  ) => {
    try {
      if (guildId && communityHandle) {
        const resp = await updateCommunityDiscord(communityHandle, guildId, accessToken)

        if (resp.error) {
          setMessage('Connect discord failed')
          setSuccess(false)
        }

        if (resp.code === 0) {
          setMessage('Community connect to discord successfull')
          setSuccess(true)
        }

        setTimeout(() => navigate(newQuestRoute(communityHandle), { replace: false }), 3000)
      } else {
        const data = await verifyOAuth2('discord', accessToken)
        if (data?.error) {
          setMessage(data.error)
          setSuccess(false)
        }

        if (data?.data) {
          setUser(data.data.user)
          setUserLocal(data.data.user)
          setAccessToken(data.data.access_token)
          setRefreshToken(data.data.refresh_token)
          setSuccess(true)
        }
        setTimeout(() => navigate(RouterConst.HOME, { replace: true }), 3000)
      }
    } catch (error) {
      setSuccess(false)
      setMessage('Connect to Discord was failed, please try more again')
      // setTimeout(() => navigate(RouterConst.HOME, { replace: true }), 1000)
    } finally {
    }
  }

  return <LoadingModal isOpen message={message} isSuccess={success} />
}

export default DiscordCallback
