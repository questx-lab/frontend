import { FC } from 'react'

import { useStoreState } from 'easy-peasy'

import { AuthEnum } from '@/constants/common.const'
import { PaddingVertical, Title } from '@/modules/header/login'
import DiscordLogin from '@/modules/header/login/discord'
import GoogleLogin from '@/modules/header/login/google'
import MetaMaskLogin from '@/modules/header/login/metamask'
import TwitterLogin from '@/modules/header/login/twitter'
import { GlobalStoreModel } from '@/store/store'

const LoginBox: FC = () => {
  // data
  const authBox = useStoreState<GlobalStoreModel>((state) => state.authBox)
  let title = 'Log in to XQuest'
  if (authBox === AuthEnum.REGISTER) {
    title = 'Sign up'
  }

  return (
    <PaddingVertical>
      <Title>{title}</Title>

      <GoogleLogin />
      <TwitterLogin />
      <DiscordLogin />
      <MetaMaskLogin />
    </PaddingVertical>
  )
}

export default LoginBox
