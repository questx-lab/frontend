import LandingPage from '@/routes/landing-page'
import { ActiveQuestStore } from '@/store/local/active-quest'
import { CommunityStore } from '@/store/local/community'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { GlobalStoreModel } from '@/store/store'
import { useStoreState } from 'easy-peasy'
import { FunctionComponent } from 'react'
import { Outlet } from 'react-router-dom'

export const HomeOrLandingPage: FunctionComponent = () => {
  const user = useStoreState<GlobalStoreModel>((state) => state.user)
  if (!user) {
    return <LandingPage />
  }

  return (
    <CommunityStore.Provider>
      <NewQuestStore.Provider>
        <ActiveQuestStore.Provider>
          <Outlet />
        </ActiveQuestStore.Provider>
      </NewQuestStore.Provider>
    </CommunityStore.Provider>
  )
}
