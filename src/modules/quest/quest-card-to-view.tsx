import { FC } from 'react'

import { QuestColor } from '@/constants/common.const'
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
  bgColor?: string
}> = ({ quest, isTemplate = false, showCommunity = false, bgColor = QuestColor.EMERALD }) => {
  // action
  const setActiveQuest = ActiveQuestStore.useStoreActions((action) => action.setQuest)

  const onClick = () => {
    // Set the data in the NewQuest store
    setActiveQuest(quest)
  }

  return (
    <QuestCardDetails
      bgColor={bgColor}
      showCommunity={showCommunity}
      quest={quest}
      isTemplate={isTemplate}
      onClick={onClick}
    />
  )
}

export default QuestCardToView
