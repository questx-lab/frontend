import { FC } from 'react'

import { useStoreState } from 'easy-peasy'
import styled from 'styled-components'
import tw from 'twin.macro'

import { AuthEnum } from '@/constants/common.const'
import ChooseUserName from '@/modules/header/login/choose-username'
import LoginBox from '@/modules/header/login/login-box'
import AccountSettingsStore from '@/store/local/account-settings'
import { GlobalStoreModel } from '@/store/store'
import { Horizontal, HorizontalCenter, Vertical } from '@/widgets/orientation'
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

const Wrap = styled(Dialog.Panel)(
  tw`
  w-[480px]
  max-sm:w-[335px]
  bg-white
  text-center
  align-middle
  overflow-hidden
  shadow-lg
  transition-all
  flex
  flex-col
  justify-start
  items-center
  rounded-lg
  max-h-full
  overflow-y-scroll
  `
)

const Header = tw(Horizontal)`
  w-full
  justify-end
  items-center
  px-4
  py-3
  text-2xl
  font-normal
  text-black
  border
  border-solid
  border-gray-200
`

export const PaddingVertical = tw(Vertical)`
  w-full
  justify-center
  items-center
  py-10
  px-16
  max-2xl:px-12
  gap-4
`

export const Title = tw.span`
  text-2xl
  font-medium
  text-gray-900
  mb-4
`

export const SocialBox = tw(Horizontal)`
  w-full
  justify-center
  items-center
  gap-3
  border
  border-solid
  border-gray-300
  rounded-lg
  cursor-pointer
  text-lg
  font-medium
  text-gray-900
  py-2
  hover:bg-gray-100
  bg-white
`

export const Description = tw.div`
  mt-4
  flex
  justify-center
  items-center
  text-lg
  font-normal
  text-gray-700
  gap-2
`

export const PolicyText = tw(HorizontalCenter)`
  flex-wrap
  my-4
  text-lg
  font-normal
  text-gray-500
  gap-2
`

const Login: FC<{
  setOpen: (value: boolean) => void
}> = ({ setOpen }) => {
  // data
  const authBox = useStoreState<GlobalStoreModel>((state) => state.authBox)

  const Content: FC = () => {
    switch (authBox) {
      case AuthEnum.LOGIN:
      case AuthEnum.REGISTER:
        return <LoginBox />
      case AuthEnum.CHOOSE_USERNAME:
        return (
          <AccountSettingsStore.Provider>
            <ChooseUserName setOpen={setOpen} />
          </AccountSettingsStore.Provider>
        )
      default:
        return <></>
    }
  }

  return (
    <Wrap>
      <Header>
        <XMarkIcon onClick={() => setOpen(false)} className='w-7 h-7 cursor-pointer' />
      </Header>
      <Content />
    </Wrap>
  )
}

export default Login
