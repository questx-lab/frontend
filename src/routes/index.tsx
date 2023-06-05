import { FunctionComponent } from 'react'

import { Outlet } from 'react-router-dom'

import ActiveQuestStore from '@/store/local/active-quest'
import CommunityStore from '@/store/local/community'
import NewQuestStore from '@/store/local/new-quest'

export const HomePage: FunctionComponent = () => {
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
