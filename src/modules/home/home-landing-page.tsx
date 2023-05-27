import { Home } from '@/modules/home/home'
import LandingPage from '@/modules/home/landing-page'
import { GlobalStoreModel } from '@/store/store'
import { useStoreState } from 'easy-peasy'
import { FunctionComponent } from 'react'

export const HomeOrLandingPage: FunctionComponent = () => {
  const user = useStoreState<GlobalStoreModel>((state) => state.user)

  console.log('user = ', user)

  if (!user) {
    return <LandingPage />
  }

  // delCookies()
  // delUserLocal()

  return <Home />
}
