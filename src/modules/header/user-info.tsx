import { FC, useEffect } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import tw from 'twin.macro'

import { AuthEnum } from '@/constants/common.const'
import ChatPopover from '@/modules/chat/popover'
import Login from '@/modules/header/login'
import UserPopover from '@/modules/header/user-popover'
import UserProfile from '@/modules/header/user-profile'
import { GlobalStoreModel } from '@/store/store'
import BaseModal from '@/widgets/modal/base'
import BasicModal from '@/widgets/modal/basic'
import { Horizontal, HorizontalCenter } from '@/widgets/orientation'

const AuthBox = tw(Horizontal)`
  gap-2
`

const UserSession = tw(HorizontalCenter)`
  cursor-pointer
  gap-4
`

const LoginBtn = tw.button`
  bg-white-rgb5
  hover:bg-white-rgb10
  text-sm
  text-white
  font-bold
  py-[6px]
  px-3
  rounded-lg
  border
  border-gray-300
  border-solid
  3xl:text-xl
`

const SignUpBtn = tw.button`
  bg-info
  hover:bg-info-700
  text-sm
  text-white
  font-bold
  py-[6px]
  px-3
  rounded-lg
  max-md:hidden
  3xl:text-xl
`

const ModalBox = tw(HorizontalCenter)`
  flex
  h-full
  items-center
  justify-center
  text-center
  py-6
`

const UserInfoBox: FC = () => {
  // data
  const user = useStoreState<GlobalStoreModel>((state) => state.user)
  const showLoginModal = useStoreState<GlobalStoreModel>((state) => state.showLoginModal)
  const showUserProfileModal = useStoreState<GlobalStoreModel>(
    (state) => state.showUserProfileModal
  )

  //action
  const setAuthBox = useStoreActions<GlobalStoreModel>((action) => action.setAuthBox)
  const setShowLoginModal = useStoreActions<GlobalStoreModel>((action) => action.setShowLoginModal)
  const setShowUserProfileModal = useStoreActions<GlobalStoreModel>(
    (action) => action.setShowUserProfileModal
  )

  useEffect(() => {
    if (user && user.is_new_user) {
      setShowLoginModal(true)
      setAuthBox(AuthEnum.CHOOSE_USERNAME)
    }
  }, [user])

  if (user) {
    return (
      <UserSession>
        <ChatPopover />
        <UserPopover />

        <BaseModal isOpen={showLoginModal}>
          <ModalBox>
            <Login setOpen={setShowLoginModal} />
          </ModalBox>
        </BaseModal>
        <BasicModal
          isOpen={showUserProfileModal}
          title={'My Profile'}
          onClose={() => setShowUserProfileModal(false)}
          styled='!w-[780px]'
        >
          <UserProfile user={user} />
        </BasicModal>
      </UserSession>
    )
  }

  return (
    <>
      <AuthBox>
        <LoginBtn
          onClick={() => {
            setAuthBox(AuthEnum.LOGIN)
            setShowLoginModal(true)
          }}
        >
          {'Log in'}
        </LoginBtn>
        <SignUpBtn
          onClick={() => {
            setAuthBox(AuthEnum.REGISTER)
            setShowLoginModal(true)
          }}
        >
          {'Sign up'}
        </SignUpBtn>
      </AuthBox>
      <BaseModal isOpen={showLoginModal}>
        <ModalBox>
          <Login setOpen={setShowLoginModal} />
        </ModalBox>
      </BaseModal>
    </>
  )
}

export default UserInfoBox
