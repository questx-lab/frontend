import { FunctionComponent } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import styled from 'styled-components'
import tw from 'twin.macro'

import { StorageConst } from '@/constants/storage.const'
import { GlobalStoreModel } from '@/store/store'
import { clearLocalStorage, delCookies } from '@/utils/helper'
import { UserType } from '@/utils/type'
import { Image } from '@/widgets/image'
import { HorizontalCenter, Vertical } from '@/widgets/orientation'
import { Popover } from '@headlessui/react'

const PopWrap = styled(Popover)(tw`
  relative
  z-10
`)

const AvatarBox = styled(Image)(tw`ml-4`)

const PopPanel = styled(Popover.Panel)(tw`
  divide-y
  right-0
  rounded-lg
  mt-5
  absolute z-10
  bg-white
  shadow-lg
  border
  border-solid
  border-gray-300
  w-[350px]
  flex
  flex-col
`)

const PopItem = tw(Vertical)`
  w-full
  py-2
  px-4
`

const UserBox = tw(Vertical)`
  w-full
  justify-center
  items-center
  py-2
  gap-3
`

const Avatar = styled(Image)(
  () => tw`
  rounded-full
`
)

const RowBox = tw(HorizontalCenter)`
  gap-1
`

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

const OptionxBox = tw.div`
  w-full
  text-lg
  font-normal
  text-gray-700
  p-2
  px-3
  rounded-lg
  hover:bg-primary-100
`

export const UserPopover: FunctionComponent = () => {
  // data
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)

  // action
  const setUser = useStoreActions<GlobalStoreModel>((action) => action.setUser)

  // handler
  const handleLogout = () => {
    setUser(undefined)
    delCookies()
    clearLocalStorage()
    // TODO: Navigate to home
  }

  return (
    <PopWrap>
      <Popover.Button className={'outline-0'}>
        <AvatarBox
          width={40}
          height={40}
          src={StorageConst.USER_DEFAULT.src}
          alt={StorageConst.USER_DEFAULT.alt}
        />
      </Popover.Button>
      <PopPanel>
        <PopItem>
          <UserBox>
            <Avatar width={80} height={80} src={StorageConst.USER_DEFAULT.src} alt={'Avatar'} />
            <RowBox>
              <NameText>{user && user.name}</NameText>
            </RowBox>
          </UserBox>
        </PopItem>
        <PopItem>
          <OptionxBox>{'My Community'}</OptionxBox>
          <OptionxBox
            onClick={() => {
              // TODO: Route to my profile
            }}
          >
            {'My Profile'}
          </OptionxBox>
          <OptionxBox
            onClick={() => {
              // TODO: Go to settings
            }}
          >
            {'Account Setting'}
          </OptionxBox>
        </PopItem>
        <PopItem>
          <OptionxBox onClick={handleLogout}>{'Sign out'}</OptionxBox>
        </PopItem>
      </PopPanel>
    </PopWrap>
  )
}
