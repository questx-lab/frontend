import LandingPage from '@/modules/root/landing-page'
import { GlobalStoreModel } from '@/store/store'
import { useStoreState } from 'easy-peasy'
import { FunctionComponent } from 'react'
import { Outlet } from 'react-router-dom'

export const HomeOrLandingPage: FunctionComponent = () => {
  const user = useStoreState<GlobalStoreModel>((state) => state.user)
  if (!user) {
    return <LandingPage />
  }

  return <Outlet />
}
