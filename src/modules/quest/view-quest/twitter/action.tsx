import { FC, useState } from 'react'

import { useStoreState } from 'easy-peasy'
import { TwitterTweetEmbed } from 'react-twitter-embed'
import tw from 'twin.macro'

import { ColorEnum, TwitterEnum } from '@/constants/common.const'
import TwitterFollow from '@/modules/quest/view-quest/twitter/action-follow'
import TwitterJoinSpace from '@/modules/quest/view-quest/twitter/action-join-space'
import TwitterLike from '@/modules/quest/view-quest/twitter/action-like'
import TwitterReply from '@/modules/quest/view-quest/twitter/action-reply'
import TwitterRetweet from '@/modules/quest/view-quest/twitter/action-retweet'
import TwitterTweet from '@/modules/quest/view-quest/twitter/action-tweet'
import { ColorBox } from '@/modules/quest/view-quest/twitter/mini-widgets'
import { GlobalStoreModel } from '@/store/store'
import { QuestTwitterActionType } from '@/types'
import {
  FullWidthHeight,
  VerticalFullWidthBetween,
  VerticalFullWidthCenter,
} from '@/widgets/orientation'
import { NormalText } from '@/widgets/text'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'

const VerticalAction = tw(VerticalFullWidthCenter)`
  gap-6
`

const TwitterEmbed: FC<{ actions: QuestTwitterActionType[] }> = ({ actions }) => {
  if (actions.length === 0) {
    return <></>
  }

  const twitterId = actions[0]?.tweetId || ''
  if (twitterId === '') {
    return <></>
  }

  return (
    <FullWidthHeight>
      <TwitterTweetEmbed tweetId={twitterId} />
    </FullWidthHeight>
  )
}

const QuestTwitterAction: FC<{
  actions: QuestTwitterActionType[]
}> = ({ actions }) => {
  // hook
  const [inputReply, setInputReply] = useState<boolean>(false)

  // data
  const user = useStoreState<GlobalStoreModel>((state) => state.user)

  if (user && user.services && !user.services?.twitter) {
    return <></>
  }

  const renderActions = actions.map((action) => {
    switch (action.action) {
      case TwitterEnum.FOLLOW:
        return <TwitterFollow key={action.action} action={action} />
      case TwitterEnum.TWEET:
        return (
          <TwitterTweet
            key={action.action}
            action={action}
            inputReply={inputReply}
            setInputReply={setInputReply}
          />
        )
      case TwitterEnum.LIKE:
        return <TwitterLike key={action.action} action={action} />
      case TwitterEnum.REPLY:
        return (
          <TwitterReply
            key={action.action}
            action={action}
            inputReply={inputReply}
            setInputReply={setInputReply}
          />
        )
      case TwitterEnum.RETWEET:
        return <TwitterRetweet key={action.action} action={action} />
      case TwitterEnum.JOIN_SPACE:
        return <TwitterJoinSpace key={action.action} action={action} />
      default:
        return <></>
    }
  })

  return (
    <VerticalAction>
      <TwitterEmbed actions={actions} />
      <NormalText>{'To complete this challenge:'}</NormalText>
      <VerticalFullWidthBetween>{renderActions}</VerticalFullWidthBetween>
      <ColorBox boxColor={ColorEnum.WARNING}>
        <ExclamationCircleIcon className='w-10 h-10 text-warning' />
        {'After completion, it can take up to 10s before your claim succeeds.'}
      </ColorBox>
    </VerticalAction>
  )
}

export default QuestTwitterAction
