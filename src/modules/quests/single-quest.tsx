'use client'

import { FunctionComponent, useState } from 'react'

import parse from 'html-react-parser'

import { QuestCard } from '@/modules/community/quest-card'
import { QuestDetail } from '@/modules/quests/quest-detail'
import { ActiveQuestStore } from '@/store/local/active-quest.store'
import { DesQ } from '@/styles/questboard.style'
import { QuestType } from '@/types/project.type'
import { BasicModal } from '@/widgets/modal'

const DescriptionBox: FunctionComponent<{ des?: string }> = ({ des }) => {
  if (!des || des === '') {
    return <></>
  }
  return <DesQ>{parse(des)}</DesQ>
}

export const QuestView: FunctionComponent<{
  quest: QuestType
}> = ({ quest }) => {
  const [isOpen, setOpen] = useState<boolean>(false)
  const setQuest = ActiveQuestStore.useStoreActions((action) => action.setQuest)

  const onOpenModal = () => {
    setQuest(quest)
    setOpen(true)
  }

  const onCloseModal = () => {
    setOpen(false)
  }

  return (
    <>
      <QuestCard
        quest={quest}
        isTemplate={false}
        manage={true}
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
