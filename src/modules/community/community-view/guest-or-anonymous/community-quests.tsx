import { FC } from 'react'

import tw from 'twin.macro'

import QuestCardToView from '@/modules/quest/quest-card-to-view'
import { OtherQuests } from '@/platform/routes/questercamp'
import CommunityStore from '@/store/local/community'
import { QuestType } from '@/types/quest'
import CarouselList from '@/widgets/carousel'
import CategoryBox from '@/widgets/category-box'
import { VerticalFullWidth } from '@/widgets/orientation'
import { Divider, Gap } from '@/widgets/separator'
import { Large2xlText } from '@/widgets/text'

const MarginTop = tw.div`mt-4`

const StartVertical = tw(VerticalFullWidth)`
  justify-center
  items-start
  gap-6
`

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

const CommunityQuests: FC = () => {
  const quests = CommunityStore.useStoreState((state) => state.quests)

  const highlightedQuests = quests && quests.filter((quest) => quest.is_highlight === true)

  return (
    <VerticalFullWidth>
      <HighlightedQuests highlightedQuest={highlightedQuests} loading={false} />

      <Gap />
      <Divider />
      <Gap />

      <StartVertical>
        <Large2xlText>{'👋 Onboarding'}</Large2xlText>
        <OtherQuests quests={quests} />
      </StartVertical>
    </VerticalFullWidth>
  )
}

export default CommunityQuests
