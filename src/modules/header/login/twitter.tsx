import { FC } from 'react'

import { StorageConst } from '@/constants/storage.const'
import { handleLoginTwitter } from '@/handler/auth/twitter'
import { SocialBox } from '@/modules/header/login'
import { Image } from '@/widgets/image'

const TwitterLogin: FC = () => {
  return (
    <SocialBox onClick={handleLoginTwitter}>
      <Image
        width={40}
        height={40}
        src={StorageConst.TWITTER_DIR.src}
        alt={StorageConst.TWITTER_DIR.alt}
      />
      {'Log in with Twitter'}
    </SocialBox>
  )
}

export default TwitterLogin
