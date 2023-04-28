'use client'

import { FunctionComponent } from 'react'

import {
  ActionList,
  ActiveEnum,
  QuestTypeEnum,
  TwitterEnum,
} from '@/constants/project.const'
import { Divider, Gap } from '@/styles/common.style'
import { InputBox, MulInputBox } from '@/styles/input.style'
import { LabelInput } from '@/styles/myProjects.style'
import {
  ITypeBox,
  LabelDes,
  PICard,
  TwitterBox,
} from '@/styles/questboard.style'

import { NewQuestStore } from './store'

const TwitterList: FunctionComponent = () => {
  const actionTwitter = NewQuestStore.useStoreState(
    (state) => state.actionTwitter
  )
  const onActionTwitterChanged = NewQuestStore.useStoreActions(
    (actions) => actions.onActionTwitterChanged
  )
  const onAccountLinkChanged = NewQuestStore.useStoreActions(
    (actions) => actions.onAccountLinkChanged
  )
  const onTweetUrlChanged = NewQuestStore.useStoreActions(
    (actions) => actions.onTweetUrlChanged
  )
  const onReplyTwChanged = NewQuestStore.useStoreActions(
    (actions) => actions.onReplyTwChanged
  )
  const onContentTwChanged = NewQuestStore.useStoreActions(
    (actions) => actions.onContentTwChanged
  )
  const onTwitterTypeChanged = NewQuestStore.useStoreActions(
    (actions) => actions.onTwitterTypeChanged
  )

  const handleActive = (i: number) => {
    if (i === TwitterEnum.FOLLOW) {
      onTwitterTypeChanged(QuestTypeEnum.TWITTER_FOLLOW)
    }

    if (i === TwitterEnum.TWEET) {
      onTwitterTypeChanged(QuestTypeEnum.TWITTER_TWEET)
    }

    if (i === TwitterEnum.JOIN_SPACE) {
      onTwitterTypeChanged(QuestTypeEnum.TWITTER_JOIN_SPACE)
    }

    if (
      i === TwitterEnum.LIKE ||
      i === TwitterEnum.REPLY ||
      i === TwitterEnum.RETWEET
    ) {
      onTwitterTypeChanged(QuestTypeEnum.TWITTER_REACTION)
    }

    if (!actionTwitter.includes(i)) {
      onActionTwitterChanged([...actionTwitter, i])
    } else {
      onActionTwitterChanged(actionTwitter.filter((e) => e !== i))
    }
  }

  const listTwitterAction = ActionList.map((e, i) => {
    let block = false

    if (actionTwitter.includes(TwitterEnum.FOLLOW)) {
      if (i !== TwitterEnum.FOLLOW) {
        block = true
      } else {
        block = false
      }
    }

    if (actionTwitter.includes(TwitterEnum.TWEET)) {
      if (i !== TwitterEnum.TWEET) {
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
        i !== TwitterEnum.LIKE &&
        i !== TwitterEnum.REPLY &&
        i !== TwitterEnum.RETWEET
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

    if (actionTwitter.includes(i)) {
      active = ActiveEnum.ACTIVE
    }

    return (
      <TwitterBox
        active={active}
        key={i}
        onClick={block ? undefined : () => handleActive(i)}
      >
        {e.name}
      </TwitterBox>
    )
  })

  return (
    <>
      <Divider />
      <PICard>
        <LabelInput>{'ACTION'}</LabelInput>
        <Gap height={2} />
        <ITypeBox>{listTwitterAction}</ITypeBox>
      </PICard>
      {actionTwitter.includes(TwitterEnum.FOLLOW) && (
        <>
          <Divider />
          <PICard>
            <LabelInput>{'ACCOUNT URL'}</LabelInput>
            <Gap height={3} />
            <InputBox
              onChange={(e) => onAccountLinkChanged(e.target.value)}
              placeholder='https://twitter.com/elon.musk'
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
            <LabelInput>{'TWEET URL'}</LabelInput>
            <Gap height={3} />
            <InputBox
              onChange={(e) => onTweetUrlChanged(e.target.value)}
              placeholder='https://twitter.com/abc'
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
            <LabelInput>{'DEFAULT REPLY'}</LabelInput>
            <Gap height={3} />
            <MulInputBox
              onChange={(e) => onReplyTwChanged(e.target.value)}
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
            <LabelInput>{'TWEET CONTENT'}</LabelInput>
            <Gap height={3} />
            <MulInputBox
              onChange={(e) => onContentTwChanged(e.target.value)}
              rows={3}
              placeholder='Check this out @mantanetworl, @dzucle, @yugih, so cool!'
            />
          </PICard>
        </>
      )}
    </>
  )
}

export default TwitterList
