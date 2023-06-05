import { FunctionComponent } from 'react'

import tw from 'twin.macro'

import { QuestStatusEnum, QuestTypeEnum, TwitterEnum } from '@/constants/common.const'
import NewQuestStore from '@/store/local/new-quest.store'
import { NegativeButton, PositiveButton } from '@/widgets/buttons'
import { HorizontalBetweenCenter } from '@/widgets/orientation'

const FullWidthFrame = tw(HorizontalBetweenCenter)`
  w-full
  gap-4
`

const ActionButtons: FunctionComponent<{
  onSubmit: (status: string) => void
}> = ({ onSubmit }) => {
  const title = NewQuestStore.useStoreState((state) => state.title)
  const questType = NewQuestStore.useStoreState((state) => state.type)
  const actionTwitter = NewQuestStore.useStoreState((state) => state.actionTwitter)
  const visitLink = NewQuestStore.useStoreState((state) => state.visitLink)
  const quizzes = NewQuestStore.useStoreState((state) => state.quizzes)
  const accountUrl = NewQuestStore.useStoreState((state) => state.accountUrl)
  const tweetUrl = NewQuestStore.useStoreState((state) => state.tweetUrl)
  const contentTw = NewQuestStore.useStoreState((state) => state.contentTw)
  const spaceUrlTw = NewQuestStore.useStoreState((state) => state.spaceUrlTw)
  const telegramLink = NewQuestStore.useStoreState((state) => state.telegramLink)
  const discordLink = NewQuestStore.useStoreState((state) => state.discordLink)
  const textAutoValid = NewQuestStore.useStoreState((state) => state.textAutoValid)
  const anwser = NewQuestStore.useStoreState((state) => state.anwser)

  let disable = true
  if (title !== '') {
    switch (questType) {
      case QuestTypeEnum.URL:
        disable = false
        break
      case QuestTypeEnum.IMAGE:
        disable = false
        break
      case QuestTypeEnum.TEXT:
        if (textAutoValid && anwser === '') {
          disable = true
        } else {
          disable = false
        }
        break
      case QuestTypeEnum.QUIZ:
        if (quizzes.length > 0) {
          const quiz = quizzes[quizzes.length - 1]
          if (quiz.question !== '' && quiz.answers.length && quiz.question.length) {
            disable = false
          }
        }
        break
      case QuestTypeEnum.VISIT_LINK:
        if (visitLink !== '') {
          disable = false
        }
        break
      case QuestTypeEnum.EMPTY:
        disable = false
        break
      case QuestTypeEnum.TWITTER:
        actionTwitter.forEach((e) => {
          switch (e) {
            case TwitterEnum.FOLLOW:
              if (accountUrl !== '') {
                disable = false
              }
              break
            case TwitterEnum.LIKE:
              if (tweetUrl !== '') {
                disable = false
              }
              break
            case TwitterEnum.REPLY:
              if (tweetUrl !== '') {
                disable = false
              }
              break
            case TwitterEnum.RETWEET:
              if (tweetUrl !== '') {
                disable = false
              }
              break
            case TwitterEnum.TWEET:
              if (contentTw !== '') {
                disable = false
              }
              break
            case TwitterEnum.JOIN_SPACE:
              if (spaceUrlTw !== '') {
                disable = false
              }
              break
          }
        })

        break
      case QuestTypeEnum.DISCORD:
        if (discordLink !== '') {
          disable = false
        }
        break
      case QuestTypeEnum.JOIN_TELEGRAM:
        if (telegramLink !== '') {
          disable = false
        }
        break
      case QuestTypeEnum.INVITES:
        disable = false
        break
    }
  }

  return (
    <FullWidthFrame>
      <NegativeButton isFull block={disable} onClick={() => onSubmit(QuestStatusEnum.DRAFT)}>
        {'Draft'}
      </NegativeButton>
      <PositiveButton isFull block={disable} onClick={() => onSubmit(QuestStatusEnum.ACTIVE)}>
        {'Publish'}
      </PositiveButton>
    </FullWidthFrame>
  )
}

export default ActionButtons
