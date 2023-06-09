import { FunctionComponent } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

import { RouterConst } from '@/constants/router.const'
import StorageConst from '@/constants/storage.const'
import { GlobalStoreModel } from '@/store/store'
import { UserType } from '@/types'
import { clearLocalStorage, delCookies } from '@/utils/helper'
import { CircularImage } from '@/widgets/circular-image'
import { Image } from '@/widgets/image'
import { HorizontalCenter, Vertical } from '@/widgets/orientation'
import { PopItem, PopoverPosition, PopPanel } from '@/widgets/popover'
import { Popover } from '@headlessui/react'

export const AvatarBox = styled(Image)(tw`ml-4`)

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
  const navigate = useNavigate()

  // data
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)

  // action
  const setUser = useStoreActions<GlobalStoreModel>((action) => action.setUser)

  // handler
  const handleLogout = () => {
    setUser(undefined)
    delCookies()
    clearLocalStorage()

    navigate(RouterConst.HOME)
  }

  if (!user) {
    return <></>
  }

  return (
    <PopoverPosition>
      <Popover.Button className={'outline-0'}>
        <CircularImage
          width={40}
          height={40}
          src={user.avatar_url || StorageConst.USER_DEFAULT.src}
          alt={StorageConst.USER_DEFAULT.alt}
        />
      </Popover.Button>
      <PopPanel>
        <PopItem>
          <UserBox>
            <Avatar
              width={80}
              height={80}
              src={user.avatar_url || StorageConst.USER_DEFAULT.src}
              alt={'Avatar'}
            />
            <RowBox>
              <NameText>{user.name}</NameText>
            </RowBox>
          </UserBox>
        </PopItem>
        <PopItem>
          {
            // TODO: Add back My community & My Profile
            /* <OptionxBox>{'My Community'}</OptionxBox>
          <OptionxBox
            onClick={() => {
              // TODO: Route to my profile
            }}
          >
            {'My Profile'}
          </OptionxBox> */
          }
          <OptionxBox
            onClick={() => {
              navigate(RouterConst.ACCOUNT_SETTING)
            }}
          >
            {'Account Setting'}
          </OptionxBox>
        </PopItem>
        <PopItem>
          <OptionxBox onClick={handleLogout}>{'Sign out'}</OptionxBox>
        </PopItem>
      </PopPanel>
    </PopoverPosition>
  )
}
