import { FC } from 'react'

import HighlightedQuests from '@/modules/community/community-view/highlight-quests'
import Quests from '@/modules/community/quests'
import CommunityStore from '@/store/local/community'
import { Divider, Gap } from '@/widgets/separator'

const RenderQuestsByCategory: FC = () => {
  const categories = CommunityStore.useStoreState((state) => state.categories)
  const quests = CommunityStore.useStoreState((state) => state.quests)

  if (!categories) {
    return <></>
  }

  const listQuests =
    quests &&
    categories.map((category) => {
      const questsFilter = quests.filter((quest) => quest.category.id === category.id)
      return <Quests quests={questsFilter} show={true} categoryTitle={category.name} />
    })

  return <>{listQuests}</>
}

const RenderQuestsNoCategory: FC = () => {
  const quests = CommunityStore.useStoreState((state) => state.quests)
  if (!quests) {
    return <></>
  }

  const questsFilter = quests.filter((quest) => quest.category.id === '')

  return <Quests quests={questsFilter} show={true} categoryTitle={'Other Quests'} />
}

const QuestsByCategory: FC = () => {
  // data
  const quests = CommunityStore.useStoreState((state) => state.quests)
  const highlightedQuests = quests && quests.filter((quest) => quest.is_highlight === true)

  return (
    <>
      <HighlightedQuests highlightedQuest={highlightedQuests} loading={false} />
      <Gap />
      <Divider />
      <Gap />
      <RenderQuestsByCategory />
      <RenderQuestsNoCategory />
    </>
  )
}

export default QuestsByCategory
