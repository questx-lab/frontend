'use client'
import { FunctionComponent } from 'react'

import { useStoreState } from 'easy-peasy'

import { Layout } from '@/components/layout'
import HomePage from '@/modules/home/home'
import LandingPage from '@/modules/home/landing-page'
import { GlobalStoreModel } from '@/store/store'

const Content: FunctionComponent<{ isLogin: boolean }> = ({ isLogin }) => {
  if (isLogin) {
    return <HomePage />
  }

  return <LandingPage />
}

export default function Home() {
  const isLogin: boolean = useStoreState<GlobalStoreModel>(
    (state) => state.isLogin
  )

  return (
    <Layout isApp={isLogin}>
      <header>
        <title>{'Xquest'}</title>
      </header>
      <Content isLogin />
    </Layout>
  )
}
