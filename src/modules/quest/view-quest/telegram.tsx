import { FunctionComponent, useEffect } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { TLoginButton, TLoginButtonSize } from 'react-telegram-auth'
import tw from 'twin.macro'

import { getUserApi } from '@/api/user'
import { ButtonSocialType, ColorEnum } from '@/constants/common.const'
import { EnvVariables } from '@/constants/env.const'
import { StorageConst } from '@/constants/storage.const'
import { handleLinkTelegram } from '@/handler/auth/telegram'
import { ColorBox } from '@/modules/quest/view-quest/twitter/mini-widgets'
import ActiveQuestStore from '@/store/local/active-quest'
import { GlobalStoreModel } from '@/store/store'
import { setUserLocal } from '@/utils/helper'
import { QuestType, UserType } from '@/utils/type'
import { SocialButton } from '@/widgets/buttons/button-social'
import { Image } from '@/widgets/image'
import { HorizontalFullWidth, VerticalFullWidth } from '@/widgets/orientation'

const CenterHorizontal = tw(HorizontalFullWidth)`
  justify-center
`

const PaddingVertical = tw(VerticalFullWidth)`
  gap-6
`

const TelegramAction: FunctionComponent<{ link: string }> = ({ link }) => {
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)
  const setTelegramSubmit = ActiveQuestStore.useStoreActions((action) => action.setTelegramSubmit)
  const setUser = useStoreActions<GlobalStoreModel>((action) => action.setUser)

  useEffect(() => {
    setTelegramSubmit(false)
  }, [])

  const onCallback = async (data: any) => {
    try {
      const result = await handleLinkTelegram(data)
      if (result?.error) {
        toast.error(result.error)
      }

      if (result?.code === 0) {
        const user = await getUserApi()
        if (user.data) {
          setUserLocal(user.data)
          setUser(user.data)
        }
      }
    } catch (error) {}
  }

  if (user && user.services && !user.services.telegram) {
    return (
      <ColorBox boxColor={ColorEnum.WARNING}>
        {'You need to connect Twitter '}
        <TLoginButton
          buttonSize={TLoginButtonSize.Large}
          lang='en'
          requestAccess={'write'}
          botName={EnvVariables.TELEGRAM_BOT_NAME}
          onAuthCallback={onCallback}
          cornerRadius={10}
        />
      </ColorBox>
    )
  }

  return (
    <CenterHorizontal>
      <Link to={link} target='_blank'>
        <SocialButton onClick={() => setTelegramSubmit(true)} btnType={ButtonSocialType.TELEGRAM}>
          <Image
            width={30}
            height={30}
            src={StorageConst.TELEGRAM_DIR.src}
            alt={StorageConst.TELEGRAM_DIR.alt}
          />
          {'Join Telegram'}
        </SocialButton>
      </Link>
    </CenterHorizontal>
  )
}

const QuestTelegram: FunctionComponent<{ quest: QuestType }> = ({ quest }) => {
  return (
    <PaddingVertical>
      <TelegramAction link={quest.validation_data.group_link || ''} />
    </PaddingVertical>
  )
}

export default QuestTelegram
