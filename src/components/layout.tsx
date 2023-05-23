import { FunctionComponent, ReactNode, useEffect } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import { toast, Toaster } from 'react-hot-toast'
import tw from 'twin.macro'

import {
  getFollowCommunitiesApi,
  getMyCommunitiesApi,
} from '@/app/api/client/community'
import { getMyReferralInfoApi } from '@/app/api/client/reward'
import { getUserApi } from '@/app/api/client/user'
import Header from '@/components/header'
import Login from '@/modules/login/login'
import ControlPanel from '@/modules/new-quest/control-panel'
import { GlobalStoreModel } from '@/store/store'
import { Html, Main } from '@/styles/layout.style'
import { ModalBox } from '@/styles/modal.style'
import { getAccessToken, getRefreshToken, setUserLocal } from '@/utils/helper'
import { BaseModal } from '@/widgets/modal'
import { Horizontal, VerticalFullWidth } from '@/widgets/orientation'

import ProjectSide from './sidebar'

const Wrap = tw(Horizontal)`
  min-h-screen
  pt-[70px]
`

const MainPanel = tw(Horizontal)`
  pl-[70px]
  max-lg:pr-0
  max-lg:pl-[80px]
  w-full
`

const Content = tw(VerticalFullWidth)`
  items-start
  pl-80
  pb-6
`

export const LayoutDefault = ({ children }: { children: ReactNode }) => {
  const isNavBar = useStoreState<GlobalStoreModel>((state) => state.navBar)

  return (
    <Html lang='en' isOpen={isNavBar}>
      <body>
        <Head>
          <meta name='viewport' content='viewport-fit=cover' />
        </Head>
        {children}
        <Toaster position='top-center' reverseOrder={false} />
      </body>
    </Html>
  )
}

export const Layout = ({
  children,
  isApp = true,
  isFull = true,
}: {
  children: ReactNode
  isApp?: boolean
  isFull?: boolean
}) => {
  // data
  const isNavBar = useStoreState<GlobalStoreModel>((state) => state.navBar)
  const user = useStoreState<GlobalStoreModel>((state) => state.user)
  const showLoginModal = useStoreState<GlobalStoreModel>(
    (state) => state.showLoginModal
  )

  // action
  const setUser = useStoreActions<GlobalStoreModel>((action) => action.setUser)
  const setReferral = useStoreActions<GlobalStoreModel>(
    (action) => action.setReferral
  )
  const setProjectsFollowing = useStoreActions<GlobalStoreModel>(
    (action) => action.setProjectsFollowing
  )
  const setProjectCollab = useStoreActions<GlobalStoreModel>(
    (action) => action.setProjectCollab
  )
  const setShowLoginModal = useStoreActions<GlobalStoreModel>(
    (action) => action.setShowLoginModal
  )

  const router = useRouter()
  useEffect(() => {
    const refreshToken = getRefreshToken()
    const accessToken = getAccessToken()

    if (refreshToken && !accessToken) {
      handleInit()
    }

    if (accessToken) {
      if (user && !Object.keys(user).length) {
        handleInit()
      }
    } else {
      setUser({})
      // router.push(RouterConst.EXPLORE)
    }
  }, [router])

  const handleInit = () => {
    getUserData()
    getProjectsFollowing()
    getMyProjects()
    getMyReferralInfo()
  }

  const getUserData = async () => {
    try {
      const user = await getUserApi()
      setUserLocal(user.data!)
      setUser(user.data!)
    } catch (error) {}
  }

  const getMyReferralInfo = async () => {
    try {
      const referral = await getMyReferralInfoApi()
      if (!referral.error) {
        setReferral(referral.data)
      }
    } catch (error) {}
  }

  const getProjectsFollowing = async () => {
    try {
      const projects = await getFollowCommunitiesApi()
      if (projects.error) {
        toast.error('Error when get your following projects')
      } else {
        if (projects.data?.communities) {
          setProjectsFollowing(projects.data?.communities)
        }
      }
    } catch (error) {
      toast.error('Server error')
    }
  }

  const getMyProjects = async () => {
    try {
      const projects = await getMyCommunitiesApi()
      if (projects.error) {
        toast.error('Error when get your projects')
      } else {
        if (projects.data?.collaborators) {
          setProjectCollab(projects.data?.collaborators)
        }
      }
    } catch (error) {
      toast.error('Server error')
    }
  }

  return (
    <Html lang='en' isOpen={isNavBar}>
      <body>
        <Main>
          <div className='overflow-scroll'>{children}</div>
          <Header isFull={isFull} isApp={isApp} />
        </Main>
        <Toaster position='top-center' reverseOrder={false} />
        <BaseModal isOpen={showLoginModal}>
          <ModalBox>
            <Login setOpen={setShowLoginModal} />
          </ModalBox>
        </BaseModal>
      </body>
    </Html>
  )
}

export const PanelLayout: FunctionComponent<{
  communityId: string
  active: number
  children: ReactNode
}> = ({ communityId, active, children }) => {
  return (
    <Wrap>
      <ProjectSide communityId={communityId} />
      <MainPanel>
        <ControlPanel communityId={communityId} active={active} />
        <Content>{children}</Content>
      </MainPanel>
    </Wrap>
  )
}
