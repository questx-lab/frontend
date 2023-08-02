import { FC } from 'react'

import tw from 'twin.macro'

import { QuestColor } from '@/constants/common.const'
import StorageConst from '@/constants/storage.const'
import QuestCardToView from '@/modules/quest/quest-card-to-view'
import { QuestType } from '@/types/quest'
import { Image } from '@/widgets/image'
import { VerticalCenter, VerticalFullWidth } from '@/widgets/orientation'
import { NormalText, TextXl } from '@/widgets/text'

const Grid = tw.div`
  w-full
  grid
  gap-4
  sm:grid-cols-2
  max-sm:grid-cols-1
  justify-between
  items-center
`

const PaddingVertical = tw(VerticalFullWidth)`
  gap-4
`

const EmptyBox = tw(VerticalCenter)`
  w-full
  p-3
`

const CenterNormalText = tw(NormalText)`
  text-center
`

const RenderQuest: FC<{ quests: QuestType[]; bgColor: string }> = ({ quests, bgColor }) => {
  if (!quests) {
    return <></>
  }

  if (quests.length === 0) {
    return (
      <EmptyBox>
        <Image width={250} height={250} src={StorageConst.HUSKY.src} alt={StorageConst.HUSKY.alt} />
        <CenterNormalText>{'There is no quests yet.'}</CenterNormalText>
      </EmptyBox>
    )
  }

  const questListView = quests.map((quest, index) => (
    <div key={index}>
      <QuestCardToView bgColor={bgColor} quest={quest} />
    </div>
  ))

  return (
    <Grid>
      <>{questListView}</>
    </Grid>
  )
}

const Quests: FC<{
  quests: QuestType[]
  show: boolean
  categoryTitle?: string
  bgColor?: string
}> = ({ show, categoryTitle, quests, bgColor = QuestColor.EMERALD }) => {
  if (!show || !quests) {
    return <></>
  }

  return (
    <>
      <PaddingVertical>
        {categoryTitle && <TextXl>{categoryTitle}</TextXl>}
        <RenderQuest bgColor={bgColor} quests={quests} />
      </PaddingVertical>
    </>
  )
}

export default Quests
