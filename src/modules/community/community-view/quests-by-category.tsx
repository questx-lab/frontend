import { FunctionComponent, useEffect } from 'react'

import toast from 'react-hot-toast'

import { getCategoriesApi } from '@/api/communitiy'
import HighlightedQuests from '@/modules/community/community-view/highlight-quests'
import Quests from '@/modules/community/quests'
import CommunityStore from '@/store/local/community'
import { Divider, Gap } from '@/widgets/separator'

const RenderQuestsByCategory: FunctionComponent = () => {
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

const RenderQuestsNoCategory: FunctionComponent = () => {
  const quests = CommunityStore.useStoreState((state) => state.quests)
  if (!quests) {
    return <></>
  }

  const questsFilter = quests.filter((quest) => quest.category.id === '')

  return <Quests quests={questsFilter} show={true} categoryTitle={'Other Quests'} />
}

const QuestsByCategory: FunctionComponent = () => {
  // data
  const quests = CommunityStore.useStoreState((state) => state.quests)
  const highlightedQuests = quests && quests.filter((quest) => quest.is_highlight === true)
  const selectedCommunity = CommunityStore.useStoreState((state) => state.selectedCommunity)

  // action
  const setCategories = CommunityStore.useStoreActions((action) => action.setCategories)

  // hook
  useEffect(() => {
    if (selectedCommunity.handle !== '') {
      fetchCategory()
    }
  }, [selectedCommunity])

  if (!selectedCommunity) {
    return <></>
  }

  const fetchCategory = async () => {
    try {
      const result = await getCategoriesApi(selectedCommunity.handle)
      if (result.error) {
        toast.error(result.error)
      }

      if (result.data && result.data?.categories) {
        setCategories(result.data?.categories)
      }
    } catch (error) {}
  }

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
