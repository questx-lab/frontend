'use client'

import { FunctionComponent } from 'react'

import {
  ActiveEnum,
  QuestTypeEnum,
  TwitterEnum,
} from '@/constants/common.const'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { Divider, Gap } from '@/styles/common.style'
import { MulInputBox } from '@/styles/input.style'
import {
  ITypeBox,
  LabelDes,
  PICard,
  TwitterBox,
} from '@/styles/questboard.style'
import { TextField } from '@/widgets/form'
import { Label } from '@/widgets/text'

const TwitterList: FunctionComponent = () => {
  // Data
  const actionTwitter = NewQuestStore.useStoreState(
    (state) => state.actionTwitter
  )
  const accountUrl = NewQuestStore.useStoreState((state) => state.accountUrl)
  const tweetUrl = NewQuestStore.useStoreState((state) => state.tweetUrl)
  const spaceUrlTw = NewQuestStore.useStoreState((state) => state.spaceUrlTw)

  // Action
  const setActionTwitter = NewQuestStore.useStoreActions(
    (actions) => actions.setActionTwitter
  )
  const setAccountLink = NewQuestStore.useStoreActions(
    (actions) => actions.setAccountLink
  )
  const setTweetUrl = NewQuestStore.useStoreActions(
    (actions) => actions.setTweetUrl
  )
  const setReplyTwitter = NewQuestStore.useStoreActions(
    (actions) => actions.setReplyTwitter
  )
  const setContentTwitter = NewQuestStore.useStoreActions(
    (actions) => actions.setContentTwitter
  )
  const setTwitterType = NewQuestStore.useStoreActions(
    (actions) => actions.setTwitterType
  )
  const setSpaceUrl = NewQuestStore.useStoreActions(
    (actions) => actions.setSpaceUrl
  )

  const handleActive = (i: string) => {
    if (i === TwitterEnum.FOLLOW) {
      setTwitterType(QuestTypeEnum.TWITTER_FOLLOW)
    }

    if (i === TwitterEnum.TWEET) {
      setTwitterType(QuestTypeEnum.TWITTER_TWEET)
    }

    if (i === TwitterEnum.JOIN_SPACE) {
      setTwitterType(QuestTypeEnum.TWITTER_JOIN_SPACE)
    }

    if (
      i === TwitterEnum.LIKE ||
      i === TwitterEnum.REPLY ||
      i === TwitterEnum.RETWEET
    ) {
      setTwitterType(QuestTypeEnum.TWITTER_REACTION)
    }

    if (!actionTwitter.includes(i)) {
      setActionTwitter([...actionTwitter, i])
    } else {
      setActionTwitter(actionTwitter.filter((e) => e !== i))
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
      if (
        e !== TwitterEnum.LIKE &&
        e !== TwitterEnum.REPLY &&
        e !== TwitterEnum.RETWEET
      ) {
        block = true
      } else {
        block = false
      }
    }

    let active = ActiveEnum.NONE

    if (block) {
      active = ActiveEnum.BLOCK
    }

    if (actionTwitter.includes(e)) {
      active = ActiveEnum.ACTIVE
    }

    return (
      <TwitterBox
        active={active}
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
      <PICard>
        <Label>{'ACTION'}</Label>
        <ITypeBox>{listTwitterAction}</ITypeBox>
      </PICard>
      {actionTwitter.includes(TwitterEnum.FOLLOW) && (
        <>
          <Divider />
          <PICard>
            <Label>{'ACCOUNT URL'}</Label>
            <TextField
              onChange={(e) => setAccountLink(e.target.value)}
              placeholder='https://twitter.com/elon.musk'
              value={accountUrl}
              required
              msg='This field is required'
            />
          </PICard>
        </>
      )}
      {(actionTwitter.includes(TwitterEnum.LIKE) ||
        actionTwitter.includes(TwitterEnum.REPLY) ||
        actionTwitter.includes(TwitterEnum.RETWEET)) && (
        <>
          <Divider />
          <PICard>
            <Label>{'TWEET URL'}</Label>
            <TextField
              onChange={(e) => setTweetUrl(e.target.value)}
              placeholder='https://twitter.com/abc'
              value={tweetUrl}
              required
              msg='This field is required'
            />
            <Gap height={3} />
            <LabelDes>{'Post to like/reply/retweet'}</LabelDes>
          </PICard>
        </>
      )}
      {actionTwitter.includes(TwitterEnum.REPLY) && (
        <>
          <Divider />
          <PICard>
            <Label>{'DEFAULT REPLY'}</Label>
            <MulInputBox
              onChange={(e) => setReplyTwitter(e.target.value)}
              rows={3}
              placeholder='Check this out @mantanetworl, @dzucle, @yugih, so cool!'
            />
            <Gap height={3} />
            <LabelDes>
              {'We will prepare a pre-filled reply for the users'}
            </LabelDes>
          </PICard>
        </>
      )}
      {actionTwitter.includes(TwitterEnum.TWEET) && (
        <>
          <Divider />
          <PICard>
            <Label>{'TWEET CONTENT'}</Label>
            <MulInputBox
              onChange={(e) => setContentTwitter(e.target.value)}
              rows={3}
              placeholder='Check this out @mantanetworl, @dzucle, @yugih, so cool!'
            />
          </PICard>
        </>
      )}
      {actionTwitter.includes(TwitterEnum.JOIN_SPACE) && (
        <>
          <Divider />
          <PICard>
            <Label>{'SPACE URL'}</Label>
            <TextField
              onChange={(e) => setSpaceUrl(e.target.value)}
              placeholder='Empty'
              value={spaceUrlTw}
              required
              msg='This field is required'
            />
          </PICard>
        </>
      )}
    </>
  )
}

export default TwitterList
