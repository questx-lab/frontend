import { FC } from 'react'

import { StorageConst } from '@/constants/storage.const'
import { handleLoginDiscord } from '@/handler/auth/discord'
import { SocialBox } from '@/modules/header/login'
import { Image } from '@/widgets/image'

const DiscordLogin: FC = () => {
  return (
    <SocialBox onClick={() => handleLoginDiscord({ joinCommunity: false })}>
      <Image
        width={40}
        height={40}
        src={StorageConst.DISCORD_DIR.src}
        alt={StorageConst.DISCORD_DIR.alt}
      />
      {'Log in with Discord'}
    </SocialBox>
  )
}

export default DiscordLogin
