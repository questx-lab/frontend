import { FC, useEffect } from 'react'

import axios from 'axios'
import { useStoreActions } from 'easy-peasy'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'

import { updateCommunityDiscord } from '@/app/api/client/communitiy'
import { verifyOAuth2 } from '@/app/api/client/oauth'
import { EnvVariables } from '@/constants/env.const'
import { RouterConst } from '@/constants/router.const'
import { GlobalStoreModel } from '@/store/store'
import { getAccessToken, setAccessToken, setRefreshToken, setUserLocal } from '@/utils/helper'
import { LoadingModal } from '@/widgets/modal'

const DISCORD_TOKEN_URL = 'https://discordapp.com/api/v9/oauth2/token'

const handler = async (code: string): Promise<string | undefined> => {
  const payload = new URLSearchParams({
    client_id: EnvVariables.DISCORD_ID,
    client_secret: EnvVariables.DISCORD_SECRECT,
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: `${EnvVariables.FRONTEND_URL}/api/auth/callback/discord`,
  })
  try {
    const { data } = await axios.post(DISCORD_TOKEN_URL, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    return data.access_token
  } catch (err) {
    console.error(err)
  }
  return undefined
}

const DiscordCallback: FC = () => {
  // hook
  const location = useLocation()
  const navigate = useNavigate()

  // Global action
  const setUser = useStoreActions<GlobalStoreModel>((action) => action.setUser)

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const authCode = searchParams.get('code')
    const guildId = searchParams.get('guild_id')
    const communityHandle = searchParams.get('state')
    if (authCode) {
      if (guildId && communityHandle) {
        discordAuth(authCode, guildId, communityHandle)
      } else {
        discordAuth(authCode)
      }
    }
  }, [])

  const discordAuth = async (
    authCode: string,
    guildId?: string | null,
    communityHandle?: string | null
  ) => {
    try {
      const accessToken = await handler(authCode)
      if (!accessToken) {
        return
      }

      const userAccessToken = getAccessToken()

      if (guildId && communityHandle) {
        const resp = await updateCommunityDiscord(
          communityHandle,
          guildId,

          accessToken,
          userAccessToken || ''
        )

        if (resp.error) {
          toast.error('Connect discord failed')
        }

        if (resp.code === 0) {
          toast.success('Community connect to discord successfull')
        }

        setTimeout(
          () =>
            navigate(RouterConst.COMMUNITIES + `/${communityHandle}/create`, { replace: false }),
          1000
        )
      } else {
        const data = await verifyOAuth2('discord', accessToken)
        if (data?.error) {
          toast.error(data.error)
        }

        if (data?.data) {
          setUser(data.data.user)
          setUserLocal(data.data.user)
          setAccessToken(data.data.access_token)
          setRefreshToken(data.data.refresh_token)
        }
        setTimeout(() => navigate(RouterConst.HOME, { replace: true }), 1000)
      }
    } catch (error) {
      toast.error('Connect to Discord was failed, please try more again')
    } finally {
    }
  }

  return <LoadingModal isOpen />
}

export default DiscordCallback
