'use client'
import { FunctionComponent } from 'react'

import { useStoreState } from 'easy-peasy'

import { Layout } from '@/components/layout'
import HomePage from '@/modules/home/home'
import LandingPage from '@/modules/home/landing-page'
import { GlobalStoreModel } from '@/store/store'

const Content: FunctionComponent = () => {
  const user = useStoreState<GlobalStoreModel>((state) => state.user)
  if (user) {
    return <HomePage />
  }

  return <LandingPage />
}

export default function Home() {
  const user = useStoreState<GlobalStoreModel>((state) => state.user)

  const isApp = user !== undefined

  return (
    <Layout isApp={isApp}>
      <Content />
    </Layout>
  )
}
