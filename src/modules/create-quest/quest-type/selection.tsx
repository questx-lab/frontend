'use client'

import { QuestTypeEnum, QuestTypeStringMap } from '@/constants/common.const'
import { TypeButton, TypeButtonFrame } from '@/modules/create-quest/mini-widget'
import QuestType from '@/modules/create-quest/quest-type'
import { NewQuestStore } from '@/store/local/new-quest.store'

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
  const questType = NewQuestStore.useStoreState((state) => state.questType)

  // actions
  const onQuestTypeChanged = NewQuestStore.useStoreActions((actions) => actions.setQuestType)

  const listTypeItems = display.map((e, i) => (
    <TypeButton
      active={e === questType}
      key={i}
      onClick={() => {
        onQuestTypeChanged(e)
      }}
    >
      {QuestTypeStringMap.get(e)}
    </TypeButton>
  ))

  return (
    <>
      <TypeButtonFrame>{listTypeItems}</TypeButtonFrame>
      <QuestType />
    </>
  )
}

export default QuestTypeSelection
