import { FC, useState } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import toast from 'react-hot-toast'
import { MoonLoader } from 'react-spinners'
import styled from 'styled-components'
import tw from 'twin.macro'

import { getUserApi, updateUserApi } from '@/api/user'
import StorageConst from '@/constants/storage.const'
import AvatarUpload from '@/modules/account-setting/general/upload-avatar'
import { FieldTitle } from '@/modules/create-quest/mini-widget'
import { PaddingVertical, Title } from '@/modules/header/login'
import AccountSettingsStore from '@/store/local/account-settings'
import { GlobalStoreModel } from '@/store/store'
import { UserType } from '@/types'
import { uploadFileForUser } from '@/utils/file'
import { setUserLocal } from '@/utils/helper'
import { TextField } from '@/widgets/form'
import { Image } from '@/widgets/image'
import {
  HorizontalBetweenCenter,
  HorizontalCenter,
  Vertical,
  VerticalFullWidthCenter,
} from '@/widgets/orientation'
import { Label, TextSm } from '@/widgets/text'

const FormBox = tw(Vertical)`
  w-full
  justify-center
  gap-4
`

const InfoBox = tw(VerticalFullWidthCenter)`
  p-3
  justify-between
  items-center
  gap-3
  border
  border-solid
  border-gray-300
  rounded-lg
  bg-gray-50
  cursor-pointer
`

const PaddingHorizontal = tw(HorizontalBetweenCenter)`
  items-center
  w-full
  gap-3
`

const GapVertical = tw(Vertical)`
  gap-1
`

const NameText = tw.span`
  text-lg
  font-medium
  text-gray-900

`

const EmailText = tw.span`
  text-sm
  font-normal
  text-gray-500
  max-w-[250px]
  max-sm:max-w-[100px]
  overflow-hidden
  text-ellipsis
  line-clamp-1
`

const SocialBoxInput = tw(HorizontalCenter)`
  w-full
  border
  border-solid
  border-gray-300
  rounded-lg
  h-14
`

const EmptyBox = tw.div`
  h-full
  bg-gray-50
  border-r
  border-solid
  border-gray-300
  w-14
  flex
  justify-center
  items-center
  rounded-l-lg
  text-lg
  font-normal
  text-gray-400
`

const SocialInput = tw.input`
  px-4
  outline-0
  border-0
  ring-0
  w-full
  h-full
  text-lg
  rounded-lg
`

const Button = styled.button<{ block?: boolean }>(({ block = false }) => [
  !block &&
    tw`
    w-full
    rounded-lg
    bg-primary
    hover:bg-primary-300
    text-white
    h-14
    text-lg
    font-medium
    mt-4
    flex
    justify-center
    items-center
  `,
  block &&
    tw`
    w-full
    rounded-lg
    bg-gray-100
    text-gray-400
    h-14
    text-lg
    font-medium
    mt-4
  `,
])

const ErrorText = tw(TextSm)`
  text-start
  text-danger-700
`

const RenderLogoSocial: FC = () => {
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)

  if (user && user.services?.twitter) {
    return (
      <Image
        width={40}
        height={40}
        src={StorageConst.TWITTER_DIR.src}
        alt={StorageConst.TWITTER_DIR.alt}
      />
    )
  }

  if (user && user.services?.discord) {
    return (
      <Image
        width={40}
        height={40}
        src={StorageConst.DISCORD_DIR.src}
        alt={StorageConst.DISCORD_DIR.alt}
      />
    )
  }

  if (user && user.wallet_address) {
    return (
      <Image
        width={40}
        height={40}
        src={StorageConst.METAMASK_DIR.src}
        alt={StorageConst.METAMASK_DIR.alt}
      />
    )
  }

  return (
    <Image
      width={40}
      height={40}
      src={StorageConst.GOOGLE_DIR.src}
      alt={StorageConst.GOOGLE_DIR.alt}
    />
  )
}

const UserBox: FC = () => {
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)

  return (
    <InfoBox>
      <AvatarUpload imageSize={120} isCircle />
      <PaddingHorizontal>
        <GapVertical>
          <NameText>{`Sign in as`}</NameText>
          <EmailText>{user && user.name}</EmailText>
        </GapVertical>
        <RenderLogoSocial />
      </PaddingHorizontal>
    </InfoBox>
  )
}

const ChooseUserName: FC<{
  setOpen: (value: boolean) => void
}> = ({ setOpen }) => {
  // hook
  const [loading, setLoading] = useState<boolean>(false)
  const [showUserNameError, setShowUserNameError] = useState<boolean>(false)

  // data
  const username = AccountSettingsStore.useStoreState((state) => state.username)
  const avatar = AccountSettingsStore.useStoreState((state) => state.avatar)

  // action
  const setUsername = AccountSettingsStore.useStoreActions((action) => action.setUsername)
  const setUser = useStoreActions<GlobalStoreModel>((action) => action.setUser)

  // handler
  const handleSubmit = async () => {
    setLoading(true)
    try {
      const reg = /^[a-zA-Z0-9_]{4,32}$/g
      if (!username.match(reg)) {
        setShowUserNameError(true)
        return
      }

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
      setOpen(false)
    } catch (error) {
      toast.error('Network error')
    } finally {
      setLoading(false)
    }
  }

  const LoadingBtn: FC = () => {
    if (loading) {
      return <MoonLoader color='#fff' loading speedMultiplier={0.8} size={25} />
    }

    return <>{'Sign up'}</>
  }

  return (
    <PaddingVertical>
      <Title>{'Create your XQuest account'}</Title>
      <FormBox>
        <UserBox />
        <FieldTitle title={'XQUEST USERNAME'} required={true} />
        <TextField
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
          placeholder=''
        />
        {showUserNameError && (
          <ErrorText>{`Username should contain only characters from a->z, 0->9, '_' and must be between 4 and 32 characters in length.`}</ErrorText>
        )}
        <Label>{'TWITTER'}</Label>
        <SocialBoxInput>
          <EmptyBox>{'@'}</EmptyBox>
          <SocialInput placeholder='Username' />
        </SocialBoxInput>
        <Label>{'DISCORD'}</Label>
        <SocialBoxInput>
          <EmptyBox>{'@'}</EmptyBox>
          <SocialInput placeholder='Username' />
        </SocialBoxInput>
      </FormBox>
      <Button onClick={handleSubmit} block={username === ''} disabled={username === ''}>
        <LoadingBtn />
      </Button>
      {
        // TODO: Add back Terms of service when it's ready.
        //   <PolicyText>
        //   {'By continuing, you agree to the'} <PrimaryText isHover>{'Terms of Service'}</PrimaryText>
        //   <PrimaryText isHover>{'Privacy policy'}</PrimaryText>
        // </PolicyText>
      }
    </PaddingVertical>
  )
}

export default ChooseUserName
