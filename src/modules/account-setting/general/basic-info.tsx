import { FC, useEffect, useState } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import toast from 'react-hot-toast'
import tw from 'twin.macro'

import { getUserApi, updateUserApi } from '@/api/user'
import { SizeEnum } from '@/constants/common.const'
import StorageConst from '@/constants/storage.const'
import SocialConnect from '@/modules/account-setting/general/social-connect'
import AvatarUpload from '@/modules/account-setting/general/upload-avatar'
import { ButtonBox, ColumnBox, RowBox } from '@/modules/account-setting/mini-widget'
import AccountSettingsStore from '@/store/local/account-settings'
import { GlobalStoreModel } from '@/store/store'
import { SocialType, UserType } from '@/types'
import { uploadFileForUser } from '@/utils/file'
import { setUserLocal } from '@/utils/helper'
import { PositiveButton } from '@/widgets/buttons'
import { TextField } from '@/widgets/form'
import { Vertical } from '@/widgets/orientation'
import { Divider } from '@/widgets/separator'
import { Label } from '@/widgets/text'

const PaddingVertical = tw(Vertical)`
  w-2/3
  gap-5
  pb-3
  pt-6
  max-md:w-full
`

export const ActionUpdate: FC = () => {
  const [loading, setLoading] = useState<boolean>(false)

  // data
  const username = AccountSettingsStore.useStoreState((state) => state.username)

  const avatar = AccountSettingsStore.useStoreState((state) => state.avatar)

  // action
  const setUser = useStoreActions<GlobalStoreModel>((action) => action.setUser)

  // handler
  const handleSubmit = async () => {
    setLoading(true)
    try {
      // Upload user avatar
      if (avatar) {
        const resultUpload = await uploadFileForUser(avatar)
        if (resultUpload.error) {
          toast.error(resultUpload.error)
          return
        }
      }

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
      <Divider />
      <ButtonBox>
        <PositiveButton loading={loading} width={SizeEnum.x48} onClick={handleSubmit} block={block}>
          {'Save'}
        </PositiveButton>
      </ButtonBox>
    </PaddingVertical>
  )
}

export const BasicInfo: FC = () => {
  // data
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)
  const username = AccountSettingsStore.useStoreState((state) => state.username)
  const inviteCode = AccountSettingsStore.useStoreState((state) => state.inviteCode)

  // action
  const setUsername = AccountSettingsStore.useStoreActions((action) => action.setUsername)
  const setInviteCode = AccountSettingsStore.useStoreActions((action) => action.setInviteCode)

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
      <RowBox>
        <AvatarUpload imageSize={250} />
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
