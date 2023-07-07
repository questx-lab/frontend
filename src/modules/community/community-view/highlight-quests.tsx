import { FC } from 'react'

import QuestCardToView from '@/modules/quest/quest-card-to-view'
import { QuestType } from '@/types/quest'
import CarouselList from '@/widgets/carousel'
import CategoryBox from '@/widgets/category-box'

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
          return <QuestCardToView quest={quest} />
        }}
      />
    </CategoryBox>
  )
}

export default HighlightedQuests
