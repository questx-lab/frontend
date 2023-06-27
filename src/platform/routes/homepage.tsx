import { FC, useCallback, useEffect, useState } from 'react'

import { useStoreState } from 'easy-peasy'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import tw from 'twin.macro'

import { listCommunitiesApi } from '@/api/communitiy'
import { RouterConst } from '@/constants/router.const'
import StorageConst from '@/constants/storage.const'
import CommunityBox from '@/modules/community/community-box'
import LandingPage from '@/platform/routes/landing-page'
import { GlobalStoreModel } from '@/store/store'
import { CommunityType, FollowCommunityType } from '@/types/community'
import CarouselList from '@/widgets/carousel'
import CategoryBox from '@/widgets/category-box'
import { Image } from '@/widgets/image'
import { LayoutWithLeftPanel } from '@/widgets/layout/layout-with-left-panel'
import { Vertical, VerticalFullWidthCenter } from '@/widgets/orientation'
import { Text2xl } from '@/widgets/text'

const PaddingTop = tw(VerticalFullWidthCenter)`
  pt-[90px]
`

export const Main = tw(Vertical)`
  max-sm:px-3
  md:px-8
  xl:w-[980px]
  pb-[30px]
  w-full
  gap-12
`

const CommunityGrid = tw.div`
  w-full
  grid
  xl:grid-cols-4
  gap-4
  lg:grid-cols-3
  md:grid-cols-2
  sm:grid-cols-1
  max-sm:grid-cols-1
`

const Title: FC = () => {
  const user = useStoreState<GlobalStoreModel>((state) => state.user)
  return (
    <VerticalFullWidthCenter>
      <Text2xl>{`👋 Hi, ${user && user.name}`}</Text2xl>
    </VerticalFullWidthCenter>
  )
}

export const OtherCommunities: FC<{ communities: CommunityType[] }> = ({ communities }) => {
  if (!communities || communities.length === 0) {
    return (
      <VerticalFullWidthCenter>
        <Image
          width={256}
          height={256}
          src={StorageConst.EMPTY_FOLLOWING.src}
          alt={StorageConst.EMPTY_FOLLOWING.alt}
        />
      </VerticalFullWidthCenter>
    )
  }

  return (
    <CommunityGrid>
      {communities.map((e) => (
        <CommunityBox key={e.handle} community={e} />
      ))}
    </CommunityGrid>
  )
}

export const HomePage: FC = () => {
  // hook
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(true)
  const [communities, setCommunities] = useState<CommunityType[]>([])

  // global data
  const communitiesFollowing: FollowCommunityType[] = useStoreState<GlobalStoreModel>(
    (state) => state.communitiesFollowing
  )

  const onShowAllClicked = () => {
    navigate(RouterConst.COMMUNITIES_TRENDING)
  }

  const fetchListCommunities = useCallback(async (query: string) => {
    try {
      setLoading(true)
      const result = await listCommunitiesApi(0, 50, query, true)
      if (result.code === 0 && result.data?.communities) {
        setCommunities(result.data.communities)
      }
    } catch (error) {
      toast.error('Error while fetching projects')
    }

    setLoading(false)
  }, [])

  // First fetch
  useEffect(() => {
    fetchListCommunities('')
  }, [])

  return (
    <LayoutWithLeftPanel>
      <PaddingTop>
        <Main>
          <Title />

          <OtherCommunities communities={communitiesFollowing.map((follow) => follow.community)} />

          <CategoryBox loading={loading} title='🔥 Trending Communities' onClick={onShowAllClicked}>
            <CarouselList
              data={communities}
              renderItemFunc={(community: CommunityType) => {
                return <CommunityBox community={community} />
              }}
            />
          </CategoryBox>
        </Main>
      </PaddingTop>
    </LayoutWithLeftPanel>
  )
}

const HomeOrLanding: FC = () => {
  const user = useStoreState<GlobalStoreModel>((state) => state.user)
  if (!user) {
    return <LandingPage />
  }

  return <HomePage />
}

export default HomeOrLanding
