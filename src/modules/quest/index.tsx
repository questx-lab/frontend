'use client'

import { FunctionComponent } from 'react'

import { QuestType } from '@/utils/type'
import QuestCard from '@/modules/quest/quest-card'

export const QuestView: FunctionComponent<{
  quest: QuestType
  isTemplate?: boolean
  setOpenTemplateModel?: (e: boolean) => void
}> = ({ quest, isTemplate = false, setOpenTemplateModel }) => {
  return <QuestCard quest={quest} isTemplate />
}
