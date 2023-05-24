'use client'

import { FunctionComponent, useEffect, useState } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import toast from 'react-hot-toast'
import styled from 'styled-components'
import tw from 'twin.macro'

import { getUserApi, updateUserApi } from '@/app/api/client/user'
import { StorageConst } from '@/constants/storage.const'
import { UserStore } from '@/store/local/user.store'
import { GlobalStoreModel } from '@/store/store'
import { setUserLocal } from '@/utils/helper'
import { UserType } from '@/utils/type'
import { NegativeButton, PositiveButton } from '@/widgets/button'
import { TextField } from '@/widgets/form'
import { PrimaryText } from '@/widgets/text'

import {
  ButtonBox,
  ColBox,
  ContentBox,
  Description,
  DivideBox,
  HeadBox,
  Label,
  ProfileSession,
  RowBox,
} from './style'

enum SocialType {
  DISCORD = 'discord',
  TWITTER = 'twitter',
  GOOGLE = 'google',
  METAMASK = 'wallet',
}

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

  const signInTwitter = async () => {
    await signIn('twitter')
  }

  const signInDiscord = async () => {
    await signIn('discord')
  }

  const signInGoogle = async () => {
    await signIn('google')
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
      if (user.services?.twitter) {
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
      if (user.services?.google) {
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
      if (user.address !== '') {
        return (
          <SocialBox active>
            <Image width={30} height={30} src={logoSrc} alt={logoAlt} />
            <SocialText>{user.address}</SocialText>
          </SocialBox>
        )
      }
      return (
        <SocialBox>
          <Image width={30} height={30} src={logoSrc} alt={logoAlt} />
          <SocialText>{`Connect ${type}`}</SocialText>
        </SocialBox>
      )
  }
}

export const General: FunctionComponent = () => {
  // data
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)
  const username = UserStore.useStoreState((state) => state.username)
  const inviteCode = UserStore.useStoreState((state) => state.inviteCode)
  const metamask = UserStore.useStoreState((state) => state.metamask)

  // action
  const setUsername = UserStore.useStoreActions((action) => action.setUsername)
  const setInviteCode = UserStore.useStoreActions(
    (action) => action.setInviteCode
  )
  const setMetaMask = UserStore.useStoreActions((action) => action.setMetaMask)
  const setUser = useStoreActions<GlobalStoreModel>((action) => action.setUser)

  // hook
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    if (user && user.name) {
      setUsername(user.name)
    }
  }, [user])

  // handler
  const handleSubmit = async () => {
    setLoading(true)
    try {
      const update = await updateUserApi(username)
      if (update.error) {
        return toast.error(update.error)
      }
      const user = await getUserApi()
      if (user.data) {
        setUserLocal(user.data)
        setUser(user.data)
      }
    } catch (error) {
      toast.error('Network error')
    } finally {
      setLoading(false)
    }
  }

  const block = username === ''

  return (
    <DivideBox>
      <HeadBox>{'General'}</HeadBox>
      <ContentBox>
        <ProfileSession>
          <Label>{'USERNAME'}</Label>
          <TextField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder=''
          />
          <Label>{'INVITE PROJECT CODE'}</Label>
          <TextField
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            required={false}
            placeholder=''
          />
          <RowBox>
            <ColBox>
              <Image
                width={250}
                height={250}
                src={StorageConst.MANTA_LOGO.src}
                alt={'avatar'}
              />
              <PrimaryText>{'*Max 5.0MB, Size 200x200px'}</PrimaryText>
            </ColBox>
            <ColBox>
              <SocialConnect
                logoAlt={StorageConst.DISCORD_DIR.src}
                logoSrc={StorageConst.DISCORD_DIR.src}
                type={SocialType.DISCORD}
              />
              <SocialConnect
                logoAlt={StorageConst.TWITTER_DIR.src}
                logoSrc={StorageConst.TWITTER_DIR.src}
                type={SocialType.TWITTER}
              />
              <SocialConnect
                logoAlt={StorageConst.GOOGLE_DIR.src}
                logoSrc={StorageConst.GOOGLE_DIR.src}
                type={SocialType.GOOGLE}
              />
              <SocialConnect
                logoAlt={StorageConst.METAMASK_DIR.src}
                logoSrc={StorageConst.METAMASK_DIR.src}
                type={SocialType.METAMASK}
              />
            </ColBox>
          </RowBox>
        </ProfileSession>
        <ProfileSession>
          <Label>{'METAMASK ADDRESS'}</Label>
          <TextField
            value={metamask}
            onChange={(e) => setMetaMask(e.target.value)}
            required={false}
            placeholder=''
          />
          <Description>
            {'Please add your address so we can send you rewards.'}
          </Description>
        </ProfileSession>
        <ProfileSession>
          <ButtonBox>
            <NegativeButton>{'Cancel'}</NegativeButton>
            <PositiveButton onClick={handleSubmit} block={block}>
              {'Save'}
            </PositiveButton>
          </ButtonBox>
        </ProfileSession>
      </ContentBox>
    </DivideBox>
  )
}
