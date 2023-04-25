import { ReactNode, useEffect } from 'react'

import { useRouter } from 'next/navigation'
import { Toaster } from 'react-hot-toast'

import { getUserApi, refreshTokenApi } from '@/app/api/client/user'
import Header from '@/components/headers/header'
import { useStoreActions, useStoreState } from '@/store/store'
import { Html, Main } from '@/styles/layout.style'
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  setUserLocal,
} from '@/utils/helper'

const Layout = ({ children }: { children: ReactNode }) => {
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
      loginUser(refreshToken)
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

  const loginUser = async (refreshToken: string) => {
    try {
      const data = await refreshTokenApi(refreshToken)
      if (data.data) {
        setAccessToken(data.data.access_token)
        setRefreshToken(data.data.refresh_token)
        loginAction(true)
      }
      getUserData()
    } catch (error) {}
  }

  const getUserData = async () => {
    try {
      const user = await getUserApi()
      setUserLocal(user.data!)
      actionUser(user.data!)
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

export default Layout
