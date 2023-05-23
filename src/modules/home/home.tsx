import { FunctionComponent, useEffect, useState } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import toast from 'react-hot-toast'
import { MoonLoader } from 'react-spinners'
import tw from 'twin.macro'

import { listCommunitiesApi } from '@/app/api/client/community'
import CommunityBox from '@/modules/community/community-box'
import { GlobalStoreModel } from '@/store/store'
import { FullScreen } from '@/styles/common.style'
import { CommunityType, UserType } from '@/utils/type'
import { Vertical } from '@/widgets/orientation'

import HorizontalCommunities from '../community/horizontal-communities'

const Wrap = tw(Vertical)`
  min-h-screen
  pt-[70px]
  px-64
  3xl:px-96
`

const Main = tw(Vertical)`
  pt-8
  pb-[30px]
  gap-4
  w-full
`

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

const HomePage: FunctionComponent = () => {
  // hook
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    fetchListProjects()
  }, [])

  // data
  const projectsFollowing: CommunityType[] = useStoreState<GlobalStoreModel>(
    (state) => state.projectsFollowing
  )
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)
  const projectsTrending = useStoreState<GlobalStoreModel>(
    (state) => state.projectsTrending
  )

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

  const Title: FunctionComponent = () => {
    if (user && user.name) {
      return <TitleBox>{`👋 Hi, ${user && user.name}`}</TitleBox>
    }

    return <></>
  }

  if (loading) {
    return (
      <FullScreen>
        <MoonLoader color='#000' loading speedMultiplier={0.6} size={40} />
      </FullScreen>
    )
  }

  return (
    <Wrap>
      <Main>
        <Title />
        <HorizontalCommunities
          title={'🔥 Trending Communities'}
          byTrending={true}
        />
        <HorizontalCommunities
          title={'⭐ Popular Communities'}
          byTrending={false}
        />
        <WrapProjects>{renderProject}</WrapProjects>
      </Main>
    </Wrap>
  )
}

export default HomePage
