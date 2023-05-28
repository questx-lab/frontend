'use client'

import { FunctionComponent } from 'react'

import { NewQuestStore } from '@/store/local/new-quest.store'
import { Gap } from '@/styles/common.style'
import { HeaderText } from '@/styles/home.style'
import { QuestType } from '@/utils/type'
import { VerticalFullWidth } from '@/widgets/orientation'
import tw from 'twin.macro'
import { Quest } from '@/modules/quest/quest'
import { CommunityStore } from '@/store/local/community'

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
  quests: QuestType[]
}> = ({ quests }) => {
  if (!quests) {
    return <div>{'There are currently no quests'}</div>
  }

  const questListView = quests.map((quest) => <Quest quest={quest} />)

  return <>{questListView}</>
}

export const Quests: FunctionComponent<{
  show: boolean
}> = ({ show }) => {
  const quests = CommunityStore.useStoreState((action) => action.quests)

  if (!show) {
    return <></>
  }

  return (
    <>
      <VerticalFullWidth>
        <HeaderText>{'👌 Invite'}</HeaderText>
        <Gap height={6} />
        <Grid>
          <QuestListView quests={quests} />
        </Grid>
      </VerticalFullWidth>
    </>
  )
}
