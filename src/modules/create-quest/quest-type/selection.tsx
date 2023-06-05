import { QuestTypeEnum, QuestTypeStringMap } from '@/constants/common.const'
import QuestType from '@/modules/create-quest/quest-type'
import NewQuestStore from '@/store/local/new-quest'
import TypesSelection from '@/widgets/types-selection'

const QuestTypeSelection = () => {
  const display = [
    QuestTypeEnum.URL,
    QuestTypeEnum.IMAGE,
    QuestTypeEnum.TEXT,
    QuestTypeEnum.QUIZ,
    QuestTypeEnum.VISIT_LINK,
    // Empty only applies for quests with conditions. We won't enable this quiz type until we
    // allow condition on quests.
    // QuestTypeEnum.EMPTY,
    QuestTypeEnum.TWITTER,
    QuestTypeEnum.DISCORD,
    QuestTypeEnum.JOIN_TELEGRAM,
    QuestTypeEnum.INVITES,
  ]

  // data
  const questType = NewQuestStore.useStoreState((state) => state.type)

  // actions
  const onQuestTypeChanged = NewQuestStore.useStoreActions((actions) => actions.setType)

  return (
    <>
      <TypesSelection
        list={display}
        activeFunc={(item) => item === questType}
        onClick={(item: QuestTypeEnum) => onQuestTypeChanged(item)}
        itemView={(item: QuestTypeEnum) => QuestTypeStringMap.get(item)}
      />
      <QuestType />
    </>
  )
}

export default QuestTypeSelection
