import { FC } from 'react'

import { useNavigate } from 'react-router-dom'

import { QuestColor } from '@/constants/common.const'
import { RouterConst } from '@/constants/router.const'
import QuestCardDetails from '@/modules/quest/quest-card-details'
import ActiveQuestStore from '@/store/local/active-quest'
import CommunityStore from '@/store/local/community'
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
  const navigate = useNavigate()
  const canEdit = CommunityStore.useStoreState((action) => action.canEdit)

  // action
  const setActiveQuest = ActiveQuestStore.useStoreActions((action) => action.setQuest)
  const setLikeRetweetReplyClicked = ActiveQuestStore.useStoreActions(
    (action) => action.setLikeRetweetReplyClicked
  )

  const onClick = () => {
    // Set the data in the NewQuest store
    setActiveQuest(quest)
    setLikeRetweetReplyClicked(false)
    if (!canEdit) {
      navigate(RouterConst.COMMUNITIES + `/${quest.community.handle}/quests/${quest.id}`)
    }
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
