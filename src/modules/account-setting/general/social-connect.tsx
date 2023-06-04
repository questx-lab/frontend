import { FunctionComponent } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import toast from 'react-hot-toast'
import styled from 'styled-components'
import tw from 'twin.macro'

import { linkOAuth2 } from '@/app/api/client/oauth'
import { getUserApi } from '@/app/api/client/user'
import { handleLoginDiscord } from '@/handler/auth/discord'
import { signWallet } from '@/handler/auth/metamask'
import { handleLoginTwitter } from '@/handler/auth/twitter'
import { GlobalStoreModel } from '@/store/store'
import { setUserLocal } from '@/utils/helper'
import { OAuth2LinkReq, SocialType, UserType } from '@/utils/type'
import { Image } from '@/widgets/image'
import { useGoogleLogin } from '@react-oauth/google'

const SocialBox = styled.div<{ active?: boolean }>(({ active = false }) => [
  !active &&
    tw`
    flex
    flex-row
    border
    border-solid
    border-gray-300
    rounded-lg
    py-2
    px-4
    gap-2
    bg-white
    justify-center
    items-center
    cursor-pointer
  `,
  active &&
    tw`
    flex
    flex-row
    rounded-lg
    py-2
    px-4
    gap-2
    bg-primary-100
    justify-center
    items-center
  `,
])

const SocialText = tw.div`
  max-w-sm
  text-ellipsis
  overflow-hidden
  text-lg
  font-normal
  text-gray-700
`

const SocialConnect: FunctionComponent<{
  logoSrc: string
  logoAlt: string
  type: string
}> = ({ logoSrc, logoAlt, type }) => {
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)

  // action
  const setUser = useStoreActions<GlobalStoreModel>((action) => action.setUser)

  const onLinkWallet = async () => {
    try {
      await signWallet()
      await getUserData()
    } catch (err) {
      // Do nothing here.
    }
  }

  const onLinkGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      if (tokenResponse && tokenResponse.access_token) {
        const payload: OAuth2LinkReq = {
          type: 'google',
          access_token: tokenResponse.access_token,
        }
        const data = await linkOAuth2(payload)

        if (data.error) {
          toast.error(data.error)
        }

        if (data.code === 0) {
          const userData = await getUserApi()

          if (userData.data) {
            setUserLocal(userData.data)
            setUser(userData.data)
          }
        }
      }
    },
    onError: (errorResponse) => toast.error('Error while link your Google account'),
  })

  const getUserData = async () => {
    try {
      const user = await getUserApi()
      if (user.error) {
        toast.error(user.error)
      } else {
        if (user.data) {
          setUser(user.data)
          setUserLocal(user.data)
        }
      }
    } catch (error) {}
  }

  switch (type) {
    case SocialType.DISCORD: // Discord
      if (user && user.services && user.services.discord) {
        return (
          <SocialBox active>
            <Image width={30} height={30} src={logoSrc} alt={logoAlt} />
            <SocialText>{user.services.discord}</SocialText>
          </SocialBox>
        )
      }
      return (
        <SocialBox onClick={() => handleLoginDiscord({})}>
          <Image width={30} height={30} src={logoSrc} alt={logoAlt} />
          <SocialText>{`Connect ${type}`}</SocialText>
        </SocialBox>
      )
    case SocialType.TWITTER: // Twitter
      if (user && user.services && user.services?.twitter) {
        return (
          <SocialBox active>
            <Image width={30} height={30} src={logoSrc} alt={logoAlt} />
            <SocialText>{user.services?.twitter}</SocialText>
          </SocialBox>
        )
      }
      return (
        <SocialBox onClick={handleLoginTwitter}>
          <Image width={30} height={30} src={logoSrc} alt={logoAlt} />
          <SocialText>{`Connect ${type}`}</SocialText>
        </SocialBox>
      )

    case SocialType.GOOGLE: // Google
      if (user && user.services && user.services?.google) {
        return (
          <SocialBox active>
            <Image width={30} height={30} src={logoSrc} alt={logoAlt} />
            <SocialText>{user.services?.google}</SocialText>
          </SocialBox>
        )
      }
      return (
        <SocialBox onClick={() => onLinkGoogle()}>
          <Image width={30} height={30} src={logoSrc} alt={logoAlt} />
          <SocialText>{`Connect ${type}`}</SocialText>
        </SocialBox>
      )

    default: // Metamask
      if (user && user.wallet_address !== '') {
        return (
          <SocialBox active>
            <Image width={30} height={30} src={logoSrc} alt={logoAlt} />
            <SocialText>{user.wallet_address}</SocialText>
          </SocialBox>
        )
      }
      return (
        <SocialBox onClick={onLinkWallet}>
          <Image width={30} height={30} src={logoSrc} alt={logoAlt} />
          <SocialText>{`Connect ${type}`}</SocialText>
        </SocialBox>
      )
  }
}

export default SocialConnect
