'use client'

import { FunctionComponent } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import { ActiveEnum, QuestTypeEnum, TwitterEnum } from '@/constants/common.const'
import { Padding } from '@/modules/create-quest/quest-type/mini-widget'
import TwitterFollow from '@/modules/create-quest/quest-type/twitter-follow'
import TwitterJoinSpace from '@/modules/create-quest/quest-type/twitter-join-space'
import TwitterReaction from '@/modules/create-quest/quest-type/twitter-reaction'
import TwitterReply from '@/modules/create-quest/quest-type/twitter-reply'
import TwitterTweet from '@/modules/create-quest/quest-type/twitter-tweet'
import NewQuestStore from '@/store/local/new-quest.store'
import { Divider } from '@/styles/common.style'
import { Label } from '@/widgets/text'

const TypeButtonFrame = tw.div`
  flex
  flex-wrap
  justify-start
  items-center
  w-full
`

// TODO: Check creating twitter quest when backend is fixed.
const TwitterBox = styled.div<{ activeType: number }>(({ activeType }) => {
  switch (activeType) {
    case ActiveEnum.ACTIVE:
      return tw`
        py-1
        px-3
        bg-primary-100
        border-solid
        border-[1px]
        border-primary-100
        rounded-lg
        cursor-pointer
        mr-2
        mt-2
        text-sm
        text-primary-500
        font-normal
      `
    case ActiveEnum.BLOCK:
      return tw`
        py-1
        px-3
        border-solid
        border-[1px]
        border-gray-200
        rounded-lg
        bg-white
        cursor-not-allowed
        mr-2
        mt-2
        text-sm
        text-gray-400
        font-normal
      `
    default:
      return tw`
        py-1
        px-3
        border-solid
        border-[1px]
        border-gray-200
        rounded-lg
        bg-white
        cursor-pointer
        mr-2
        mt-2
        text-sm
        text-black
        font-normal
      `
  }
})

const TwitterList: FunctionComponent = () => {
  // Data
  const actionTwitter = NewQuestStore.useStoreState((state) => state.actionTwitter)

  // Action
  const setActionTwitter = NewQuestStore.useStoreActions((actions) => actions.setActionTwitter)
  const setTwitterType = NewQuestStore.useStoreActions((actions) => actions.setTwitterType)

  const handleActive = (action: string) => {
    if (action === TwitterEnum.FOLLOW) {
      setTwitterType(QuestTypeEnum.TWITTER_FOLLOW)
    }

    if (action === TwitterEnum.TWEET) {
      setTwitterType(QuestTypeEnum.TWITTER_TWEET)
    }

    if (action === TwitterEnum.JOIN_SPACE) {
      setTwitterType(QuestTypeEnum.TWITTER_JOIN_SPACE)
    }

    if (
      action === TwitterEnum.LIKE ||
      action === TwitterEnum.REPLY ||
      action === TwitterEnum.RETWEET
    ) {
      setTwitterType(QuestTypeEnum.TWITTER_REACTION)
    }

    if (!actionTwitter.includes(action)) {
      setActionTwitter([...actionTwitter, action])
    } else {
      setActionTwitter(actionTwitter.filter((e) => e !== action))
    }
  }

  const listTwitterAction = Object.values(TwitterEnum).map((e, index) => {
    let block = false

    if (actionTwitter.includes(TwitterEnum.FOLLOW)) {
      if (e !== TwitterEnum.FOLLOW) {
        block = true
      } else {
        block = false
      }
    }

    if (actionTwitter.includes(TwitterEnum.TWEET)) {
      if (e !== TwitterEnum.TWEET) {
        block = true
      } else {
        block = false
      }
    }

    if (actionTwitter.includes(TwitterEnum.JOIN_SPACE)) {
      if (e !== TwitterEnum.JOIN_SPACE) {
        block = true
      } else {
        block = false
      }
    }

    if (
      actionTwitter.includes(TwitterEnum.LIKE) ||
      actionTwitter.includes(TwitterEnum.REPLY) ||
      actionTwitter.includes(TwitterEnum.RETWEET)
    ) {
      if (e !== TwitterEnum.LIKE && e !== TwitterEnum.REPLY && e !== TwitterEnum.RETWEET) {
        block = true
      } else {
        block = false
      }
    }

    let activeType = ActiveEnum.NONE

    if (block) {
      activeType = ActiveEnum.BLOCK
    }

    if (actionTwitter.includes(e)) {
      activeType = ActiveEnum.ACTIVE
    }

    return (
      <TwitterBox
        activeType={activeType}
        key={index}
        onClick={block ? undefined : () => handleActive(e)}
      >
        {e}
      </TwitterBox>
    )
  })

  return (
    <>
      <Divider />
      <Padding>
        <Label>{'ACTION'}</Label>
        <TypeButtonFrame>{listTwitterAction}</TypeButtonFrame>
      </Padding>

      <TwitterFollow />
      <TwitterReaction />
      <TwitterReply />
      <TwitterTweet />
      <TwitterJoinSpace />
    </>
  )
}

export default TwitterList
