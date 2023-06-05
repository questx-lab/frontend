import { FunctionComponent } from 'react'

import parseHtml from 'html-react-parser'
import tw from 'twin.macro'

import { QuestTypeEnum } from '@/constants/common.const'
import { QuestDiscord } from '@/modules/quest/view-quest/discord'
import QuestImage from '@/modules/quest/view-quest/image'
import { QuestInvites } from '@/modules/quest/view-quest/invite'
import { QuestQuiz } from '@/modules/quest/view-quest/quiz'
import QuestReward from '@/modules/quest/view-quest/reward'
import QuestTelegram from '@/modules/quest/view-quest/telegram'
import { QuestText } from '@/modules/quest/view-quest/text'
import { QuestTwitter } from '@/modules/quest/view-quest/twitter'
import QuestUrl from '@/modules/quest/view-quest/url'
import { QuestVisitLink } from '@/modules/quest/view-quest/vist-link'
import { QuestType } from '@/types/quest'
import { Horizontal, Vertical, VerticalFullWidth } from '@/widgets/orientation'

const OuterPadding = tw(Horizontal)`
  w-full
  gap-5
  p-6
`

const ContextFrame = tw(Vertical)`
  gap-3
  text-lg
  font-bold
  text-black
  border
  border-solid
  border-gray-300
  rounded-lg
  w-2/3
  p-6
`

const ContentPadding = tw(VerticalFullWidth)`
  gap-3
`

const QuestContent: FunctionComponent<{ quest: QuestType }> = ({ quest }) => {
  const { quizzes } = quest.validation_data || {}

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
      return <QuestQuiz quizzes={quizzes!} />

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

const Index: FunctionComponent<{ quest: QuestType }> = ({ quest }) => {
  return (
    <OuterPadding>
      <ContextFrame>
        <ContentPadding>
          {parseHtml(quest.description ?? '')}
          <QuestContent quest={quest} />
        </ContentPadding>
      </ContextFrame>

      <QuestReward quest={quest} />
    </OuterPadding>
  )
}

export default Index
