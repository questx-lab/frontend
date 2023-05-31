import { FunctionComponent, useCallback, useEffect, useState } from 'react'

import { useStoreState } from 'easy-peasy'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import tw from 'twin.macro'
import { useDebouncedCallback } from 'use-debounce'

import { listCommunitiesApi } from '@/app/api/client/communitiy'
import { RouterConst } from '@/constants/router.const'
import CreateCommunity from '@/modules/create-community'
import CommunityBox from '@/routes/communities/community/community-box'
import { NewCommunityStore } from '@/store/local/new-community.store'
import { GlobalStoreModel } from '@/store/store'
import { Divider } from '@/styles/common.style'
import { CommunityType } from '@/utils/type'
import CarouselList from '@/widgets/carousel'
import CategoryBox from '@/widgets/category-box'
import { MainContent } from '@/widgets/layout/layout-with-left-panel'
import { BaseModal } from '@/widgets/modal'
import {
  Horizontal,
  HorizontalBetweenCenterFullWidth,
  VerticalFullWidth,
  VerticalFullWidthCenter,
} from '@/widgets/orientation'
import { SearchInput } from '@/widgets/search-input'
import SearchResult from '@/widgets/search-result'
import { Large2xlText, Large3xlText } from '@/widgets/text'
import { PlusIcon } from '@heroicons/react/24/outline'

import { OtherCommunities } from '../homepage'

const SearchPadding = tw(Horizontal)`
  w-full gap-3 py-3
`

const CreateProjectBtn = tw(Horizontal)`
  gap-2
  border
  border-solid
  border-gray-300
  rounded-lg
  justify-center
  items-center
  py-2
  px-4
  text-lg
  text-black
  font-medium
  cursor-pointer
`

const ModalBox = tw.div`
  flex
  h-full
  items-center
  justify-center
  text-center
  py-6
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
`

const NewCommunity: FunctionComponent<{
  setOpen: (value: boolean) => void
}> = ({ setOpen }) => {
  return (
    <CreateProjectBtn onClick={() => setOpen(true)}>
      <PlusIcon className={'w-5 h-5 text-black'} />
      {'Create Community'}
    </CreateProjectBtn>
  )
}

const CommunityContent: FunctionComponent<{ query: string }> = ({ query }) => {
  // Hook
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [communities, setCommunities] = useState<CommunityType[]>([])

  // Global data
  const communitiesTrending: CommunityType[] = useStoreState<GlobalStoreModel>(
    (state) => state.communitiesTrending
  )
  const communitiesNew: CommunityType[] = useStoreState<GlobalStoreModel>(
    (state) => state.communitiesNew
  )

  // Handler
  const onShowAllClicked = () => {
    navigate(RouterConst.COMMUNITIES)
  }

  const fetchListCommunities = useCallback(async (q: string) => {
    try {
      setLoading(true)
      const result = await listCommunitiesApi(0, 50, q)
      if (result.code === 0 && result.data?.communities) {
        setCommunities(result.data.communities)
      }
    } catch (error) {
      toast.error('Error while fetching projects')
    } finally {
      setLoading(false)
    }
  }, [])

  // Searching Communities
  useEffect(() => {
    if (query.length > 2) {
      fetchListCommunities(query)
    }
  }, [query])

  return (
    <SearchResult
      query={query}
      loading={loading}
      data={communities}
      renderResult={<OtherCommunities communities={communities} />}
    >
      <CategoryBox title='🔥 Trending Communities' onClick={onShowAllClicked} loading={false}>
        <CarouselList
          data={communitiesTrending}
          renderItemFunc={(community: CommunityType) => {
            return <CommunityBox community={community} />
          }}
        />
      </CategoryBox>

      <CategoryBox title='⭐ Popular Communities' onClick={onShowAllClicked}>
        <CarouselList
          data={communitiesTrending}
          renderItemFunc={(community: CommunityType) => {
            return <CommunityBox community={community} />
          }}
        />
      </CategoryBox>
      <StartVertical>
        <Large2xlText>{'🕑 New Communities'}</Large2xlText>
        <OtherCommunities communities={communitiesNew} />
      </StartVertical>
    </SearchResult>
  )
}

export const Index: FunctionComponent = () => {
  // hook
  const [isOpen, setOpen] = useState<boolean>(false)
  const [query, setQuery] = useState<string>('')

  // Handler
  const debounced = useDebouncedCallback(async (value: string) => {
    setQuery(value)
  }, 300)

  return (
    <PaddingVertical>
      <MainContent>
        <HorizontalBetweenCenterFullWidth>
          <Large3xlText>{'👋 Communities'}</Large3xlText>
          <NewCommunity setOpen={setOpen} />
        </HorizontalBetweenCenterFullWidth>
      </MainContent>
      <Divider />
      <MainContent>
        <GapVertical>
          <SearchPadding>
            <SearchInput hint={'Search Community'} onChanged={(value) => debounced(value)} />
          </SearchPadding>
          <CommunityContent query={query} />
        </GapVertical>
      </MainContent>

      <BaseModal isOpen={isOpen}>
        <ModalBox>
          <NewCommunityStore.Provider>
            <CreateCommunity setOpen={setOpen} />
          </NewCommunityStore.Provider>
        </ModalBox>
      </BaseModal>
    </PaddingVertical>
  )
}
