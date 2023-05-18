'use client'

import { FunctionComponent, useEffect, useState } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import Image from 'next/image'
import toast from 'react-hot-toast'

import { getUserApi, updateUserApi } from '@/app/api/client/user'
import { SocialDisplayMap } from '@/constants/project.const'
import { StorageConst } from '@/constants/storage.const'
import { UserStore } from '@/store/local/user.store'
import { GlobalStoreModel } from '@/store/store'
import { UserType } from '@/types/account.type'
import { setUserLocal } from '@/utils/helper'
import { NegativeButton, PositiveButton } from '@/widgets/button'
import { TextField } from '@/widgets/form'
import { Horizontal } from '@/widgets/orientation'
import { PrimaryText } from '@/widgets/text'
import { WalletIcon } from '@heroicons/react/24/outline'
import { Checkbox } from '@material-tailwind/react'

import {
  ButtonBox,
  CheckboxSession,
  ColBox,
  ContentBox,
  Description,
  DivideBox,
  HeadBox,
  Label,
  ProfileSession,
  RowBox,
  SocialBox,
} from './style'

export const General: FunctionComponent = () => {
  // data
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)
  const username = UserStore.useStoreState((state) => state.username)
  const inviteCode = UserStore.useStoreState((state) => state.inviteCode)
  const metamask = UserStore.useStoreState((state) => state.metamask)
  const socialDisplay = UserStore.useStoreState((state) => state.socialDisplay)

  // action
  const setUsername = UserStore.useStoreActions((action) => action.setUsername)
  const setInviteCode = UserStore.useStoreActions(
    (action) => action.setInviteCode
  )
  const setMetaMask = UserStore.useStoreActions((action) => action.setMetaMask)
  const setSocialDisplay = UserStore.useStoreActions(
    (action) => action.setSocialDisplay
  )
  const setUser = useStoreActions<GlobalStoreModel>((action) => action.setUser)

  // hook
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    if (user && user.name) {
      setUsername(user.name)
    }
  }, [user])

  // handler
  const renderSocialDisplay = Array.from(SocialDisplayMap.values()).map(
    (value, i) => (
      <CheckboxSession key={i}>
        <Checkbox
          onChange={(e) => {
            if (e.target.checked) {
              setSocialDisplay(i)
            }
          }}
          checked={socialDisplay === i}
        />
        {value}
      </CheckboxSession>
    )
  )
  const handleSubmit = async () => {
    setLoading(true)
    try {
      const update = await updateUserApi(username)
      if (update.error) {
        return toast.error(update.error)
      }
      const user = await getUserApi()
      setUserLocal(user.data!)
      setUser(user.data!)
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
              <SocialBox active>
                <Image
                  width={30}
                  height={30}
                  src={StorageConst.DISCORD_DIR.src}
                  alt={StorageConst.DISCORD_DIR.alt}
                />
                {'LinnLinn2411#3662'}
              </SocialBox>
              <SocialBox active>
                <Image
                  width={30}
                  height={30}
                  src={StorageConst.TWITTER_DIR.src}
                  alt={StorageConst.TWITTER_DIR.alt}
                />
                {'Linn_Linn_2411'}
              </SocialBox>
              <SocialBox active>
                <Image
                  width={30}
                  height={30}
                  src={StorageConst.GOOGLE_DIR.src}
                  alt={StorageConst.GOOGLE_DIR.alt}
                />
                {'linnlinn2411@gmail.com'}
              </SocialBox>
              <SocialBox>
                <WalletIcon className='w-7 h-7' />
                {'Connect wallet'}
              </SocialBox>
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
          <Label>{'PUBLIC PROFILE INFORMATION'}</Label>
          <Description>
            {'Choose which information to display on your XQuest profile'}
          </Description>
          <Horizontal>{renderSocialDisplay}</Horizontal>
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
