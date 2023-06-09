import { FC } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import tw from 'twin.macro'

import Login from '@/modules/header/login'
import { GlobalStoreModel } from '@/store/store'
import { PositiveButton } from '@/widgets/buttons'
import BaseModal from '@/widgets/modal/base'
import { Horizontal, HorizontalCenter } from '@/widgets/orientation'

const Border = tw(Horizontal)`
  w-full
  items-center
  justify-center
  p-6
`

const ModalBox = tw(HorizontalCenter)`
  flex
  h-full
  items-center
  justify-center
  text-center
  py-6
`

const AdminLogin: FC = () => {
  const showLoginModal = useStoreState<GlobalStoreModel>((state) => state.showLoginModal)
  const setShowLoginModal = useStoreActions<GlobalStoreModel>((action) => action.setShowLoginModal)

  return (
    <Border>
      <PositiveButton onClick={() => setShowLoginModal(true)}>Login</PositiveButton>

      <BaseModal isOpen={showLoginModal}>
        <ModalBox>
          <Login setOpen={setShowLoginModal} />
        </ModalBox>
      </BaseModal>
    </Border>
  )
}

export default AdminLogin
