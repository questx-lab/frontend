import { ButtonSocialType } from '@/constants/common.const'
import { GlobalStoreModel } from '@/store/store'
import { QuestTwitterActionType } from '@/utils/type'
import { SocialButton } from '@/widgets/buttons/button-social'
import { VerticalBetween, VerticalCenter } from '@/widgets/orientation'
import { Image } from '@/widgets/image'
import { useStoreState } from 'easy-peasy'
import { FunctionComponent } from 'react'
import tw from 'twin.macro'
import { StorageConst } from '@/constants/storage.const'
import { NormalText } from '@/widgets/text'
import { QuestTwitterAction } from '@/modules/quest/view-quest/twitter/action'

const FrameWithGap = tw(VerticalBetween)`
  w-full
  gap-6
`

const TwitterConnectFrame = tw(VerticalCenter)`
  w-full
  gap-3
`

export const QuestTwitter: FunctionComponent<{
  actions: QuestTwitterActionType[]
}> = ({ actions }) => {
  const onConnect = async () => {
    // signIn('twitter')
  }

  const user = useStoreState<GlobalStoreModel>((state) => state.user)

  const TwitterConnectBox: FunctionComponent = () => {
    if (user.services?.twitter) {
      return <></>
    }

    return (
      <TwitterConnectFrame>
        <SocialButton btnType={ButtonSocialType.TWITTER} onClick={onConnect}>
          <Image
            width={30}
            height={30}
            src={StorageConst.TWITTER_DIR.src}
            alt={StorageConst.TWITTER_DIR.alt}
          />
          {'Connect Twitter'}
        </SocialButton>
        <NormalText>{'You need to connect Twitter to access this quest'}</NormalText>
      </TwitterConnectFrame>
    )
  }

  return (
    <FrameWithGap>
      <TwitterConnectBox />
      <QuestTwitterAction actions={actions} />
    </FrameWithGap>
  )
}
