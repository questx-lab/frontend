import { FC } from 'react'

import tw from 'twin.macro'

import { QuestColor } from '@/constants/common.const'
import Category from '@/modules/community/community-view/community-collab/category'
import HighlightedQuests from '@/modules/community/community-view/highlight-quests'
import { FixedWidth } from '@/modules/community/mini-widget'
import Quests from '@/modules/community/quests'
import CommunityStore from '@/store/local/community'
import { VerticalFullWidth, VerticalFullWidthCenter } from '@/widgets/orientation'

const BorderBottom = tw(VerticalFullWidthCenter)`
  w-full
  border-b
  border-solid
  border-gray-200
  pb-10
  gap-0
`

const PaddingTop = tw.div`
  w-full
  pt-10
`

const PaddingY10 = tw(VerticalFullWidth)`
  py-10
`

const RenderQuestsByCategory: FC = () => {
  const categories = CommunityStore.useStoreState((state) => state.categories)
  const quests = CommunityStore.useStoreState((state) => state.quests)

  if (!categories) {
    return <></>
  }

  const listQuests =
    quests &&
    categories.map((category, index) => {
      const questsFilter = quests.filter((quest) => quest.category.id === category.id)

      let bgColor = QuestColor.EMERALD

      if (index % 5 === 1) {
        bgColor = QuestColor.CYAN
      }

      if (index % 5 === 2) {
        bgColor = QuestColor.INDIGO
      }

      if (index % 5 === 3) {
        bgColor = QuestColor.ORANGE
      }

      if (index % 5 === 4) {
        bgColor = QuestColor.PINK
      }

      return (
        <Quests
          bgColor={bgColor}
          key={category.id}
          quests={questsFilter}
          show={true}
          categoryTitle={category.name}
        />
      )
    })

  return <>{listQuests}</>
}

const RenderQuestsNoCategory: FC = () => {
  const quests = CommunityStore.useStoreState((state) => state.quests)
  if (!quests) {
    return <></>
  }

  const questsFilter = quests.filter((quest) => quest.category.id === '')

  if (questsFilter.length === 0) {
    return <></>
  }

  return <Quests quests={questsFilter} show={true} categoryTitle={'Other Quests'} />
}

const QuestsByCategory: FC = () => {
  // data
  const quests = CommunityStore.useStoreState((state) => state.quests)
  const highlightedQuests = quests && quests.filter((quest) => quest.is_highlight === true)

  return (
    <>
      <BorderBottom>
        <FixedWidth>
          <PaddingTop>
            <HighlightedQuests highlightedQuest={highlightedQuests} loading={false} />
          </PaddingTop>
        </FixedWidth>
      </BorderBottom>
      <PaddingY10>
        <VerticalFullWidthCenter>
          <FixedWidth>
            <Category />
            <RenderQuestsByCategory />
            <RenderQuestsNoCategory />
          </FixedWidth>
        </VerticalFullWidthCenter>
      </PaddingY10>
    </>
  )
}

export default QuestsByCategory
