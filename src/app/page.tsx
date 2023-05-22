'use client'
import { FunctionComponent } from 'react'

import { useStoreState } from 'easy-peasy'

import { Layout } from '@/components/layout'
import HomePage from '@/modules/home/home'
import LandingPage from '@/modules/home/landing-page'
import { GlobalStoreModel } from '@/store/store'

const Content: FunctionComponent = () => {
  const isLogin = useStoreState<GlobalStoreModel>((state) => state.isLogin)
  if (isLogin) {
    return <HomePage />
  }

  return <LandingPage />
}

export default function Home() {
  const isLogin = useStoreState<GlobalStoreModel>((state) => state.isLogin)

  return (
    <Layout isApp={isLogin} isFull={false}>
      <header>
        <title>{'Xquest'}</title>
      </header>
      <Content />
    </Layout>
  )
}
