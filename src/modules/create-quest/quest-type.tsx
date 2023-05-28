'use client'

import { QuestTypeEnum, QuestTypeStringMap } from '@/constants/common.const'
import { TypeButton, TypeButtonFrame } from '@/modules/create-quest/mini-widget'
import { NewQuestStore } from '@/store/local/new-quest.store'

// import QuestDetails from './quest-details'

const QuestTypeView = () => {
  const display = [
    QuestTypeEnum.URL,
    QuestTypeEnum.IMAGE,
    QuestTypeEnum.TEXT,
    QuestTypeEnum.QUIZ,
    QuestTypeEnum.VISIT_LINK,
    QuestTypeEnum.EMPTY,
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
    </>
  )
}

export default QuestTypeView
