import { FunctionComponent } from 'react'

import tw from 'twin.macro'

import StorageConst from '@/constants/storage.const'
import QuestCardToView from '@/modules/quest/quest-card-to-view'
import { QuestType } from '@/types/quest'
import { Image } from '@/widgets/image'
import { VerticalCenter, VerticalFullWidth } from '@/widgets/orientation'
import { HeaderText, NormalText } from '@/widgets/text'

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
  py-3
  gap-6
`

const EmptyBox = tw(VerticalCenter)`
  w-full
  p-3
`

const CenterNormalText = tw(NormalText)`
  text-center
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

const RenderQuest: FunctionComponent<{ quests: QuestType[] }> = ({ quests }) => {
  if (quests.length === 0) {
    return (
      <EmptyBox>
        <Image width={250} height={250} src={StorageConst.HUSKY.src} alt={StorageConst.HUSKY.alt} />
        <CenterNormalText>{'There is no quests yet.'}</CenterNormalText>
      </EmptyBox>
    )
  }
  return (
    <Grid>
      <QuestListView quests={quests} />
    </Grid>
  )
}

const Quests: FunctionComponent<{
  quests: QuestType[]
  show: boolean
  categoryTitle?: string
}> = ({ show, categoryTitle, quests }) => {
  if (!show || !quests) {
    return <></>
  }

  return (
    <>
      <PaddingVertical>
        {categoryTitle && <HeaderText>{categoryTitle}</HeaderText>}
        <RenderQuest quests={quests} />
      </PaddingVertical>
    </>
  )
}

export default Quests
