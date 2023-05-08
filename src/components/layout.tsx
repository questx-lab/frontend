import { ReactNode, useEffect } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/navigation'
import { Toaster } from 'react-hot-toast'

import { getUserApi } from '@/app/api/client/user'
import Header from '@/components/header'
import { useStoreActions, useStoreState } from '@/store/store'
import { Html, Main } from '@/styles/layout.style'
import { getAccessToken, getRefreshToken, setUserLocal } from '@/utils/helper'

export const LayoutDefault = ({ children }: { children: ReactNode }) => {
  const isNavBar = useStoreState((state) => state.navBar.isOpen)

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
  const isNavBar = useStoreState((state) => state.navBar.isOpen)
  const loginAction = useStoreActions(
    (action) => action.userSession.updateState
  )
  const isLogin = useStoreState((state) => state.userSession.isLogin)
  const actionUser = useStoreActions((action) => action.userSession.updateUser)
  const userState = useStoreState((state) => state.userSession.user)

  const router = useRouter()
  useEffect(() => {
    const refreshToken = getRefreshToken()
    const accessToken = getAccessToken()

    if (refreshToken && !accessToken) {
      getUserData()
    }

    if (accessToken) {
      !isLogin && loginAction(true)
      if (userState && !Object.keys(userState).length) {
        getUserData()
      }
    } else {
      loginAction(false)
      // router.push(RouterConst.EXPLORE)
    }
  }, [router])

  const getUserData = async () => {
    try {
      const user = await getUserApi()
      setUserLocal(user.data!)
      actionUser(user.data!)
      loginAction(true)
    } catch (error) {}
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
