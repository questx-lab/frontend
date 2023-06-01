import { FunctionComponent, useCallback, useEffect, useState } from 'react'

import { useStoreState } from 'easy-peasy'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import tw from 'twin.macro'

import { listCommunitiesApi } from '@/app/api/client/communitiy'
import { RouterConst } from '@/constants/router.const'
import { StorageConst } from '@/constants/storage.const'
import CommunityBox from '@/modules/community/community-box'
import LandingPage from '@/routes/landing-page'
import { GlobalStoreModel } from '@/store/store'
import { CommunityType } from '@/utils/type'
import CarouselList from '@/widgets/carousel'
import CategoryBox from '@/widgets/category-box'
import { Image } from '@/widgets/image'
import { LayoutWithLeftPanel } from '@/widgets/layout/layout-with-left-panel'
import { Vertical, VerticalFullWidthCenter } from '@/widgets/orientation'
import { Large3xlText } from '@/widgets/text'

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
  grid-cols-4
  gap-4
  max-2xl:grid-cols-3
  max-xl:grid-cols-2
  max-sm:grid-cols-1
`

const Title: FunctionComponent = () => {
  const user = useStoreState<GlobalStoreModel>((state) => state.user)
  return (
    <VerticalFullWidthCenter>
      <Large3xlText>{`👋 Hi, ${user && user.name}`}</Large3xlText>
    </VerticalFullWidthCenter>
  )
}

export const OtherCommunities: FunctionComponent<{ communities: CommunityType[] }> = ({
  communities,
}) => {
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

export const HomeOrLanding: FunctionComponent = () => {
  const user = useStoreState<GlobalStoreModel>((state) => state.user)
  if (!user) {
    return <LandingPage />
  }

  return <HomePage />
}

export const HomePage: FunctionComponent = () => {
  // hook
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(true)
  const [communities, setCommunities] = useState<CommunityType[]>([])

  // global data
  const communitiesFollowing: CommunityType[] = useStoreState<GlobalStoreModel>(
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

          <OtherCommunities communities={communitiesFollowing} />

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
