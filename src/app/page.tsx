'use client'

import { useEffect, useState } from 'react'

import Layout from '@/components/layouts/layout'
import { Spinner } from '@/components/spinner/spinner'
import { useStoreState } from '@/store/store'

export default function Home() {
  const isLogin = useStoreState((state) => state.userSession.isLogin)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1000)
  }, [isLogin])

  return (
    <Layout>
      <header>
        <title>{'Home Page'}</title>
      </header>
      {/* {!loading && <Project />} */}
      {loading && <Spinner />}
    </Layout>
  )
}
