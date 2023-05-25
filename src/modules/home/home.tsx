'use client'
import { FunctionComponent, useEffect, useState } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import tw from 'twin.macro'

import { listCommunitiesApi } from '@/app/api/client/community'
import { RouterConst } from '@/constants/router.const'
import CommunityBox from '@/modules/community/community-box'
import { GlobalStoreModel } from '@/store/store'
import { Main } from '@/styles/common.style'
import { CommunityType, UserType } from '@/utils/type'
import CarouselList from '@/widgets/carousel'
import CategoryBox from '@/widgets/CategoryBox'
import { VerticalFullWidthCenter } from '@/widgets/orientation'

const WrapProjects = tw.div`
  grid
  grid-cols-4
  gap-4
  max-2xl:grid-cols-3
  max-xl:grid-cols-2
  max-sm:grid-cols-1
`

const TitleBox = tw.div`
  w-full
  flex
  justify-center
  items-center
  text-2xl
  font-medium
  text-gray-900
`

const Wrap = tw(VerticalFullWidthCenter)`
  pt-[90px]
`

const HomePage: FunctionComponent = () => {
  // hook
  const [loading, setLoading] = useState<boolean>(true)
  const [communities, setCommunities] = useState<CommunityType[]>([])
  const router = useRouter()
  useEffect(() => {
    fetchListProjects()
    fetchCommunityList()
  }, [])

  // data
  const projectsFollowing: CommunityType[] = useStoreState<GlobalStoreModel>(
    (state) => state.projectsFollowing
  )
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)

  // action
  const setProjectsTrending = useStoreActions<GlobalStoreModel>(
    (action) => action.setProjectsTrending
  )

  //handler
  const renderProject =
    projectsFollowing &&
    projectsFollowing.map((e) => <CommunityBox key={e.id} community={e} />)

  const fetchListProjects = async () => {
    setLoading(true)
    try {
      const list = await listCommunitiesApi(0, 50)
      setProjectsTrending(list.data!.communities)
    } catch (error) {
      toast.error('Network error')
    } finally {
      setLoading(false)
    }
  }

  const fetchCommunityList = async () => {
    setLoading(true)
    try {
      const list = await listCommunitiesApi(0, 50, '', true)
      setCommunities(list.data!.communities)
    } catch (error) {
      // TODO: show error (not toast) to indicate that the communities cannot be loaded.
    } finally {
      setLoading(false)
    }
  }

  const Title: FunctionComponent = () => {
    if (user && user.name) {
      return <TitleBox>{`👋 Hi, ${user && user.name}`}</TitleBox>
    }

    return <></>
  }

  const onShowAllClicked = () => {
    router.push(RouterConst.COMMUNITIES)
  }

  return (
    <Wrap>
      <Main>
        <Title />
        <CategoryBox
          title='🔥 Trending Communities'
          onClick={onShowAllClicked}
          loading={loading}
        >
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
        <WrapProjects>{renderProject}</WrapProjects>
      </Main>
    </Wrap>
  )
}

export default HomePage
