import { FunctionComponent, useEffect, useState } from 'react'

import toast from 'react-hot-toast'
import { useLocation } from 'react-router-dom'
import tw from 'twin.macro'

import { listQuestApi } from '@/api/quest'
import QuestCardToView from '@/modules/quest/quest-card-to-view'
import { OtherQuests } from '@/routes/questercamp'
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

const CommunityQuests: FunctionComponent = () => {
  const location = useLocation()
  const [loading, setLoading] = useState<boolean>(true)
  const [questList, setListQuests] = useState<QuestType[]>([])
  const [highlightedQuest, setHighlightedQuest] = useState<QuestType[]>([])

  useEffect(() => {
    getQuests()
  }, [location])

  const getQuests = async () => {
    try {
      const id = location.pathname?.split('/').at(-1)
      if (id) {
        const data = await listQuestApi(id, '')
        if (data.error) {
          toast.error(data.error)
        }
        if (data.data) {
          setHighlightedQuest(data.data.quests.filter((quest) => quest.is_highlight === true))
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

      <Gap />
      <Divider />
      <Gap />

      <StartVertical>
        <Large2xlText>{'👋 Onboarding'}</Large2xlText>
        <OtherQuests quests={questList} />
      </StartVertical>
    </VerticalFullWidth>
  )
}

export default CommunityQuests
