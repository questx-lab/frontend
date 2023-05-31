import { FunctionComponent, useEffect, useState } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import tw from 'twin.macro'

import { AuthEnum } from '@/constants/common.const'
import Login from '@/modules/header/login'
import { UserPopover } from '@/modules/header/user-popover'
import { GlobalStoreModel } from '@/store/store'
import { BaseModal, BasicModal } from '@/widgets/modal'
import { Horizontal, HorizontalCenter } from '@/widgets/orientation'
import { GiftIcon } from '@heroicons/react/24/outline'

const AuthBox = tw(Horizontal)`
  gap-2
`

const UserSession = tw(HorizontalCenter)`
  cursor-pointer
  max-md:hidden
`

const LoginBtn = tw.button`
  bg-white
  hover:bg-gray-100
  text-sm
  text-black
  font-medium
  py-3
  px-6
  rounded-lg
  max-md:hidden
  border
  border-gray-300
  border-solid
  3xl:text-xl
`

const SignUpBtn = tw.button`
  bg-primary
  hover:bg-primary-300
  text-sm
  text-white
  font-medium
  py-3
  px-6
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

export const UserInfoBox: FunctionComponent = () => {
  // data
  const user = useStoreState<GlobalStoreModel>((state) => state.user)
  const showLoginModal = useStoreState<GlobalStoreModel>((state) => state.showLoginModal)
  //action
  const setAuthBox = useStoreActions<GlobalStoreModel>((action) => action.setAuthBox)
  const setShowLoginModal = useStoreActions<GlobalStoreModel>((action) => action.setShowLoginModal)

  // hook
  const [isInvite, setInvite] = useState<boolean>(false)

  useEffect(() => {
    if (user && user.is_new_user) {
      setShowLoginModal(true)
      setAuthBox(AuthEnum.INPUT_FORM)
    }
  }, [user])

  if (user) {
    return (
      <UserSession>
        <GiftIcon onClick={() => setInvite(true)} className='h-7 w-7' />
        <UserPopover />

        <BasicModal
          title={`Invite Friend to create project 👋`}
          isOpen={isInvite}
          onClose={() => setInvite(false)}
        >
          {/* <InviteCommunity /> */}
          Add back the InviteCommunity here
        </BasicModal>
        <BaseModal isOpen={showLoginModal}>
          <ModalBox>
            <Login setOpen={setShowLoginModal} />
          </ModalBox>
        </BaseModal>
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
