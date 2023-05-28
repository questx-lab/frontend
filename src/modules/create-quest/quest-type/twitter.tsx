'use client'

import { FunctionComponent } from 'react'

import { ActiveEnum, QuestTypeEnum, TwitterEnum } from '@/constants/common.const'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { Divider, Gap } from '@/styles/common.style'
import { MulInputBox } from '@/styles/input.style'
import { TextField } from '@/widgets/form'
import { Label, SmallText } from '@/widgets/text'
import styled from 'styled-components'
import tw from 'twin.macro'
import { QuestFieldsBox, TypeButtonFrame } from '@/modules/create-quest/mini-widget'
import { VerticalFullWidth } from '@/widgets/orientation'

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

const Padding = tw(VerticalFullWidth)`
  py-2
  px-6
  gap-4
`

const TwitterList: FunctionComponent = () => {
  // Data
  const actionTwitter = NewQuestStore.useStoreState((state) => state.actionTwitter)
  const accountUrl = NewQuestStore.useStoreState((state) => state.accountUrl)
  const tweetUrl = NewQuestStore.useStoreState((state) => state.tweetUrl)
  const spaceUrlTw = NewQuestStore.useStoreState((state) => state.spaceUrlTw)

  // Action
  const setActionTwitter = NewQuestStore.useStoreActions((actions) => actions.setActionTwitter)
  const setAccountLink = NewQuestStore.useStoreActions((actions) => actions.setAccountLink)
  const setTweetUrl = NewQuestStore.useStoreActions((actions) => actions.setTweetUrl)
  const setReplyTwitter = NewQuestStore.useStoreActions((actions) => actions.setReplyTwitter)
  const setContentTwitter = NewQuestStore.useStoreActions((actions) => actions.setContentTwitter)
  const setTwitterType = NewQuestStore.useStoreActions((actions) => actions.setTwitterType)
  const setSpaceUrl = NewQuestStore.useStoreActions((actions) => actions.setSpaceUrl)

  const handleActive = (actionType: string) => {
    if (actionType === TwitterEnum.FOLLOW) {
      setTwitterType(QuestTypeEnum.TWITTER_FOLLOW)
    }

    if (actionType === TwitterEnum.TWEET) {
      setTwitterType(QuestTypeEnum.TWITTER_TWEET)
    }

    if (actionType === TwitterEnum.JOIN_SPACE) {
      setTwitterType(QuestTypeEnum.TWITTER_JOIN_SPACE)
    }

    if (
      actionType === TwitterEnum.LIKE ||
      actionType === TwitterEnum.REPLY ||
      actionType === TwitterEnum.RETWEET
    ) {
      setTwitterType(QuestTypeEnum.TWITTER_REACTION)
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
      {actionTwitter.includes(TwitterEnum.FOLLOW) && (
        <>
          <Divider />
          <Padding>
            <Label>{'ACCOUNT URL'}</Label>
            <TextField
              onChange={(e) => setAccountLink(e.target.value)}
              placeholder='https://twitter.com/elon.musk'
              value={accountUrl}
              required
              errorMsg='This field is required'
            />
          </Padding>
        </>
      )}
      {(actionTwitter.includes(TwitterEnum.LIKE) ||
        actionTwitter.includes(TwitterEnum.REPLY) ||
        actionTwitter.includes(TwitterEnum.RETWEET)) && (
        <>
          <Divider />
          <Padding>
            <Label>{'TWEET URL'}</Label>
            <TextField
              onChange={(e) => setTweetUrl(e.target.value)}
              placeholder='https://twitter.com/abc'
              value={tweetUrl}
              required
              errorMsg='This field is required'
            />
            <Gap height={3} />
            <SmallText>{'Post to like/reply/retweet'}</SmallText>
          </Padding>
        </>
      )}
      {actionTwitter.includes(TwitterEnum.REPLY) && (
        <>
          <Divider />
          <Padding>
            <Label>{'DEFAULT REPLY'}</Label>
            <MulInputBox
              onChange={(e) => setReplyTwitter(e.target.value)}
              rows={3}
              placeholder='Check this out @mantanetworl, @dzucle, @yugih, so cool!'
            />
            <Gap height={3} />
            <SmallText>{'We will prepare a pre-filled reply for the users'}</SmallText>
          </Padding>
        </>
      )}
      {actionTwitter.includes(TwitterEnum.TWEET) && (
        <>
          <Divider />
          <Padding>
            <Label>{'TWEET CONTENT'}</Label>
            <MulInputBox
              onChange={(e) => setContentTwitter(e.target.value)}
              rows={3}
              placeholder='Check this out @mantanetworl, @dzucle, @yugih, so cool!'
            />
          </Padding>
        </>
      )}
      {actionTwitter.includes(TwitterEnum.JOIN_SPACE) && (
        <>
          <Divider />
          <Padding>
            <Label>{'SPACE URL'}</Label>
            <TextField
              onChange={(e) => setSpaceUrl(e.target.value)}
              placeholder='Empty'
              value={spaceUrlTw}
              required
              errorMsg='This field is required'
            />
          </Padding>
        </>
      )}
    </>
  )
}

export default TwitterList
