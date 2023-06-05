import { FunctionComponent, useEffect, useState } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import toast from 'react-hot-toast'
import tw from 'twin.macro'

import { getUserApi, updateUserApi } from '@/app/api/client/user'
import { StorageConst } from '@/constants/storage.const'
import SocialConnect from '@/modules/account-setting/general/social-connect'
import { ButtonBox, ColumnBox, RowBox } from '@/modules/account-setting/mini-widget'
import AccountSettingStore from '@/store/local/account-setting.store'
import { GlobalStoreModel } from '@/store/store'
import { setUserLocal } from '@/utils/helper'
import { SocialType, UserType } from '@/utils/type'
import { NegativeButton, PositiveButton } from '@/widgets/buttons'
import { TextField } from '@/widgets/form'
import { Image } from '@/widgets/image'
import { Vertical } from '@/widgets/orientation'
import { Label, PrimaryText } from '@/widgets/text'

const PaddingVertical = tw(Vertical)`
  w-2/3
  gap-5
  pb-3
  pt-6
`

export const ActionUpdate: FunctionComponent = () => {
  const [loading, setLoading] = useState<boolean>(false)

  // data
  const username = AccountSettingStore.useStoreState((state) => state.username)

  // action
  const setUser = useStoreActions<GlobalStoreModel>((action) => action.setUser)

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
    <PaddingVertical>
      <ButtonBox>
        <NegativeButton>{'Cancel'}</NegativeButton>
        <PositiveButton loading={loading} onClick={handleSubmit} block={block}>
          {'Save'}
        </PositiveButton>
      </ButtonBox>
    </PaddingVertical>
  )
}

export const BasicInfo: FunctionComponent = () => {
  // data
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)
  const username = AccountSettingStore.useStoreState((state) => state.username)
  const inviteCode = AccountSettingStore.useStoreState((state) => state.inviteCode)

  // action
  const setUsername = AccountSettingStore.useStoreActions((action) => action.setUsername)
  const setInviteCode = AccountSettingStore.useStoreActions((action) => action.setInviteCode)

  // hook
  useEffect(() => {
    if (user && user.name) {
      setUsername(user.name)
    }
  }, [user])

  return (
    <PaddingVertical>
      <Label>{'USERNAME'}</Label>
      <TextField
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        placeholder=''
      />
      <Label>{'INVITE COMMUNITY CODE'}</Label>
      <TextField
        value={inviteCode}
        onChange={(e) => setInviteCode(e.target.value)}
        required={false}
        placeholder=''
      />
      <RowBox>
        <ColumnBox>
          <Image width={250} height={250} src={StorageConst.USER_DEFAULT.src} alt={'avatar'} />
          <PrimaryText>{'*Max 5.0MB, Size 200x200px'}</PrimaryText>
        </ColumnBox>
        <ColumnBox>
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
        </ColumnBox>
      </RowBox>
    </PaddingVertical>
  )
}
