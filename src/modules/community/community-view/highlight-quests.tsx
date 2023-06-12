import { FC } from 'react'

import tw from 'twin.macro'

import QuestCardToView from '@/modules/quest/quest-card-to-view'
import { QuestType } from '@/types/quest'
import CarouselList from '@/widgets/carousel'
import CategoryBox from '@/widgets/category-box'

const MarginTop = tw.div`mt-4`

const HighlightedQuests: FC<{ highlightedQuest: QuestType[]; loading: boolean }> = ({
  highlightedQuest,
  loading,
}) => {
  if (highlightedQuest.length === 0) {
    return <></>
  }

  return (
    <CategoryBox
      hasShowAll={false}
      loading={loading}
      title='🔥 Highlighted Quests'
      onClick={() => {}}
    >
      <CarouselList
        data={highlightedQuest}
        renderItemFunc={(quest: QuestType) => {
          return (
            <MarginTop>
              <QuestCardToView quest={quest} />
            </MarginTop>
          )
        }}
      />
    </CategoryBox>
  )
}

export default HighlightedQuests
