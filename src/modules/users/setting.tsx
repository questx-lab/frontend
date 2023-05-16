import { FunctionComponent, useEffect, useState } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import Image from 'next/image'
import toast from 'react-hot-toast'
import styled from 'styled-components'
import tw from 'twin.macro'

import { getUserApi, updateUserApi } from '@/app/api/client/user'
import { SocialDisplayMap } from '@/constants/project.const'
import { StorageConst } from '@/constants/storage.const'
import { UserStore } from '@/store/local/user.store'
import { GlobalStoreModel } from '@/store/store'
import { UserType } from '@/types/account.type'
import { setUserLocal } from '@/utils/helper'
import { TextField } from '@/widgets/form'
import { WalletIcon } from '@heroicons/react/24/outline'
import { Checkbox } from '@material-tailwind/react'

const Wrap = tw.div`
  flex
  flex-row
  min-h-screen
  mt-[70px]
`

const Asside = tw.div`
  divide-y
  w-80
  fixed
  border-r
  border-gray-200
  h-full
`

const Main = tw.div`
  w-full
  flex
  flex-row
  justify-start
  items-start
  ml-80
  bg-white
`

const PersonWrap = tw.div`
  flex
  flex-col
  justify-center
  items-center
  py-8
  gap-2
`

const Avatar = styled(Image)(
  () => tw`
  rounded-full
`
)

const NameText = tw.p`
  text-xl
  font-medium
  text-black
  text-center
  max-w-lg
  text-ellipsis
  overflow-hidden
  max-w-[150px]

`

const LvBox = tw.div`
  bg-teal
  rounded-full
  px-3
  py-1
  text-sm
  font-medium
  text-white
`

const OptionWrap = tw.div`
  py-4
  px-6
  flex
  flex-col
  gap-3
`

const Option = styled.div<{ active?: boolean }>(({ active = false }) => [
  active
    ? tw`
        bg-primary-100
        px-3
        py-3
        flex
        flex-row
        justify-start
        items-center
        rounded-lg
        hover:bg-primary-50
        cursor-pointer
        text-lg
        font-medium
        text-primary-500
        gap-2
      `
    : tw`
        px-3
        py-3
        bg-white
        flex
        flex-row
        justify-start
        items-center
        rounded-lg
        hover:bg-primary-50
        cursor-pointer
        text-lg
        font-medium
        text-gray-700
        gap-2
      `,
])

const DivideBox = tw.div`
  w-full
  divide-y
  flex
  flex-col
`

const HeadBox = tw.div`
  w-full
  flex
  flex-row
  py-6
  px-12
  text-2xl
  font-medium
  text-gray-900
`

const ContentBox = tw.div`
  w-full
  py-6
  px-12
  flex
  flex-col
  gap-4
  divide-y
`

const ProfileSession = tw.div`
  w-2/3
  flex
  flex-col
  gap-5
  pb-3
  pt-6
`

const Label = tw.label`
  text-lg
  font-medium
  text-gray-700
`

const Description = tw.label`
  text-lg
  font-normal
  text-gray-700
`

const RowBox = tw.div`
  flex
  flex-row
  gap-6
  justify-start
  items-start
`

const ColBox = tw.div`
  flex
  flex-col
  justify-start
  items-start
  gap-3
`

const PrimaryText = tw.span`
  text-primary
  font-normal
  text-sm
`

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

const CheckboxWrap = tw.div`
  flex
  flex-col
  justify-start
  items-start
`

const CheckboxSession = tw.div`
  flex
  flex-row
  gap-2
  justify-start
  items-center
  text-lg
  font-normal
  text-gray-700
`

const ButtonBox = tw.div`
  w-full
  flex
  flex-row
  gap-3
  justify-end
  items-center
`

const SaveBtn = styled.button<{ block?: boolean }>(({ block = false }) => [
  !block &&
    tw`
      bg-primary
      hover:bg-primary-300
      text-sm
      text-white
      font-medium
      py-3
      px-6
      rounded-lg
      max-lg:hidden
    `,
  block &&
    tw`
      bg-primary-300
      text-sm
      text-white
      font-medium
      py-3
      px-6
      rounded-lg
      max-lg:hidden
    `,
])

const CancelBtn = tw.button`
  bg-white
  hover:bg-gray-100
  text-sm
  text-black
  font-medium
  py-3
  px-6
  rounded-lg
  max-lg:hidden
  border
  border-gray-300
  border-solid
`

const BadgeGrid = tw.div`
  w-full
  grid
  grid-cols-5
  gap-4
`

const BadgeBox = tw.div`
  p-4
  border
  border-solid
  border-gray-300
  rounded-lg
  cursor-pointer
`
enum TabEnum {
  GENERAL,
  ACHIEVEMENTS,
}

const Achivement: FunctionComponent = () => {
  return (
    <DivideBox>
      <HeadBox>{'Achievements'}</HeadBox>
      <ContentBox>
        <ProfileSession>
          <BadgeGrid>
            {[...Array.from({ length: 12 }, (x: any, i: any) => i)].map(
              (idx) => (
                <BadgeBox key={idx}>
                  <Image
                    width={180}
                    height={180}
                    src={'/images/dummy/badge.svg'}
                    alt={'Badge'}
                  />
                </BadgeBox>
              )
            )}
          </BadgeGrid>
        </ProfileSession>
        <ProfileSession>
          <ButtonBox>
            <CancelBtn>{'Cancel'}</CancelBtn>
            <SaveBtn>{'Save'}</SaveBtn>
          </ButtonBox>
        </ProfileSession>
      </ContentBox>
    </DivideBox>
  )
}

const General: FunctionComponent = () => {
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
          <CheckboxWrap>{renderSocialDisplay}</CheckboxWrap>
        </ProfileSession>
        <ProfileSession>
          <ButtonBox>
            <CancelBtn>{'Cancel'}</CancelBtn>
            <SaveBtn onClick={handleSubmit} block={block} disabled={block}>
              {'Save'}
            </SaveBtn>
          </ButtonBox>
        </ProfileSession>
      </ContentBox>
    </DivideBox>
  )
}

const UserSetting: FunctionComponent = () => {
  // hook
  const [tab, setTab] = useState<number>(TabEnum.GENERAL)

  // data
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)

  const ContentOption: FunctionComponent = () => {
    if (tab === TabEnum.ACHIEVEMENTS) {
      return <Achivement />
    }

    return <General />
  }

  return (
    <Wrap>
      <Asside>
        <PersonWrap>
          <Avatar
            width={80}
            height={80}
            src={'/images/dummy/1.svg'}
            alt={'Avatar'}
          />
          <NameText>{user && user.name}</NameText>
          <LvBox>{'lvl.3'}</LvBox>
        </PersonWrap>
        <OptionWrap>
          <Option
            active={tab === TabEnum.GENERAL}
            onClick={() => tab !== TabEnum.GENERAL && setTab(TabEnum.GENERAL)}
          >
            <span>{'👋'}</span>

            {'GENERAL'}
          </Option>
          <Option
            active={tab === TabEnum.ACHIEVEMENTS}
            onClick={() =>
              tab !== TabEnum.ACHIEVEMENTS && setTab(TabEnum.ACHIEVEMENTS)
            }
          >
            <span> {'🎉'}</span>

            {'ACHIVEMENTS'}
          </Option>
        </OptionWrap>
      </Asside>
      <Main>
        <UserStore.Provider>
          <ContentOption />
        </UserStore.Provider>
      </Main>
    </Wrap>
  )
}

export default UserSetting
