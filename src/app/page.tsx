'use client'
import { FunctionComponent } from 'react'

import { useStoreState } from 'easy-peasy'

import { Layout } from '@/components/layout'
import HomePage from '@/modules/home/home'
import LandingPage from '@/modules/home/landing-page'
import { GlobalStoreModel } from '@/store/store'

const Content: FunctionComponent = () => {
  const user = useStoreState<GlobalStoreModel>((state) => state.user)
  console.log('AAA 2222 user = ', user)

  if (user) {
    return <HomePage />
  }

  return <LandingPage />
}

export default function Home() {
  const user = useStoreState<GlobalStoreModel>((state) => state.user)

  const isApp = user && Object.values(user).length

  return (
    <Layout isApp={isApp} isFull={false}>
      <header>
        <title>{'Xquest'}</title>
      </header>
      <Content />
    </Layout>
  )
}
