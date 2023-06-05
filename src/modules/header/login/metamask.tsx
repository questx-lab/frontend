import { FC } from 'react'

import { StorageConst } from '@/constants/storage.const'
import { handleMetamask } from '@/handler/auth/metamask'
import { SocialBox } from '@/modules/header/login'
import { Image } from '@/widgets/image'

const MetaMaskLogin: FC = () => {
  return (
    <SocialBox onClick={handleMetamask}>
      <Image
        width={40}
        height={40}
        src={StorageConst.METAMASK_DIR.src}
        alt={StorageConst.METAMASK_DIR.alt}
      />
      {'Log in with MetaMask'}
    </SocialBox>
  )
}

export default MetaMaskLogin
