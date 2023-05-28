'use client'

import { FunctionComponent } from 'react'

import { QuestType } from '@/utils/type'

export const QuestView: FunctionComponent<{
  quest: QuestType
  isTemplate?: boolean
  setOpenTemplateModel?: (e: boolean) => void
}> = ({ quest, isTemplate = false, setOpenTemplateModel }) => {
  return <></>
}
