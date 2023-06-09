import { FC } from 'react'

import { useStoreState } from 'easy-peasy'

import { AuthEnum } from '@/constants/common.const'
import StorageConst from '@/constants/storage.const'
import { handleLoginDiscord } from '@/handler/auth/discord'
import { SocialBox } from '@/modules/header/login'
import { GlobalStoreModel } from '@/store/store'
import { Image } from '@/widgets/image'

const DiscordLogin: FC = () => {
  // data
  const authBox = useStoreState<GlobalStoreModel>((state) => state.authBox)
  let buttonText = 'Log in with Discord'
  if (authBox === AuthEnum.REGISTER) {
    buttonText = 'Sign up with Discord'
  }

  return (
    <SocialBox onClick={() => handleLoginDiscord({ joinCommunity: false })}>
      <Image
        width={40}
        height={40}
        src={StorageConst.DISCORD_DIR.src}
        alt={StorageConst.DISCORD_DIR.alt}
      />
      {buttonText}
    </SocialBox>
  )
}

export default DiscordLogin
