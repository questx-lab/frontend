import { FunctionComponent } from 'react'

import { useStoreState } from 'easy-peasy'
import parseHtml from 'html-react-parser'
import { Link } from 'react-router-dom'
import tw from 'twin.macro'

import { ButtonSocialType, ColorEnum } from '@/constants/common.const'
import { StorageConst } from '@/constants/storage.const'
import { handleLoginDiscord } from '@/handler/auth/discord'
import { SocialBox } from '@/modules/header/login'
import { CommonBox } from '@/modules/quest/view-quest/twitter/mini-widgets'
import { GlobalStoreModel } from '@/store/store'
import { QuestType, UserType } from '@/utils/type'
import { SocialButton } from '@/widgets/buttons/button-social'
import { Image } from '@/widgets/image'
import { HorizontalFullWidth, VerticalBetween } from '@/widgets/orientation'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

const PaddingVertical = tw(VerticalBetween)`
  w-full
  gap-6
`
const Html = tw.div`
  px-4
  text-gray-700
  font-normal
  text-lg
  max-lg:text-sm
  overflow-hidden
  text-ellipsis
  line-clamp-3
`
const DiscordAction: FunctionComponent<{ link: string }> = ({ link }) => {
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)

  if (user && user.services && !user.services.discord) {
    return (
      <CommonBox boxColor={ColorEnum.WARNING}>
        <HorizontalFullWidth>
          <ExclamationTriangleIcon className='w-7 h-7 text-warning' />
          {'You need to connect Discord'}
        </HorizontalFullWidth>
        <SocialBox onClick={() => handleLoginDiscord({})}>
          <Image
            width={30}
            height={30}
            src={StorageConst.DISCORD_DIR.src}
            alt={StorageConst.DISCORD_DIR.alt}
          />
          {'Connect Discord'}
        </SocialBox>
      </CommonBox>
    )
  }

  return (
    <Link to={link} target='_blank'>
      <SocialButton btnType={ButtonSocialType.DISCORD}>{'Go to Discord'}</SocialButton>
    </Link>
  )
}

export const QuestDiscord: FunctionComponent<{ quest: QuestType }> = ({ quest }) => {
  return (
    <PaddingVertical>
      <DiscordAction link={quest.validation_data.invite_link || ''} />
      <Html>{parseHtml(quest.description ?? '')}</Html>
    </PaddingVertical>
  )
}
