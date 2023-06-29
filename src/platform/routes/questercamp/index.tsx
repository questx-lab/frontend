import { FC, useCallback, useEffect, useState } from 'react'

import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import tw from 'twin.macro'
import { useDebouncedCallback } from 'use-debounce'

import { listQuestApi } from '@/api/quest'
import { RouterConst } from '@/constants/router.const'
import StorageConst from '@/constants/storage.const'
import QuestCardToView from '@/modules/quest/quest-card-to-view'
import useDeleteQuest from '@/platform/hooks/use-delete-quest'
import { QuestType } from '@/types/quest'
import CarouselList from '@/widgets/carousel'
import CategoryBox from '@/widgets/category-box'
import { Image } from '@/widgets/image'
import { SearchInput } from '@/widgets/input/search-input'
import { MainContent } from '@/widgets/layout/layout-with-left-panel'
import {
  Horizontal,
  HorizontalBetweenCenterFullWidth,
  VerticalFullWidth,
  VerticalFullWidthCenter,
} from '@/widgets/orientation'
import SearchResult from '@/widgets/search-result'
import { Divider } from '@/widgets/separator'
import { Text2xl } from '@/widgets/text'

const SearchPadding = tw(Horizontal)`
  w-full gap-3 py-3
`
const PaddingVertical = tw(VerticalFullWidthCenter)`
  py-6
  gap-6
`

const GapVertical = tw(VerticalFullWidthCenter)`
  gap-8
`

const StartVertical = tw(VerticalFullWidth)`
  justify-center
  items-start
  gap-6
`

const QuestsGrid = tw.div`
  w-full
  grid
  xl:grid-cols-4
  gap-4
  lg:grid-cols-3
  md:grid-cols-2
  sm:grid-cols-1
  max-sm:grid-cols-1
`

const MarginTop = tw.div`mt-4`

export const OtherQuests: FC<{ quests: QuestType[]; showCommunity?: boolean }> = ({
  quests,
  showCommunity = false,
}) => {
  if (!quests || quests.length === 0) {
    return (
      <VerticalFullWidthCenter>
        <Image width={256} height={256} src={StorageConst.HUSKY.src} alt={StorageConst.HUSKY.alt} />
      </VerticalFullWidthCenter>
    )
  }

  return (
    <>
      <QuestsGrid>
        {quests.map((quest) => (
          <QuestCardToView showCommunity={showCommunity} key={quest.id} quest={quest} />
        ))}
      </QuestsGrid>
    </>
  )
}

const QuestContent: FC<{ query: string }> = ({ query }) => {
  // Hook
  const [loading, setLoading] = useState<boolean>(false)
  const [quests, setQuests] = useState<QuestType[]>([])
  const [intQuests, setInitQuests] = useState<QuestType[]>([])
  const deletedQuest = useDeleteQuest()
  const navigate = useNavigate()

  const onShowAllClicked = () => {
    navigate(RouterConst.QUESTBOARD_TRENDING)
  }

  const fetchListQuests = useCallback(async (q: string) => {
    try {
      setLoading(true)
      const result = await listQuestApi('', q)
      if (result.code === 0 && result.data?.quests) {
        if (q === '') {
          setInitQuests(result.data.quests)
        }
        setQuests(result.data.quests)
      }
    } catch (error) {
      toast.error('Error while fetching quests')
    } finally {
      setLoading(false)
    }
  }, [])

  // Searching Communities
  useEffect(() => {
    if (query.length > 2) {
      fetchListQuests(query)
    }
  }, [query, deletedQuest.id])

  // First fetch quests
  useEffect(() => {
    fetchListQuests('')
  }, [deletedQuest.id])

  return (
    <SearchResult
      query={query}
      loading={loading}
      data={quests}
      renderResult={<OtherQuests quests={quests} />}
    >
      <CategoryBox title='🔥 Trending Quests' onClick={onShowAllClicked}>
        <CarouselList
          data={intQuests}
          renderItemFunc={(quyest: QuestType) => {
            return (
              <MarginTop>
                <QuestCardToView showCommunity quest={quyest} />
              </MarginTop>
            )
          }}
        />
      </CategoryBox>

      <StartVertical>
        <Text2xl>{'🕑 New Quests'}</Text2xl>
        <OtherQuests showCommunity quests={intQuests} />
      </StartVertical>
    </SearchResult>
  )
}

const Index: FC = () => {
  // hook
  const [query, setQuery] = useState<string>('')

  // Handler
  const debounced = useDebouncedCallback(async (value: string) => {
    setQuery(value)
  }, 300)

  return (
    <PaddingVertical>
      <MainContent>
        <HorizontalBetweenCenterFullWidth>
          <Text2xl>{'⚡ QuesterCamp'}</Text2xl>
        </HorizontalBetweenCenterFullWidth>
      </MainContent>
      <Divider />
      <MainContent>
        <GapVertical>
          <SearchPadding>
            <SearchInput hint={'Search Quest'} onChanged={(value) => debounced(value)} />
          </SearchPadding>
          <QuestContent query={query} />
        </GapVertical>
      </MainContent>
    </PaddingVertical>
  )
}

export default Index
