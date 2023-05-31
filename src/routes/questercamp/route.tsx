import { useStoreActions } from 'easy-peasy'
import { json, Outlet, useLoaderData } from 'react-router-dom'
import tw from 'twin.macro'

import { listQuestApi } from '@/app/api/client/quest'
import { GlobalStoreModel } from '@/store/store'
import { QuestType } from '@/utils/type'
import { LayoutWithLeftPanel } from '@/widgets/layout/layout-with-left-panel'

const FullWidth = tw.div`
  w-full
`

export const QuestsLoader = async () => {
  const trendingQuestsResult = await listQuestApi('', '')
  return json(
    {
      // TODO : Currently, cannot not distinguish between trending and new quests
      // Will change if api support query both of them
      trendingQuests: trendingQuestsResult.data?.quests,
      newQuests: trendingQuestsResult.data?.quests,
    },
    { status: 200 }
  )
}

export const Questercamp = () => {
  // props
  const data = useLoaderData() as {
    trendingQuests: QuestType[]
    newQuests: QuestType[]
  }

  // global action
  const setQuestsTrending = useStoreActions<GlobalStoreModel>((action) => action.setQuestsTrending)
  const setQuestsNew = useStoreActions<GlobalStoreModel>((action) => action.setQuestsNew)

  // set data
  if (data) {
    setQuestsTrending(data.trendingQuests)
    setQuestsNew(data.newQuests)
  }

  return (
    <LayoutWithLeftPanel>
      <FullWidth>
        <Outlet />
      </FullWidth>
    </LayoutWithLeftPanel>
  )
}
