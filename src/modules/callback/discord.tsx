import { FC, useEffect } from 'react'

import { useStoreActions } from 'easy-peasy'
import toast from 'react-hot-toast'
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

  // Global action
  const setUser = useStoreActions<GlobalStoreModel>((action) => action.setUser)

  useEffect(() => {
    const searchParams = new URLSearchParams(location.hash.substring(1))
    const accessToken = searchParams.get('access_token')
    const guildId = searchParams.get('guild_id')
    const communityHandle = searchParams.get('state')
    // AccessToken of user
    const clientAccessToken = getAccessToken()

    if (clientAccessToken && accessToken) {
      // For link account
      linkAccount('discord', accessToken)
    }

    if (!clientAccessToken && accessToken) {
      if (guildId && communityHandle) {
        // For discord connect to communitiy
        discordAuth(accessToken, guildId, communityHandle)
      } else {
        // For login
        discordAuth(accessToken)
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
        toast.error(data.error)
      }

      if (data.code === 0) {
        toast.success('Link account successful')
      }

      const user = await getUserApi()
      if (user.data) {
        setUserLocal(user.data)
        setUser(user.data)
      }
      setTimeout(() => navigate(RouterConst.ACCOUNT_SETTING, { replace: true }), 3000)
    } catch (error) {
      toast.error('Link account was failed')
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
          toast.error('Connect discord failed')
        }

        if (resp.code === 0) {
          toast.success('Community connect to discord successfull')
        }

        setTimeout(() => navigate(newQuestRoute(communityHandle), { replace: false }), 1000)
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
