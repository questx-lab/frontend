import { QuestTypeEnum } from '@/constants/common.const'
import QuestImage from '@/modules/quest/view-quest/image'
import QuestReward from '@/modules/quest/view-quest/reward'
import { QuestText } from '@/modules/quest/view-quest/text'
import QuestUrl from '@/modules/quest/view-quest/url'
import { QuestVisitLink } from '@/modules/quest/view-quest/vist-link'
import { QuestType } from '@/utils/type'
import { Horizontal, Vertical, VerticalFullWidth } from '@/widgets/orientation'
import parseHtml from 'html-react-parser'
import { FunctionComponent } from 'react'
import tw from 'twin.macro'

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
      // return <QuestInvites link={generateInviteLink(inviteCode) || ''} />
      return <></>

    // case QuestTypeEnum.QUIZ:
    //   return withQuizzes()

    case QuestTypeEnum.TWITTER_TWEET:
      // return (
      //   <QuestTwitter
      //     actions={[
      //       {
      //         link: generateTweetLink(default_tweet || ''),
      //         action: TwitterEnum.TWEET,
      //       },
      //     ]}
      //   />
      // )
      return <></>
    case QuestTypeEnum.TWITTER_FOLLOW:
      // return (
      //   <QuestTwitter
      //     actions={[
      //       {
      //         action: TwitterEnum.FOLLOW,
      //         link: twitter_handle || '',
      //       },
      //     ]}
      //   />
      // )
      return <></>

    case QuestTypeEnum.TWITTER_JOIN_SPACE:
      // return (
      //   <QuestTwitter
      //     actions={[
      //       {
      //         action: TwitterEnum.JOIN_SPACE,
      //         link: tweet_url ?? '',
      //       },
      //     ]}
      //   />
      // )
      return <></>
    case QuestTypeEnum.TWITTER_REACTION:
      // let actions: QuestTwitterActionType[] = []
      // if (retweet) {
      //   actions.push({
      //     action: TwitterEnum.RETWEET,
      //     link: generateRetweetLink(tweet_url ?? ''),
      //   })
      // }
      // if (like) {
      //   actions.push({
      //     action: TwitterEnum.LIKE,
      //     link: tweet_url ?? '',
      //   })
      // }
      // if (reply) {
      //   actions.push({
      //     action: TwitterEnum.REPLY,
      //     link: generateReplyLink(tweet_url || '', default_reply || ''),
      //   })
      // }

      // return <QuestTwitter actions={actions} />
      return <></>
    case QuestTypeEnum.QUIZ:
      // return <QuestQuiz quizzes={quizzes!} />
      return <></>
    case QuestTypeEnum.EMPTY:
      return <></>
    // case (QuestTypeEnum.TEXT, QuestTypeEnum.IMAGE, QuestTypeEnum.URL):
    //   return withText()
    case QuestTypeEnum.DISCORD:
      // return <QuestDiscord link={invite_url || ''} />
      return <></>
    case QuestTypeEnum.JOIN_TELEGRAM:
      // return <QuestTelegram link={invite_url || ''} />
      return <></>
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
