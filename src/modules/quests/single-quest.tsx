'use client'

import { FunctionComponent, useState } from 'react'

import { useRouter } from 'next/navigation'

import { QuestCard } from '@/modules/community/quest-card'
import { QuestDetail } from '@/modules/quests/quest-detail'
import { ActiveQuestStore } from '@/store/local/active-quest.store'
import { CommunityStore } from '@/store/local/community.store'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { QuestType } from '@/utils/type'
import { BasicModal } from '@/widgets/modal'

import { handleTemplate } from '../new-quest/quest-frame'

export const QuestView: FunctionComponent<{
  quest: QuestType
  isTemplate?: boolean
  setOpenTemplateModel?: (e: boolean) => void
}> = ({ quest, isTemplate = false, setOpenTemplateModel }) => {
  const [isOpen, setOpen] = useState<boolean>(false)
  const router = useRouter()

  const community = CommunityStore.useStoreState((state) => state.project)

  // action
  const setQuest = ActiveQuestStore.useStoreActions((action) => action.setQuest)
  const setUrlSubmit = ActiveQuestStore.useStoreActions(
    (action) => action.setUrlSubmit
  )
  const setTextSubmit = ActiveQuestStore.useStoreActions(
    (action) => action.setTextSubmit
  )
  const setReplyUrlSubmit = ActiveQuestStore.useStoreActions(
    (action) => action.setReplyUrlSubmit
  )
  const setFileUpload = ActiveQuestStore.useStoreActions(
    (action) => action.setFileUpload
  )
  const setVisitLink = ActiveQuestStore.useStoreActions(
    (action) => action.setVisitLink
  )
  const setQuizAnswers = ActiveQuestStore.useStoreActions(
    (action) => action.setQuizAnswers
  )

  const setTitle = NewQuestStore.useStoreActions((actions) => actions.setTitle)
  const setDescription = NewQuestStore.useStoreActions(
    (actions) => actions.setDescription
  )

  const setRecurrence = NewQuestStore.useStoreActions(
    (actions) => actions.setRecurrence
  )

  const setQuestType = NewQuestStore.useStoreActions(
    (actions) => actions.setQuestType
  )
  const setAccountLink = NewQuestStore.useStoreActions(
    (actions) => actions.setAccountLink
  )
  const setTextAutoValidation = NewQuestStore.useStoreActions(
    (actions) => actions.setTextAutoValidation
  )
  const setAnswer = NewQuestStore.useStoreActions(
    (actions) => actions.setAnswer
  )
  const setVisitLinkNewQuest = NewQuestStore.useStoreActions(
    (actions) => actions.setVisitLink
  )
  const setTelegramLink = NewQuestStore.useStoreActions(
    (actions) => actions.setTelegramLink
  )
  const setInvites = NewQuestStore.useStoreActions(
    (actions) => actions.setInvites
  )

  const setActionTwitter = NewQuestStore.useStoreActions(
    (actions) => actions.setActionTwitter
  )

  const setTweetUrl = NewQuestStore.useStoreActions(
    (actions) => actions.setTweetUrl
  )
  const setReplyTwitter = NewQuestStore.useStoreActions(
    (actions) => actions.setReplyTwitter
  )

  const onOpenModal = () => {
    if (isTemplate) {
      handleTemplate(
        setTitle,
        setDescription,
        setRecurrence,
        setQuestType,
        setAccountLink,
        setTextAutoValidation,
        setAnswer,
        setVisitLinkNewQuest,
        setTelegramLink,
        setInvites,
        setActionTwitter,
        setTweetUrl,
        setReplyTwitter,
        quest
      )
      if (setOpenTemplateModel) {
        setOpenTemplateModel(true)
      }
    } else {
      setQuest(quest)
      setOpen(true)
      initActiveQuest()
    }
  }

  const onCloseModal = () => {
    setOpen(false)
  }

  const initActiveQuest = () => {
    setUrlSubmit('')
    setTextSubmit('')
    setReplyUrlSubmit('')
    setFileUpload([])
    setVisitLink(false)
    setQuizAnswers([])
  }

  return (
    <>
      <QuestCard
        quest={quest}
        isTemplate={isTemplate}
        key={quest.id}
        onClick={onOpenModal}
      />

      <BasicModal
        title={`🎉 ${quest.title}`}
        isOpen={isOpen}
        onClose={onCloseModal}
      >
        <QuestDetail quest={quest} />
      </BasicModal>
    </>
  )
}
