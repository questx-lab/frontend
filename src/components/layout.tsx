import { ReactNode, useEffect } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import { toast, Toaster } from 'react-hot-toast'

import { getFollowProjectApi, getMyProjectsApi } from '@/app/api/client/project'
import { getUserApi } from '@/app/api/client/user'
import Header from '@/components/header'
import { GlobalStoreModel } from '@/store/store'
import { Html, Main } from '@/styles/layout.style'
import { getAccessToken, getRefreshToken, setUserLocal } from '@/utils/helper'

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

export const Layout = ({ children }: { children: ReactNode }) => {
  // data
  const isNavBar = useStoreState<GlobalStoreModel>((state) => state.navBar)
  const isLogin = useStoreState<GlobalStoreModel>((state) => state.isLogin)
  const userState = useStoreState<GlobalStoreModel>((state) => state.user)

  // action
  const setLogin = useStoreActions<GlobalStoreModel>(
    (action) => action.setLogin
  )
  const setUser = useStoreActions<GlobalStoreModel>((action) => action.setUser)
  const setProjectsFollowing = useStoreActions<GlobalStoreModel>(
    (action) => action.setProjectsFollowing
  )
  const setProjectCollab = useStoreActions<GlobalStoreModel>(
    (action) => action.setProjectCollab
  )

  const router = useRouter()
  useEffect(() => {
    const refreshToken = getRefreshToken()
    const accessToken = getAccessToken()

    if (refreshToken && !accessToken) {
      handleInit()
    }

    if (accessToken) {
      if (!isLogin) {
        setLogin(true)
      }
      if (userState && !Object.keys(userState).length) {
        handleInit()
      }
    } else {
      setLogin(false)
      // router.push(RouterConst.EXPLORE)
    }
  }, [router])

  const handleInit = () => {
    getUserData()
    getProjectsFollowing()
    getMyProjects()
  }

  const getUserData = async () => {
    try {
      const user = await getUserApi()
      setUserLocal(user.data!)
      setUser(user.data!)
      setLogin(true)
    } catch (error) {}
  }

  const getProjectsFollowing = async () => {
    try {
      const projects = await getFollowProjectApi()
      if (projects.error) {
        toast.error('Error when get your following projects')
      } else {
        if (projects.data?.projects) {
          setProjectsFollowing(projects.data?.projects)
        }
      }
    } catch (error) {
      toast.error('Server error')
    }
  }

  const getMyProjects = async () => {
    try {
      const projects = await getMyProjectsApi()
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
          <Header />
        </Main>
        <Toaster position='top-center' reverseOrder={false} />
      </body>
    </Html>
  )
}
