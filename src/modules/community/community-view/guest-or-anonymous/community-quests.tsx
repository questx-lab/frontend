import { FC } from 'react'

import tw from 'twin.macro'

import HighlightedQuests from '@/modules/community/community-view/highlight-quests'
import { OtherQuests } from '@/platform/routes/questercamp'
import CommunityStore from '@/store/local/community'
import { VerticalFullWidth } from '@/widgets/orientation'
import { Divider, Gap } from '@/widgets/separator'
import { Large2xlText } from '@/widgets/text'

const StartVertical = tw(VerticalFullWidth)`
  justify-center
  items-start
  gap-6
`

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
