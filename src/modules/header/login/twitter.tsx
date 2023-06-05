import { FC } from 'react'

import { useStoreState } from 'easy-peasy'

import { AuthEnum } from '@/constants/common.const'
import { StorageConst } from '@/constants/storage.const'
import { handleLoginTwitter } from '@/handler/auth/twitter'
import { SocialBox } from '@/modules/header/login'
import { GlobalStoreModel } from '@/store/store'
import { Image } from '@/widgets/image'

const TwitterLogin: FC = () => {
  // data
  const authBox = useStoreState<GlobalStoreModel>((state) => state.authBox)
  let buttonText = 'Log in with Twitter'
  if (authBox === AuthEnum.REGISTER) {
    buttonText = 'Sign up with Twitter'
  }

  return (
    <SocialBox onClick={handleLoginTwitter}>
      <Image
        width={40}
        height={40}
        src={StorageConst.TWITTER_DIR.src}
        alt={StorageConst.TWITTER_DIR.alt}
      />
      {buttonText}
    </SocialBox>
  )
}

export default TwitterLogin
