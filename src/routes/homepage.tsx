import { FunctionComponent, useEffect, useState } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
import tw from 'twin.macro'

import { getTrendingCommunities } from '@/app/api/client/communitiy'
import { RouterConst } from '@/constants/router.const'
import { StorageConst } from '@/constants/storage.const'
import CommunityBox from '@/routes/communities/community/community-box'
import { GlobalStoreModel } from '@/store/store'
import { CommunityType } from '@/utils/type'
import CarouselList from '@/widgets/carousel'
import CategoryBox from '@/widgets/category-box'
import { Image } from '@/widgets/image'
import { LayoutWithLeftPanel } from '@/widgets/layout-with-left-panel'
import { Vertical, VerticalFullWidthCenter } from '@/widgets/orientation'
import { Large3xlText } from '@/widgets/text'

const PaddingTop = tw(VerticalFullWidthCenter)`
  pt-[90px]
`

export const Main = tw(Vertical)`
  max-sm:px-2
  md:px-8
  xl:w-[980px]
  pb-[30px]
  w-full
  gap-12
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
  return (
    <VerticalFullWidthCenter>
      <Large3xlText>{`👋 Hi, ${user && user.name}`}</Large3xlText>
    </VerticalFullWidthCenter>
  )
}

const OtherCommunities: FunctionComponent<{ communities: CommunityType[] }> = ({ communities }) => {
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

export const Home: FunctionComponent = () => {
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
    } else {
      setLoading(false)
    }
  }, [])

  const fetchTrending = async () => {
    const result = await getTrendingCommunities()
    if (result.code === 0 && result.data) {
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

          <OtherCommunities communities={communitiesFollowing} />

          <CategoryBox title='🔥 Trending Communities' onClick={onShowAllClicked} loading={loading}>
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
        </Main>
      </PaddingTop>
    </LayoutWithLeftPanel>
  )
}
