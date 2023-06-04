import { FunctionComponent, useCallback, useEffect, useState } from 'react'

import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import tw from 'twin.macro'
import { useDebouncedCallback } from 'use-debounce'

import { listQuestApi } from '@/app/api/client/quest'
import { RouterConst } from '@/constants/router.const'
import { StorageConst } from '@/constants/storage.const'
import { QuestCardToView } from '@/modules/quest/quest-card-to-view'
import { Divider } from '@/styles/common.style'
import { QuestType } from '@/utils/type'
import CarouselList from '@/widgets/carousel'
import CategoryBox from '@/widgets/category-box'
import { Image } from '@/widgets/image'
import { MainContent } from '@/widgets/layout/layout-with-left-panel'
import {
  Horizontal,
  HorizontalBetweenCenterFullWidth,
  VerticalFullWidth,
  VerticalFullWidthCenter,
} from '@/widgets/orientation'
import { SearchInput } from '@/widgets/search-input'
import SearchResult from '@/widgets/search-result'
import { Large2xlText, Large3xlText } from '@/widgets/text'

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
  grid-cols-4
  gap-4
  max-2xl:grid-cols-3
  max-xl:grid-cols-2
  max-sm:grid-cols-1
`

const MarginTop = tw.div`mt-4`

export const OtherQuests: FunctionComponent<{ quests: QuestType[] }> = ({ quests }) => {
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
          <QuestCardToView key={quest.id} quest={quest} />
        ))}
      </QuestsGrid>
    </>
  )
}

const QuestContent: FunctionComponent<{ query: string }> = ({ query }) => {
  // Hook
  const [loading, setLoading] = useState<boolean>(false)
  const [quests, setQuests] = useState<QuestType[]>([])
  const [intQuests, setInitQuests] = useState<QuestType[]>([])
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
  }, [query])

  // First fetch quests
  useEffect(() => {
    fetchListQuests('')
  }, [])

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
                <QuestCardToView quest={quyest} />
              </MarginTop>
            )
          }}
        />
      </CategoryBox>

      <StartVertical>
        <Large2xlText>{'🕑 New Quests'}</Large2xlText>
        <OtherQuests quests={intQuests} />
      </StartVertical>
    </SearchResult>
  )
}

export const Index: FunctionComponent = () => {
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
          <Large3xlText>{'⚡ QuesterCamp'}</Large3xlText>
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
