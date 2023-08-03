import { FC, useCallback, useEffect, useState } from 'react'

import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import tw from 'twin.macro'

import { listCommunitiesApi } from '@/api/communitiy'
import { RouterConst } from '@/constants/router.const'
import CommunityBox from '@/modules/community/community-box'
import { OtherCommunities } from '@/platform/routes/homepage'
import { CommunityType } from '@/types/community'
import CarouselList from '@/widgets/carousel'
import CategoryBox from '@/widgets/category-box'
import { VerticalFullWidth } from '@/widgets/orientation'
import SearchResult from '@/widgets/search-result'
import { TextXl } from '@/widgets/text'

const StartVertical = tw(VerticalFullWidth)`
  justify-center
  items-start
  gap-0
  gap-5
  mt-5
`

const Padding = tw.div`
  pt-5
  w-full
`

const CommunityContent: FC<{ query: string }> = ({ query }) => {
  // Hook
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [communities, setCommunities] = useState<CommunityType[]>([])
  const [initCommunities, setInitCommunities] = useState<CommunityType[]>([])

  // Handler
  const onShowAllClicked = () => {
    navigate(RouterConst.COMMUNITIES_TRENDING)
  }

  const fetchListCommunities = useCallback(async (q: string) => {
    try {
      setLoading(true)
      const result = await listCommunitiesApi(0, 50, q)
      if (result.code === 0 && result.data?.communities) {
        if (q === '') {
          setInitCommunities(result.data.communities)
        }
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

  // First fetch
  useEffect(() => {
    fetchListCommunities('')
  }, [])

  return (
    <SearchResult
      query={query}
      loading={loading}
      data={communities}
      renderResult={<OtherCommunities communities={communities} />}
    >
      <Padding>
        <CategoryBox title='🔥 Trending Communities' onClick={onShowAllClicked} loading={false}>
          <CarouselList
            data={initCommunities}
            renderItemFunc={(community: CommunityType) => {
              return <CommunityBox key={community.handle} community={community} />
            }}
          />
        </CategoryBox>
      </Padding>

      <StartVertical>
        <TextXl>{'🕑 New Communities'}</TextXl>
        <OtherCommunities communities={initCommunities} />
      </StartVertical>
    </SearchResult>
  )
}

export default CommunityContent
