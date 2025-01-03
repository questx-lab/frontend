import { FC } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

import { RouterConst } from '@/constants/router.const'
import ClaimReward from '@/modules/header/claim-reward'
import Referral from '@/modules/header/referral'
import { GlobalStoreModel } from '@/store/store'
import { UserType } from '@/types'
import { clearLocalStorage, delCookies } from '@/utils/helper'
import { UserAvatar } from '@/widgets/avatar'
import { Image } from '@/widgets/image'
import { HorizontalCenter, Vertical } from '@/widgets/orientation'
import { OptionxBox, PopItem, PopPanel, PopPover } from '@/widgets/popover'

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
  max-w-full
`

const NameText = tw.p`
  text-xl
  font-medium
  text-black
  text-center
  text-ellipsis
  overflow-hidden
`

const Poppanel = tw(PopPanel)`w-[240px] mt-5 !right-0 max-h-[calc(100vh_-_70px)] overflow-y-scroll`

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
    <PopPover custom button={<UserAvatar user={user} size={32} />}>
      <Poppanel>
        {({ close }) => (
          <>
            <PopItem>
              <UserBox>
                <UserAvatar user={user} size={64} />
                <RowBox>
                  <NameText>{user.name}</NameText>
                </RowBox>
              </UserBox>
              <ClaimReward />
            </PopItem>
            <PopItem>
              <OptionxBox
                onClick={() => {
                  setShowUserProfileModal(true)
                  close()
                }}
              >
                {'My Profile'}
              </OptionxBox>
              <OptionxBox
                onClick={() => {
                  navigate(RouterConst.ACCOUNT_SETTINGS)
                  close()
                }}
              >
                {'Account Settings'}
              </OptionxBox>
            </PopItem>
            <PopItem>
              <Referral close={close} />
            </PopItem>
            <PopItem>
              <OptionxBox onClick={handleLogout}>{'Sign out'}</OptionxBox>
            </PopItem>
          </>
        )}
      </Poppanel>
    </PopPover>
  )
}

export default UserPopover
