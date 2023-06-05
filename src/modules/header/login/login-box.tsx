import { FunctionComponent } from 'react'

import { useStoreActions } from 'easy-peasy'

import { AuthEnum } from '@/constants/common.const'
import { Description, PaddingVertical, Title } from '@/modules/header/login'
import DiscordLogin from '@/modules/header/login/discord'
import GoogleLogin from '@/modules/header/login/google'
import MetaMaskLogin from '@/modules/header/login/metamask'
import TwitterLogin from '@/modules/header/login/twitter'
import { GlobalStoreModel } from '@/store/store'
import { PrimaryText } from '@/widgets/text'

const LoginBox: FunctionComponent = () => {
  // action
  const setAuthBox = useStoreActions<GlobalStoreModel>((action) => action.setAuthBox)

  return (
    <PaddingVertical>
      <Title>{'Log in to XQuest'}</Title>

      <GoogleLogin />
      <TwitterLogin />
      <DiscordLogin />
      <MetaMaskLogin />
      <Description>
        {"Don't have an account?"}
        <PrimaryText isHover onClick={() => setAuthBox(AuthEnum.REGISTER)}>
          {'Sign up'}
        </PrimaryText>
      </Description>
    </PaddingVertical>
  )
}

export default LoginBox
