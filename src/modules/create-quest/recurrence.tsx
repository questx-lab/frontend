import { FC } from 'react'

import { QuestRecurrence, QuestRecurrencesMap } from '@/constants/common.const'
import NewQuestStore from '@/store/local/new-quest'
import TypesSelection from '@/widgets/types-selection'

const Recurrence: FC = () => {
  // Data
  const recurrence = NewQuestStore.useStoreState((state) => state.recurrence)
  const display = [
    QuestRecurrence.ONCE,
    QuestRecurrence.DAILY,
    QuestRecurrence.WEEKLY,
    QuestRecurrence.MONTHLY,
  ]

  // Actions
  const setRecurrence = NewQuestStore.useStoreActions((actions) => actions.setRecurrence)

  return (
    <TypesSelection
      list={display}
      activeFunc={(item: QuestRecurrence, index) => item === recurrence}
      onClick={(item: QuestRecurrence, index) => setRecurrence(item)}
      itemView={(item: QuestRecurrence) => QuestRecurrencesMap.get(item)}
    />
  )
}

export default Recurrence
