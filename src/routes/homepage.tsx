import { FunctionComponent, useEffect, useState } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
import tw from 'twin.macro'

import { getTrendingCommunities } from '@/app/api/client/communitiy'
import { RouterConst } from '@/constants/router.const'
import CommunityBox from '@/routes/communities/community/community-box'
import { GlobalStoreModel } from '@/store/store'
import { TitleBox } from '@/styles/common.style'
import { CommunityType } from '@/utils/type'
import CarouselList from '@/widgets/carousel'
import CategoryBox from '@/widgets/category-box'
import { LayoutWithLeftPanel } from '@/widgets/layout/layout-with-left-panel'
import { Vertical, VerticalFullWidthCenter } from '@/widgets/orientation'

const PaddingTop = tw(VerticalFullWidthCenter)`
  pt-[90px]
`

export const Main = tw(Vertical)`
  max-sm:px-2
  md:px-8
  xl:w-[980px]
  pb-[30px]
  w-full
  gap-6
`

const CommunityGrid = tw.div`
  grid
  grid-cols-4
  gap-4
  max-2xl:grid-cols-3
  max-xl:grid-cols-2
  max-sm:grid-cols-1
`

const Title: FunctionComponent = () => {
  const user = useStoreState<GlobalStoreModel>((state) => state.user)
  return <TitleBox>{`👋 Hi, ${user && user.name}`}</TitleBox>
}

const OtherCommunities: FunctionComponent<{ communities: CommunityType[] }> = ({ communities }) => {
  if (!communities || communities.length === 0) {
    return <></>
  }

  return (
    <CommunityGrid>
      {communities.map((e) => (
        <CommunityBox key={e.handle} community={e} />
      ))}
    </CommunityGrid>
  )
}

export const Home: FunctionComponent = () => {
  const [communities, setCommunities] = useState<CommunityType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const navigate = useNavigate()

  // global data
  const communitiesFollowing: CommunityType[] = useStoreState<GlobalStoreModel>(
    (state) => state.communitiesFollowing
  )
  const communitiesTrending: CommunityType[] = useStoreState<GlobalStoreModel>(
    (state) => state.communitiesTrending
  )

  // global action
  const setCommunitiesTrending = useStoreActions<GlobalStoreModel>(
    (action) => action.setCommunitiesTrending
  )

  useEffect(() => {
    if (communitiesTrending && communitiesTrending.length === 0) {
      fetchTrending()
    }
  }, [])

  const fetchTrending = async () => {
    const result = await getTrendingCommunities()
    if (result.code === 0 && result.data) {
      setCommunities(result.data.communities)
      setCommunitiesTrending(result.data.communities)
    }

    setLoading(false)
  }

  const onShowAllClicked = () => {
    navigate(RouterConst.COMMUNITIES)
  }

  return (
    <LayoutWithLeftPanel>
      <PaddingTop>
        <Main>
          <Title />
          <CategoryBox title='🔥 Trending Communities' onClick={onShowAllClicked} loading={loading}>
            <CarouselList
              data={communities}
              renderItemFunc={(community: CommunityType) => {
                return <CommunityBox community={community} />
              }}
            />
          </CategoryBox>

          <CategoryBox title='⭐ Popular Communities' onClick={onShowAllClicked}>
            <CarouselList
              data={communities}
              renderItemFunc={(community: CommunityType) => {
                return <CommunityBox community={community} />
              }}
            />
          </CategoryBox>

          <OtherCommunities communities={communitiesFollowing} />
        </Main>
      </PaddingTop>
    </LayoutWithLeftPanel>
  )
}
