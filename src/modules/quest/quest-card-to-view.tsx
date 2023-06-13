import { FC } from 'react'

import QuestCardDetails from '@/modules/quest/quest-card-details'
import ActiveQuestStore from '@/store/local/active-quest'
import { QuestType } from '@/types/quest'

/**
 * This component allows user to view the quest upon clicking on it.
 */
const QuestCardToView: FC<{
  quest: QuestType
  isTemplate?: boolean
  showCommunity?: boolean
}> = ({ quest, isTemplate = false, showCommunity = false }) => {
  // action
  const setActiveQuest = ActiveQuestStore.useStoreActions((action) => action.setQuest)

  const onClick = () => {
    // Set the data in the NewQuest store
    setActiveQuest(quest)
  }

  return (
    <QuestCardDetails
      showCommunity={showCommunity}
      quest={quest}
      isTemplate={isTemplate}
      onClick={onClick}
    />
  )
}

export default QuestCardToView
