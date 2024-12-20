import { FC } from 'react'

import { useNavigate } from 'react-router'

import { newQuestRoute } from '@/constants/router.const'
import QuestCardDetails from '@/modules/quest/quest-card-details'
import NewQuestStore from '@/store/local/new-quest'
import { QuestType } from '@/types/quest'

/**
 * This Quest component holds template data. When user clicks on the quest card, it navigates (or
 * opens a modal) with prepopulated quest data and allow user to create a new quest.
 */
const QuestCardToTemplate: FC<{
  quest: QuestType
  communityHandle: string
}> = ({ quest, communityHandle }) => {
  // action
  const setNewQuest = NewQuestStore.useStoreActions((action) => action.setQuest)

  // hook
  const navigate = useNavigate()

  const onClick = () => {
    // Set the data in the NewQuest store
    setNewQuest(quest)

    // Navigate to create quest
    navigate(newQuestRoute(communityHandle))
  }

  return (
    <>
      <QuestCardDetails quest={quest} isTemplate={true} onClick={onClick} />
    </>
  )
}

export default QuestCardToTemplate
