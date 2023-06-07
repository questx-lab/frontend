import { FunctionComponent, useState } from 'react'

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
  gap-4
`

const QuestTwitterAction: FunctionComponent<{
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
        return <TwitterFollow action={action} />
      case TwitterEnum.TWEET:
        return (
          <TwitterTweet action={action} inputReply={inputReply} setInputReply={setInputReply} />
        )
      case TwitterEnum.LIKE:
        return <TwitterLike action={action} />
      case TwitterEnum.REPLY:
        return (
          <TwitterReply action={action} inputReply={inputReply} setInputReply={setInputReply} />
        )
      case TwitterEnum.RETWEET:
        return <TwitterRetweet action={action} />
      case TwitterEnum.JOIN_SPACE:
        return <TwitterJoinSpace action={action} />
      default:
        return <></>
    }
  })

  return (
    <VerticalAction>
      <FullWidthHeight>
        <TwitterTweetEmbed tweetId={(actions.length > 0 && actions[0]?.tweetId) || ''} />
      </FullWidthHeight>
      <NormalText>{'To complete this challenge:'}</NormalText>

      <VerticalFullWidthBetween>{renderActions}</VerticalFullWidthBetween>
      <ColorBox boxColor={ColorEnum.WARNING}>
        <ExclamationCircleIcon className='w-7 h-7 text-warning' />
        {'After completion, it can take up to 10s before your claim succeeds.'}
      </ColorBox>
    </VerticalAction>
  )
}

export default QuestTwitterAction
