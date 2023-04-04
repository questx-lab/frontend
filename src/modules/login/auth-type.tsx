import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { EnvVariables } from '@/constants/env.const'
import { StorageConst } from '@/constants/storage.const'
import { handleMetamask } from '@/handler/auth/metamask'
import { useStoreActions } from '@/store/store'
import { ImageBox, ListLogos } from '@/styles/login.style'

export default function AuthType() {
  const router = useRouter()
  const actionLogin = useStoreActions(
    (action) => action.userSession.updateState
  )

  const handleLoginGoogle = () => {
    try {
      actionLogin(true)
      router.push(
        EnvVariables.NEXT_PUBLIC_API_URL + '/oauth2/login?type=google'
      )
    } catch (error) {
      toast.error('Error while login')
    }
  }

  const handleSignInTwitter = async (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault()
    await signIn('discord')
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
        onClick={() => handleMetamask(actionLogin)}
        width={50}
        height={50}
        src={StorageConst.METAMASK_DIR.src}
        alt={StorageConst.METAMASK_DIR.alt}
      />
    </ListLogos>
  )
}
