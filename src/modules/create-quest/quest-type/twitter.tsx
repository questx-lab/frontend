'use client'

import { FunctionComponent } from 'react'

import { ActiveEnum, QuestTypeEnum, TwitterEnum } from '@/constants/common.const'
import { TypeButtonFrame } from '@/modules/create-quest/mini-widget'
import { Padding } from '@/modules/create-quest/quest-type/mini-widget'
import TwitterFollow from '@/modules/create-quest/quest-type/twitter-follow'
import TwitterJoinSpace from '@/modules/create-quest/quest-type/twitter-join-space'
import TwitterReaction from '@/modules/create-quest/quest-type/twitter-reaction'
import TwitterReply from '@/modules/create-quest/quest-type/twitter-reply'
import TwitterTweet from '@/modules/create-quest/quest-type/twitter-tweet'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { Divider } from '@/styles/common.style'
import { Label } from '@/widgets/text'
import styled from 'styled-components'
import tw from 'twin.macro'

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
  const setType = NewQuestStore.useStoreActions((actions) => actions.setType)

  const handleActive = (actionType: string) => {
    if (actionType === TwitterEnum.FOLLOW) {
      setType(QuestTypeEnum.TWITTER_FOLLOW)
    }

    if (actionType === TwitterEnum.TWEET) {
      setType(QuestTypeEnum.TWITTER_TWEET)
    }

    if (actionType === TwitterEnum.JOIN_SPACE) {
      setType(QuestTypeEnum.TWITTER_JOIN_SPACE)
    }

    if (
      actionType === TwitterEnum.LIKE ||
      actionType === TwitterEnum.REPLY ||
      actionType === TwitterEnum.RETWEET
    ) {
      setType(QuestTypeEnum.TWITTER_REACTION)
    }

    if (!actionTwitter.includes(actionType)) {
      setActionTwitter([...actionTwitter, actionType])
    } else {
      setActionTwitter(actionTwitter.filter((e) => e !== actionType))
    }
  }

  const listTwitterAction = Object.values(TwitterEnum).map((e, i) => {
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
      if (i !== 5) {
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
        key={i}
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
