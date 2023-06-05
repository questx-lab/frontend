import { FunctionComponent, useState } from 'react'

import QuestCardDetails from '@/modules/quest/quest-card-details'
import ViewQuest from '@/modules/quest/view-quest'
import ActiveQuestStore from '@/store/local/active-quest'
import { QuestType } from '@/types/quest'
import BasicModal from '@/widgets/modal/basic'

/**
 * This component allows user to view the quest upon clicking on it.
 */
export const QuestCardToView: FunctionComponent<{
  quest: QuestType
  isTemplate?: boolean
}> = ({ quest, isTemplate = false }) => {
  // action
  const setActiveQuest = ActiveQuestStore.useStoreActions((action) => action.setQuest)

  // local hook
  const [isOpen, setOpen] = useState<boolean>(false)
  const onCloseModal = () => {
    setOpen(false)
  }

  const onClick = () => {
    // Set the data in the NewQuest store
    setActiveQuest(quest)

    setOpen(true)
  }

  return (
    <>
      <QuestCardDetails quest={quest} isTemplate={isTemplate} onClick={onClick} />
      <BasicModal title={`${quest.title}`} isOpen={isOpen} onClose={onCloseModal}>
        <ViewQuest quest={quest} />
      </BasicModal>
    </>
  )
}
