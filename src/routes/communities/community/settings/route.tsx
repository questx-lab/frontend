import { FunctionComponent } from 'react'

import { Outlet } from 'react-router-dom'

import NewCommunityStore from '@/store/local/new-community.store'

export const Settings: FunctionComponent = () => {
  return (
    <NewCommunityStore.Provider>
      <Outlet />
    </NewCommunityStore.Provider>
  )
}
