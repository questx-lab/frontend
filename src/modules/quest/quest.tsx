'use client'

import { FunctionComponent, useState } from 'react'

import QuestCard from '@/modules/quest/quest-card'
import ViewQuest from '@/modules/quest/view-quest'
import NewQuestStore from '@/store/local/new-quest.store'
import { QuestType } from '@/utils/type'
import { BasicModal } from '@/widgets/modal'

export const Quest: FunctionComponent<{
  quest: QuestType
  isTemplate?: boolean
  setOpenTemplateModel?: (e: boolean) => void
}> = ({ quest, isTemplate = false, setOpenTemplateModel }) => {
  // action
  const setQuest = NewQuestStore.useStoreActions((action) => action.setQuest)

  // local hook
  const [isOpen, setOpen] = useState<boolean>(false)
  const onCloseModal = () => {
    setOpen(false)
  }

  const onClick = () => {
    // Set the data in the NewQuest store
    setQuest(quest)

    setOpen(true)
  }

  return (
    <>
      <QuestCard quest={quest} isTemplate={isTemplate} onClick={onClick} />
      <BasicModal title={`🎉 ${quest.title}`} isOpen={isOpen} onClose={onCloseModal}>
        {/* <QuestDetail quest={quest} /> */}
        <ViewQuest quest={quest} />
      </BasicModal>
    </>
  )
}
