import { FunctionComponent, useState } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import { toast } from 'react-hot-toast'
import { MoonLoader } from 'react-spinners'
import styled from 'styled-components'
import tw from 'twin.macro'

import { getUserApi, updateUserApi } from '@/app/api/client/user'
import { AuthEnum } from '@/constants/common.const'
import { StorageConst } from '@/constants/storage.const'
import { handleMetamask } from '@/handler/auth/metamask'
import { FieldTitle } from '@/modules/create-quest/mini-widget'
import { GlobalStoreModel } from '@/store/store'
import { setUserLocal } from '@/utils/helper'
import { updateAccessToken } from '@/utils/storage'
import { UserType } from '@/utils/type'
import { TextField } from '@/widgets/form'
import { Image } from '@/widgets/image'
import { Horizontal, HorizontalCenter, Vertical } from '@/widgets/orientation'
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useGoogleLogin } from '@react-oauth/google'

const Wrap = styled(Dialog.Panel)(
  tw`
  w-[480px]
  max-sm:w-[335px]
  bg-white
  text-center
  align-middle
  overflow-hidden
  shadow-xl
  transition-all
  flex
  flex-col
  justify-start
  items-center
  rounded-lg
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

const BoxContent = tw(Vertical)`
  w-full
  justify-center
  items-center
  py-10
  px-16
  max-2xl:px-12
  gap-4
`

const Title = tw.span`
  text-2xl
  font-medium
  text-gray-900
  mb-4
`

const SocialBox = tw(Horizontal)`
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
`

const DesText = tw.p`
  mt-4
  flex
  justify-center
  items-center
  text-lg
  font-normal
  text-gray-700
  gap-2
`

const SignUpText = tw.span`
  cursor-pointer
  text-primary
`

const PolicyText = tw.p`
  my-4
  text-lg
  font-normal
  text-gray-500
  gap-2
`

const Label = tw.label`
  flex
  flex-row
  gap-2
  text-lg
  font-semibold
  text-gray-700
`

const FormBox = tw(Vertical)`
  w-full
  justify-center
  gap-4
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

const InfoBox = tw(Horizontal)`
  w-full
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

const HorBox = tw(Horizontal)`
  items-center
  w-full
  gap-3
`

const VerBox = tw(Vertical)`
  justify-center
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
`

const UserBox: FunctionComponent = () => {
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)

  return (
    <InfoBox>
      <HorBox>
        <Image width={50} height={50} src={'/images/dummy/5.svg'} alt={'avatar'} />
        <VerBox>
          <NameText>{`Sign in as ${user && user.name}`}</NameText>
          <EmailText>{user && user.name}</EmailText>
        </VerBox>
      </HorBox>
      <Image
        width={40}
        height={40}
        src={StorageConst.GOOGLE_DIR.src}
        alt={StorageConst.GOOGLE_DIR.alt}
      />
    </InfoBox>
  )
}

const RegisterForm: FunctionComponent<{
  setOpen: (value: boolean) => void
}> = ({ setOpen }) => {
  // hook
  const [loading, setLoading] = useState<boolean>(false)

  // data
  const username = useStoreState<GlobalStoreModel>((state) => state.username)

  // action
  const setUsername = useStoreActions<GlobalStoreModel>((action) => action.setUserName)
  const setUser = useStoreActions<GlobalStoreModel>((action) => action.setUser)

  // handler
  const handleSubmit = async () => {
    setLoading(true)
    try {
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

  const LoadingBtn: FunctionComponent = () => {
    if (loading) {
      return <MoonLoader color='#fff' loading speedMultiplier={0.8} size={25} />
    }

    return <>{'Sign up'}</>
  }

  return (
    <BoxContent>
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
      <PolicyText>
        {'By continuing, you agree to the'} <SignUpText>{'Terms of Service'}</SignUpText> &{' '}
        <SignUpText>{'Privacy policy'}</SignUpText>
      </PolicyText>
    </BoxContent>
  )
}

const RegisterBox: FunctionComponent = () => {
  // action
  const setAuthBox = useStoreActions<GlobalStoreModel>((action) => action.setAuthBox)

  return (
    <BoxContent>
      <Title>{'Create your XQuest account'}</Title>
      <SocialBox>
        <Image
          width={40}
          height={40}
          src={StorageConst.GOOGLE_DIR.src}
          alt={StorageConst.GOOGLE_DIR.alt}
        />
        {'Log in with Google'}
      </SocialBox>
      <SocialBox>
        <Image
          width={40}
          height={40}
          src={StorageConst.METAMASK_DIR.src}
          alt={StorageConst.METAMASK_DIR.alt}
        />
        {'Log in with MetaMask'}
      </SocialBox>
      <DesText>
        {'Already have an account?'}
        <SignUpText onClick={() => setAuthBox(AuthEnum.LOGIN)}>{'Login'}</SignUpText>
      </DesText>
      <PolicyText>
        {'By continuing, you agree to the'} <SignUpText>{'Terms of Service'}</SignUpText> &{' '}
        <SignUpText>{'Privacy policy'}</SignUpText>
      </PolicyText>
    </BoxContent>
  )
}

const LoginBox: FunctionComponent = () => {
  const setShowLoginModal = useStoreActions<GlobalStoreModel>((action) => action.setShowLoginModal)

  const handleLoginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      if (tokenResponse && tokenResponse.access_token) {
        const { value, error } = await updateAccessToken('google', tokenResponse.access_token)
        if (value) {
          // close the modal
          setShowLoginModal(false)
          // Reload current page
          window.location.reload()
        } else {
          if (error) {
            toast.error(error)
          }
        }
      }
    },
    onError: (errorResponse) => console.log(errorResponse),
  })

  // action
  const setAuthBox = useStoreActions<GlobalStoreModel>((action) => action.setAuthBox)

  return (
    <BoxContent>
      <Title>{'Log in to XQuest'}</Title>

      <SocialBox onClick={() => handleLoginGoogle()}>
        <Image
          width={40}
          height={40}
          src={StorageConst.GOOGLE_DIR.src}
          alt={StorageConst.GOOGLE_DIR.alt}
        />
        {'Log in with Google'}
      </SocialBox>

      <SocialBox onClick={() => handleMetamask()}>
        <Image
          width={40}
          height={40}
          src={StorageConst.METAMASK_DIR.src}
          alt={StorageConst.METAMASK_DIR.alt}
        />
        {'Log in with MetaMask'}
      </SocialBox>
      <DesText>
        {"Don't have an account?"}
        <SignUpText onClick={() => setAuthBox(AuthEnum.REGISTER)}>{'Sign up'}</SignUpText>
      </DesText>
    </BoxContent>
  )
}

const Login: FunctionComponent<{
  setOpen: (value: boolean) => void
}> = ({ setOpen }) => {
  // data
  const authBox = useStoreState<GlobalStoreModel>((state) => state.authBox)

  const Content: FunctionComponent = () => {
    switch (authBox) {
      case AuthEnum.LOGIN:
        return <LoginBox />
      case AuthEnum.REGISTER:
        return <RegisterBox />
      default:
        return <RegisterForm setOpen={setOpen} />
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
