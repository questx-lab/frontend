import { useStoreActions } from 'easy-peasy'
import { signIn } from 'next-auth/react'

import { StorageConst } from '@/constants/storage.const'
import { handleMetamask } from '@/handler/auth/metamask'
import { GlobalStoreModel } from '@/store/store'
import { ImageBox, ListLogos } from '@/styles/login.style'

export default function AuthType() {
  const setLogin = useStoreActions<GlobalStoreModel>(
    (action) => action.setLogin
  )

  const handleLoginGoogle = async (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault()
    await signIn('google')
  }

  const handleSignInTwitter = async (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault()
    await signIn('twitter')
  }

  const handleSignInDiscord = async (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault()
    await signIn('discord')
  }

  return (
    <ListLogos>
      <ImageBox
        onClick={handleLoginGoogle}
        width={50}
        height={50}
        src={StorageConst.GOOGLE_DIR.src}
        alt={StorageConst.GOOGLE_DIR.alt}
      />
      <ImageBox
        onClick={handleSignInTwitter}
        width={50}
        height={50}
        src={StorageConst.TWITTER_DIR.src}
        alt={StorageConst.TWITTER_DIR.alt}
      />
      <ImageBox
        onClick={handleSignInDiscord}
        width={50}
        height={50}
        src={StorageConst.DISCORD_DIR.src}
        alt={StorageConst.DISCORD_DIR.alt}
      />
      <ImageBox
        onClick={() => handleMetamask(setLogin)}
        width={50}
        height={50}
        src={StorageConst.METAMASK_DIR.src}
        alt={StorageConst.METAMASK_DIR.alt}
      />
    </ListLogos>
  )
}
