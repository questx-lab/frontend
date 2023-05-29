import { ColorEnum, SizeEnum, TwitterEnum } from '@/constants/common.const'
import TwitterFollow from '@/modules/quest/view-quest/twitter/action-follow'
import TwitterReply from '@/modules/quest/view-quest/twitter/action-reply'
import TwitterTweet from '@/modules/quest/view-quest/twitter/action-tweet'
import { ActionTwitterFrame } from '@/modules/quest/view-quest/twitter/mini-widgets'
import { ActiveQuestStore } from '@/store/local/active-quest'
import { GlobalStoreModel } from '@/store/store'
import { QuestTwitterActionType } from '@/utils/type'
import { NegativeButton } from '@/widgets/buttons/button'
import {
  HorizontalStartCenter,
  VerticalFullWidth,
  VerticalFullWidthBetween,
  VerticalFullWidthCenter,
} from '@/widgets/orientation'
import { NormalText } from '@/widgets/text'
import {
  ArrowPathRoundedSquareIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'
import { useStoreState } from 'easy-peasy'
import { FunctionComponent, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

const VerticalAction = tw(VerticalFullWidthCenter)`
  gap-4
`

const WarningBox = styled(HorizontalStartCenter)<{ boxColor?: number }>(
  ({ boxColor = ColorEnum.NONE }) => {
    const style = [
      tw`
      w-full
      rounded-lg
      bg-white
      border
      border-solid
      border-gray-300
      p-3
      text-lg
      font-normal
      text-gray-700
      text-start
    `,
    ]

    switch (boxColor) {
      case ColorEnum.PRIMARY:
        style.push(tw`
        bg-primary-50
        border-primary
      `)
        break
      case ColorEnum.WARNING:
        style.push(tw`
        bg-warning-50
        border-warning
      `)
        break
      case ColorEnum.DANGER:
        style.push(tw`
        bg-danger-50
        border-danger
      `)
        break
    }

    return style
  }
)

export const QuestTwitterAction: FunctionComponent<{
  actions: QuestTwitterActionType[]
}> = ({ actions }) => {
  // hook
  const [warningRetweet, setWarningRetweet] = useState<boolean>(false)
  const [inputReply, setInputReply] = useState<boolean>(false)

  // data
  const user = useStoreState<GlobalStoreModel>((state) => state.user)

  const WarnigRetweetBox: FunctionComponent = () => {
    if (warningRetweet) {
      return (
        <WarningBox boxColor={ColorEnum.DANGER}>
          <ExclamationTriangleIcon className='w-7 h-7 text-danger' />
          {
            'Be sure to claim this quest right after your retweet, as we are only looking at your 50 last retweets'
          }
        </WarningBox>
      )
    }
    return <></>
  }

  if (!user.services?.twitter) {
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
        return (
          <Link to={action.link} target='_blank'>
            <ActionTwitterFrame>
              <HorizontalStartCenter>
                <HeartIcon className='h-7 w-7 text-info' />
                <NormalText>{'Like this post'}</NormalText>
              </HorizontalStartCenter>
              <NegativeButton block={!user.services?.twitter} width={SizeEnum.x32}>
                {action.action}
              </NegativeButton>
            </ActionTwitterFrame>
          </Link>
        )
      case TwitterEnum.REPLY:
        return (
          <TwitterReply action={action} inputReply={inputReply} setInputReply={setInputReply} />
        )
      case TwitterEnum.RETWEET:
        return (
          <div onClick={() => setWarningRetweet(true)}>
            <VerticalFullWidth>
              <Link to={action.link} target='_blank' className='w-full'>
                <ActionTwitterFrame>
                  <HorizontalStartCenter>
                    <ArrowPathRoundedSquareIcon className='h-7 w-7 text-info' />
                    <NormalText>{'Retweet this post'}</NormalText>
                  </HorizontalStartCenter>
                  <NegativeButton block={!user.services?.twitter} width={SizeEnum.x32}>
                    {action.action}
                  </NegativeButton>
                </ActionTwitterFrame>
              </Link>

              <WarnigRetweetBox />
            </VerticalFullWidth>
          </div>
        )
      default:
        return (
          <Link to={action.link} target='_blank'>
            <ActionTwitterFrame>
              <HorizontalStartCenter>
                <NormalText>{'join space'}</NormalText>
              </HorizontalStartCenter>
              <NegativeButton block={!user.services?.twitter} width={SizeEnum.x48}>
                {action.action}
              </NegativeButton>
            </ActionTwitterFrame>
          </Link>
        )
    }
  })

  return (
    <VerticalAction>
      <NormalText>{'To complete this challenge:'}</NormalText>
      <VerticalFullWidthBetween>{renderActions}</VerticalFullWidthBetween>
      <WarningBox boxColor={ColorEnum.WARNING}>
        <ExclamationCircleIcon className='w-7 h-7 text-warning' />
        {'After completion, it can take up to 10s before your claim succeeds.'}
      </WarningBox>
    </VerticalAction>
  )
}
