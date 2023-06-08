import { FunctionComponent } from 'react'

import tw from 'twin.macro'

import QuestCardToView from '@/modules/quest/quest-card-to-view'
import CommunityStore from '@/store/local/community'
import { QuestType } from '@/types/quest'
import { VerticalFullWidth } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { HeaderText } from '@/widgets/text'

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

const PaddingVertical = tw(VerticalFullWidth)`
  py-6
`

export const QuestListView: FunctionComponent<{
  quests: QuestType[]
}> = ({ quests }) => {
  if (!quests) {
    return <div>{'There are currently no quests'}</div>
  }

  const questListView = quests.map((quest, index) => <QuestCardToView quest={quest} key={index} />)

  return <>{questListView}</>
}

export const Quests: FunctionComponent<{
  show: boolean
  categoryTitle: string
}> = ({ show, categoryTitle }) => {
  const quests = CommunityStore.useStoreState((action) => action.quests)

  if (!show) {
    return <></>
  }

  return (
    <>
      <PaddingVertical>
        <HeaderText>{categoryTitle}</HeaderText>
        <Gap height={6} />
        <Grid>
          <QuestListView quests={quests} />
        </Grid>
      </PaddingVertical>
    </>
  )
}
