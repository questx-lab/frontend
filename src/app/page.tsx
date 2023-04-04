'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import Layout from '@/components/layouts/layout'
import { Spinner } from '@/components/spinner/spinner'
import { RouterConst } from '@/constants/router.const'
import HomeModule from '@/modules/home'
import { useStoreState } from '@/store/store'

export default function Home() {
  const router = useRouter()
  const isLogin = useStoreState((state) => state.userSession.isLogin)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setLoading(isLogin)
    if (!isLogin) {
      router.push(RouterConst.EXPLORE)
    }
  }, [isLogin, router])

  return (
    <Layout>
      <header>
        <title>{'Home Page'}</title>
      </header>
      {loading && <HomeModule />}
      {!loading && <Spinner />}
    </Layout>
  )
}
