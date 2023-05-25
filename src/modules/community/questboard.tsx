import { useEffect, useState } from 'react'

import { usePathname, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { listQuestApi } from '@/app/api/client/quest'
import { RouterConst } from '@/constants/router.const'
import { Quests } from '@/modules/quests/quest-list'
import { QuestView } from '@/modules/quests/single-quest'
import { ActiveQuestStore } from '@/store/local/active-quest.store'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { Gap } from '@/styles/common.style'
import { QuestType } from '@/utils/type'
import CarouselList from '@/widgets/carousel'
import CategoryBox from '@/widgets/CategoryBox'
import { VerticalFullWidth } from '@/widgets/orientation'

const categories = [
  'NFT',
  'GameFi',
  'DeFi',
  'DAO',
  'SocialFi',
  'Metaverse',
  'Tools',
  'Ecosystem',
  'Others',
]

export default function QuestBoardTab() {
  const pathName = usePathname()
  const [questList, setListQuests] = useState<QuestType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  const onShowAllClicked = () => {
    router.push(RouterConst.QUESTBOARD)
  }

  useEffect(() => {
    getQuests()
  }, [])

  const getQuests = async () => {
    try {
      const id = pathName?.split('/').at(-1)
      if (id) {
        const data = await listQuestApi(id, '')
        if (data.error) {
          toast.error(data.error)
        }
        if (data.data) {
          setListQuests(data.data?.quests ?? [])
          setLoading(false)
        }
      }
    } catch (error) {
      toast.error('error')
    }
  }

  return (
    <VerticalFullWidth>
      <CategoryBox title='🔥 Trending Quests' onClick={onShowAllClicked}>
        <ActiveQuestStore.Provider>
          <NewQuestStore.Provider>
            <CarouselList
              data={questList}
              renderItemFunc={(quest: QuestType) => {
                return <QuestView quest={quest} />
              }}
            />
          </NewQuestStore.Provider>
        </ActiveQuestStore.Provider>
      </CategoryBox>
      <Gap height={6} />
      <Quests questList={questList} show={!loading} />
    </VerticalFullWidth>
  )
}
