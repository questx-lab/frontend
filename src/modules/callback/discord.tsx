import { FC, useEffect } from 'react'

import { useStoreActions } from 'easy-peasy'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'

import { updateCommunityDiscord } from '@/app/api/client/communitiy'
import { verifyOAuth2 } from '@/app/api/client/oauth'
import { RouterConst } from '@/constants/router.const'
import { GlobalStoreModel } from '@/store/store'
import { setAccessToken, setRefreshToken, setUserLocal } from '@/utils/helper'
import { LoadingModal } from '@/widgets/modal'

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
    if (accessToken) {
      if (guildId && communityHandle) {
        discordAuth(accessToken, guildId, communityHandle)
      } else {
        discordAuth(accessToken)
      }
    }
  }, [])

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
