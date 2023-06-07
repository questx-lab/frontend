import { FunctionComponent } from 'react'

import QuestCardDetails from '@/modules/quest/quest-card-details'
import ViewQuest from '@/modules/quest/view-quest'
import ActiveQuestStore from '@/store/local/active-quest'
import { emptyQuest, QuestType } from '@/types/quest'
import BasicModal from '@/widgets/modal/basic'

/**
 * This component allows user to view the quest upon clicking on it.
 */
const QuestCardToView: FunctionComponent<{
  quest: QuestType
  isTemplate?: boolean
}> = ({ quest, isTemplate = false }) => {
  // data
  const activeQuest = ActiveQuestStore.useStoreState((state) => state.quest)

  // action
  const setActiveQuest = ActiveQuestStore.useStoreActions((action) => action.setQuest)

  // local hook
  const onCloseModal = () => {
    setActiveQuest(emptyQuest())
  }

  const onClick = () => {
    // Set the data in the NewQuest store
    setActiveQuest(quest)
  }

  const onQuestDeleted = () => {
    onCloseModal()
  }

  return (
    <>
      <QuestCardDetails quest={quest} isTemplate={isTemplate} onClick={onClick} />
      <BasicModal title={`${quest.title}`} isOpen={activeQuest.id !== ''} onClose={onCloseModal}>
        <ViewQuest quest={quest} onQuestDeleted={onQuestDeleted} />
      </BasicModal>
    </>
  )
}

export default QuestCardToView
