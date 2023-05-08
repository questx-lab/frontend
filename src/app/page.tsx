'use client'

import { useEffect, useState } from 'react'

import { useStoreState } from 'easy-peasy'

import { Layout } from '@/components/layout'
import { GlobalStoreModel } from '@/store/store'
import { Spinner } from '@/widgets/spinner'

export default function Home() {
  const isLogin = useStoreState<GlobalStoreModel>((state) => state.isLogin)
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
