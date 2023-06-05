import { FC } from 'react'

import { useStoreActions } from 'easy-peasy'
import toast from 'react-hot-toast'

import { StorageConst } from '@/constants/storage.const'
import { SocialBox } from '@/modules/header/login'
import { GlobalStoreModel } from '@/store/store'
import { updateAccessToken } from '@/utils/storage'
import { Image } from '@/widgets/image'
import { useGoogleLogin } from '@react-oauth/google'

const GoogleLogin: FC = () => {
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

  return (
    <SocialBox onClick={() => handleLoginGoogle()}>
      <Image
        width={40}
        height={40}
        src={StorageConst.GOOGLE_DIR.src}
        alt={StorageConst.GOOGLE_DIR.alt}
      />
      {'Log in with Google'}
    </SocialBox>
  )
}

export default GoogleLogin
