import { FC } from 'react'

import { useStoreState } from 'easy-peasy'

import { AuthEnum } from '@/constants/common.const'
import StorageConst from '@/constants/storage.const'
import { handleMetamask } from '@/handler/auth/metamask'
import { SocialBox } from '@/modules/header/login'
import { GlobalStoreModel } from '@/store/store'
import { Image } from '@/widgets/image'

const MetaMaskLogin: FC = () => {
  // data
  const authBox = useStoreState<GlobalStoreModel>((state) => state.authBox)
  let buttonText = 'Log in with Metamask'
  if (authBox === AuthEnum.REGISTER) {
    buttonText = 'Sign up with Metamask'
  }

  return (
    <SocialBox onClick={handleMetamask}>
      <Image
        width={40}
        height={40}
        src={StorageConst.METAMASK_DIR.src}
        alt={StorageConst.METAMASK_DIR.alt}
      />
      {buttonText}
    </SocialBox>
  )
}

export default MetaMaskLogin
