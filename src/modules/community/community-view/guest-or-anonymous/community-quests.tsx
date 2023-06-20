import { FC } from 'react'

import QuestsByCategory from '@/modules/community/community-view/quests-by-category'
import { VerticalFullWidth } from '@/widgets/orientation'

const CommunityQuests: FC = () => {
  return (
    <VerticalFullWidth>
      <QuestsByCategory />
    </VerticalFullWidth>
  )
}

export default CommunityQuests
