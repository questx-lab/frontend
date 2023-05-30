import { FunctionComponent } from 'react'

import { useStoreActions } from 'easy-peasy'
import toast from 'react-hot-toast'

import { AuthEnum } from '@/constants/common.const'
import { EnvVariables } from '@/constants/env.const'
import { StorageConst } from '@/constants/storage.const'
import { handleMetamask } from '@/handler/auth/metamask'
import { getTwitterOAuthUrl } from '@/handler/auth/twitter'
import { DesText, PaddingVertical, SocialBox, Title } from '@/modules/header/login'
import { GlobalStoreModel } from '@/store/store'
import { updateAccessToken } from '@/utils/storage'
import { Image } from '@/widgets/image'
import { PrimaryText } from '@/widgets/text'
import { useGoogleLogin } from '@react-oauth/google'

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
    <PaddingVertical>
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
      <SocialBox
        onClick={async () => {
          window.location.assign(
            await getTwitterOAuthUrl(EnvVariables.FRONTEND_URL + '/api/auth/callback/twitter')
          )
        }}
      >
        <Image
          width={40}
          height={40}
          src={StorageConst.TWITTER_DIR.src}
          alt={StorageConst.TWITTER_DIR.alt}
        />
        {'Log in with Twitter'}
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
        <PrimaryText isHover onClick={() => setAuthBox(AuthEnum.REGISTER)}>
          {'Sign up'}
        </PrimaryText>
      </DesText>
    </PaddingVertical>
  )
}

export default LoginBox
