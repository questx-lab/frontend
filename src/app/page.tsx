'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import Layout from '@/components/layouts/layout'
import { Spinner } from '@/components/spinner/spinner'
import { RouterConst } from '@/constants/router.const'
import Project from '@/modules/project'
import { useStoreActions, useStoreState } from '@/store/store'
import { getAccessToken } from '@/utils/helper'

import { GetUserApi } from './api/client/user'

export default function Home() {
  const router = useRouter()
  const isLogin = useStoreState((state) => state.userSession.isLogin)
  const userState = useStoreState((state) => state.userSession.user)
  const [loading, setLoading] = useState<boolean>(true)
  const actionLogin = useStoreActions(
    (action) => action.userSession.updateState
  )

  const actionUser = useStoreActions((action) => action.userSession.updateUser)
  useEffect(() => {
    setLoading(true)
    const accessToken = getAccessToken()
    if (accessToken) {
      actionLogin(true)
      if (!Object.keys(userState).length) {
        getUserDatta()
      }
    }
    if (!accessToken && !isLogin) {
      router.push(RouterConst.EXPLORE)
    }
    setTimeout(() => setLoading(false), 1000)
  }, [isLogin])

  const getUserDatta = async () => {
    try {
      const user = await GetUserApi()
      actionUser(user.data)
    } catch (error) {}
  }

  return (
    <Layout>
      <header>
        <title>{'Home Page'}</title>
      </header>
      {!loading && <Project />}
      {loading && <Spinner />}
    </Layout>
  )
}
