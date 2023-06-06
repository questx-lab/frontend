import { FunctionComponent } from 'react'

import { useStoreState } from 'easy-peasy'
import tw from 'twin.macro'

import { ButtonSocialType, QuestTypeEnum, TwitterEnum } from '@/constants/common.const'
import { StorageConst } from '@/constants/storage.const'
import { handleLoginTwitter } from '@/handler/auth/twitter'
import QuestTwitterAction from '@/modules/quest/view-quest/twitter/action'
import { GlobalStoreModel } from '@/store/store'
import { QuestTwitterActionType } from '@/types'
import { QuestType } from '@/types/quest'
import { SocialButton } from '@/widgets/buttons/button-social'
import { Image } from '@/widgets/image'
import { VerticalBetween, VerticalCenter } from '@/widgets/orientation'
import { NormalText } from '@/widgets/text'

const FrameWithGap = tw(VerticalBetween)`
  w-full
  gap-6
`

const TwitterConnectFrame = tw(VerticalCenter)`
  w-full
  gap-3
`

const generateTweetLink = (defaultTweet: string): string => {
  return `https://twitter.com/compose/tweet?text=${defaultTweet}`
}

const generateRetweetLink = (status_link: string): string => {
  const status_id = status_link.split('/').at(-1)
  return `https://twitter.com/intent/retweet?tweet_id=${status_id}`
}

const generateReplyLink = (status_link: string, default_reply: string): string => {
  const status_id = status_link.split('/').at(-1)
  return `https://twitter.com/intent/tweet?in_reply_to=${status_id}&text=${default_reply}`
}

const getActions = (quest: QuestType): QuestTwitterActionType[] => {
  let actions: QuestTwitterActionType[] = []

  const { tweet_url, twitter_handle, default_reply, like, reply, retweet, default_tweet } =
    quest.validation_data

  switch (quest.type) {
    case QuestTypeEnum.TWITTER_TWEET:
      actions.push({
        link: generateTweetLink(default_tweet || ''),
        action: TwitterEnum.TWEET,
      })
      break
    case QuestTypeEnum.TWITTER_FOLLOW:
      actions.push({
        action: TwitterEnum.FOLLOW,
        link: twitter_handle || '',
      })
      break
    case QuestTypeEnum.TWITTER_JOIN_SPACE:
      actions.push({
        action: TwitterEnum.JOIN_SPACE,
        link: tweet_url ?? '',
      })
      break
    case QuestTypeEnum.TWITTER_REACTION:
      if (retweet) {
        actions.push({
          action: TwitterEnum.RETWEET,
          link: generateRetweetLink(tweet_url ?? ''),
        })
      }
      if (like) {
        actions.push({
          action: TwitterEnum.LIKE,
          link: tweet_url ?? '',
        })
      }
      if (reply) {
        actions.push({
          action: TwitterEnum.REPLY,
          link: generateReplyLink(tweet_url || '', default_reply || ''),
        })
      }
      break
  }

  return actions
}

const TwitterConnectBox: FunctionComponent = () => {
  const user = useStoreState<GlobalStoreModel>((state) => state.user)

  if (user.services?.twitter) {
    return <></>
  }

  return (
    <TwitterConnectFrame>
      <SocialButton btnType={ButtonSocialType.TWITTER} onClick={handleLoginTwitter}>
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

export const QuestTwitter: FunctionComponent<{
  quest: QuestType
}> = ({ quest }) => {
  const actions = getActions(quest)

  return (
    <FrameWithGap>
      <TwitterConnectBox />
      <QuestTwitterAction actions={actions} />
    </FrameWithGap>
  )
}
