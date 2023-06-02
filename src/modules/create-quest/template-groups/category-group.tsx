import { FunctionComponent } from 'react'

import tw from 'twin.macro'

import QuestCard from '@/modules/quest/quest-card'
import { Gap } from '@/styles/common.style'
import { QuestType } from '@/utils/type'
import { Vertical, VerticalFullWidth } from '@/widgets/orientation'

const PaddingY = tw(Vertical)`
  w-full
  py-4
`

const TemplateGroup: FunctionComponent<{
  quests: QuestType[]
  onItemClicked: (e: QuestType) => void
}> = ({ quests, onItemClicked: onClickItem }) => {
  if (!quests || quests.length === 0) {
    return <></>
  }

  const listPanel = quests.map((e) => (
    <VerticalFullWidth>
      <QuestCard key={e.id} quest={e} isTemplate onClick={(quest) => onClickItem(quest)} />
      <Gap height={6} />
    </VerticalFullWidth>
  ))

  return <PaddingY>{listPanel}</PaddingY>
}

export default TemplateGroup
