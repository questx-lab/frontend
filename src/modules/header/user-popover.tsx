import { FC } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

import { RouterConst } from '@/constants/router.const'
import { GlobalStoreModel } from '@/store/store'
import { UserType } from '@/types'
import { clearLocalStorage, delCookies } from '@/utils/helper'
import { UserAvatar } from '@/widgets/avatar'
import { Image } from '@/widgets/image'
import { HorizontalCenter, Vertical } from '@/widgets/orientation'
import { OptionxBox, PopItem, PopoverButton, PopoverPosition, PopPanel } from '@/widgets/popover'

export const AvatarBox = styled(Image)(tw`ml-4`)

const UserBox = tw(Vertical)`
  w-full
  justify-center
  items-center
  py-2
  gap-3
`

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

const UserPopover: FC = () => {
  const navigate = useNavigate()

  // data
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)

  // action
  const setUser = useStoreActions<GlobalStoreModel>((action) => action.setUser)
  const setShowUserProfileModal = useStoreActions<GlobalStoreModel>(
    (action) => action.setShowUserProfileModal
  )

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
      <PopoverButton>
        <UserAvatar user={user} size={32} />
      </PopoverButton>
      <PopPanel>
        <PopItem>
          <UserBox>
            <UserAvatar user={user} size={80} />
            <RowBox>
              <NameText>{user.name}</NameText>
            </RowBox>
          </UserBox>
        </PopItem>
        <PopItem>
          <OptionxBox
            onClick={() => {
              setShowUserProfileModal(true)
            }}
          >
            {'My Profile'}
          </OptionxBox>
          <OptionxBox
            onClick={() => {
              navigate(RouterConst.ACCOUNT_SETTINGS)
            }}
          >
            {'Account Settings'}
          </OptionxBox>
        </PopItem>
        <PopItem>
          <OptionxBox onClick={handleLogout}>{'Sign out'}</OptionxBox>
        </PopItem>
      </PopPanel>
    </PopoverPosition>
  )
}

export default UserPopover
