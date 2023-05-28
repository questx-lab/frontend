'use client'

import { FunctionComponent } from 'react'

import { NewQuestStore } from '@/store/local/new-quest.store'
import { Gap } from '@/styles/common.style'
import { HeaderText } from '@/styles/home.style'
import { QuestType } from '@/utils/type'
import { VerticalFullWidth } from '@/widgets/orientation'
import tw from 'twin.macro'
import { QuestView } from '@/modules/quest'

const Grid = tw.div`
  w-full
  grid
  gap-4
  xl:grid-cols-3
  sm:grid-cols-2
  max-sm:grid-cols-1
  justify-between
  items-center
`

export const QuestListView: FunctionComponent<{
  questList: QuestType[]
}> = ({ questList }) => {
  if (!questList) {
    return <div>{'There are currently no quests'}</div>
  }

  const questListView = questList.map((quest) => (
    <NewQuestStore.Provider>
      <QuestView quest={quest} />
    </NewQuestStore.Provider>
  ))

  return <>{questListView}</>
}

export const Quests: FunctionComponent<{
  questList: QuestType[]
  show: boolean
}> = ({ questList, show }) => {
  if (!show) {
    return <></>
  }

  return (
    <>
      <VerticalFullWidth>
        <HeaderText>{'👌 Invite'}</HeaderText>
        <Gap height={6} />
        <Grid>
          <QuestListView questList={questList} />
        </Grid>
      </VerticalFullWidth>
    </>
  )
}
