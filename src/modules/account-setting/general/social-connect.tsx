import { FunctionComponent } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import toast from 'react-hot-toast'
import styled from 'styled-components'
import tw from 'twin.macro'

import { getUserApi } from '@/app/api/client/user'
import { signWallet } from '@/handler/auth/metamask'
import { SocialType } from '@/modules/account-setting/mini-widget'
import { GlobalStoreModel } from '@/store/store'
import { setUserLocal } from '@/utils/helper'
import { UserType } from '@/utils/type'
import { Image } from '@/widgets/image'

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

  const signInTwitter = async () => {}

  const signInDiscord = async () => {}

  const signInGoogle = async () => {}

  const onLinkWallet = async () => {
    try {
      await signWallet()
      await getUserData()
    } catch (err) {
      // Do nothing here.
    }
  }

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
        <SocialBox onClick={signInDiscord}>
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
        <SocialBox onClick={signInTwitter}>
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
        <SocialBox onClick={signInGoogle}>
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
