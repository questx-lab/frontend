import { FC } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import parseHtml from 'html-react-parser'
import tw from 'twin.macro'

import { HorizontalFullWidthCenter } from '@/admin-portal/modules/referrals/mini-widget'
import { ColorEnum, QuestTypeEnum } from '@/constants/common.const'
import { QuestDiscord } from '@/modules/quest/view-quest/discord'
import QuestImage from '@/modules/quest/view-quest/image'
import { QuestInvites } from '@/modules/quest/view-quest/invite'
import { QuestQuiz } from '@/modules/quest/view-quest/quiz'
import QuestReward from '@/modules/quest/view-quest/reward'
import QuestTelegram from '@/modules/quest/view-quest/telegram'
import { QuestText } from '@/modules/quest/view-quest/text'
import { QuestTwitter } from '@/modules/quest/view-quest/twitter'
import { ColorBox } from '@/modules/quest/view-quest/twitter/mini-widgets'
import QuestUrl from '@/modules/quest/view-quest/url'
import { QuestVisitLink } from '@/modules/quest/view-quest/vist-link'
import { GlobalStoreModel } from '@/store/store'
import { canClaimQuest, QuestType } from '@/types/quest'
import { PositiveButton } from '@/widgets/buttons'
import {
  Horizontal,
  HorizontalBetweenCenterFullWidth,
  HorizontalCenter,
  Vertical,
  VerticalFullWidth,
} from '@/widgets/orientation'
import { TextBase } from '@/widgets/text'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

const OuterPadding = tw(Horizontal)`
  w-full
  gap-5
  p-5
  max-md:flex-col
`

const RelativeFrame = tw.div`
  relative
  w-[480px]
  max-sm:w-full
`

const ContextFrame = tw(Vertical)`
  gap-3
  text-lg
  font-bold
  text-black
  border
  border-solid
  border-gray-200
  rounded-lg
  w-full
  p-6
`

const BlockBox = tw(HorizontalCenter)`
  absolute
  items-start
  w-full
  h-full
  rounded-lg
  bg-[rgba(0, 0, 0, 0.5)]
  py-4
  px-6
`

const ContentPadding = tw(VerticalFullWidth)`
  gap-3
  max-h-[calc(100vh_-_360px)]
  overflow-y-scroll
`

const BlockContent: FC<{ quest: QuestType }> = ({ quest }) => {
  if (quest.unclaimable_reason === '') {
    return <></>
  }

  return (
    <BlockBox>
      <ColorBox boxColor={ColorEnum.DANGER}>
        <ExclamationTriangleIcon className='w-7 h-7 text-danger' />
        {quest.unclaimable_reason}
      </ColorBox>
    </BlockBox>
  )
}

const RequireLogin: FC = () => {
  const user = useStoreState<GlobalStoreModel>((state) => state.user)

  // action
  const setShowLoginModal = useStoreActions<GlobalStoreModel>((action) => action.setShowLoginModal)

  if (user) {
    return <></>
  }

  return (
    <HorizontalFullWidthCenter>
      <ColorBox boxColor={ColorEnum.DANGER}>
        <HorizontalBetweenCenterFullWidth>
          {'You need login to continue'}
          <PositiveButton onClick={() => setShowLoginModal(true)}>{'Login'}</PositiveButton>
        </HorizontalBetweenCenterFullWidth>
      </ColorBox>
    </HorizontalFullWidthCenter>
  )
}

const QuestContent: FC<{ quest: QuestType }> = ({ quest }) => {
  const { quizzes } = quest.validation_data || {}
  // data
  const user = useStoreState<GlobalStoreModel>((state) => state.user)
  const myCommunities = useStoreState<GlobalStoreModel>((state) => state.myCommunities)
  const canClaim = canClaimQuest(quest, myCommunities, user)

  switch (quest?.type) {
    case QuestTypeEnum.URL:
      return <QuestUrl />
    case QuestTypeEnum.IMAGE:
      return <QuestImage />
    case QuestTypeEnum.TEXT:
      return <QuestText />
    case QuestTypeEnum.VISIT_LINK:
      return <QuestVisitLink link={quest.validation_data.link || ''} />
    case QuestTypeEnum.INVITES:
      return <QuestInvites quest={quest} />
    case QuestTypeEnum.TWITTER_TWEET:
    case QuestTypeEnum.TWITTER_FOLLOW:
    case QuestTypeEnum.TWITTER_JOIN_SPACE:
    case QuestTypeEnum.TWITTER_REACTION:
      return <QuestTwitter quest={quest} />

    case QuestTypeEnum.QUIZ:
      return <QuestQuiz quizzes={quizzes!} canClaim={canClaim} />

    case QuestTypeEnum.EMPTY:
      return <></>
    case QuestTypeEnum.DISCORD:
      return <QuestDiscord quest={quest} />
    case QuestTypeEnum.JOIN_TELEGRAM:
      return <QuestTelegram quest={quest} />
    default:
      return <></>
  }
}

const Index: FC<{
  quest: QuestType
}> = ({ quest }) => {
  return (
    <OuterPadding>
      <RelativeFrame>
        <BlockContent quest={quest} />
        <ContextFrame>
          <RequireLogin />
          <ContentPadding>
            <TextBase>
              {quest.description === '' ? 'Not description' : parseHtml(quest.description)}
            </TextBase>
            <QuestContent quest={quest} />
          </ContentPadding>
        </ContextFrame>
      </RelativeFrame>
      <QuestReward quest={quest} />
    </OuterPadding>
  )
}

export default Index
