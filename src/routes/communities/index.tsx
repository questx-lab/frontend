import { CommunityStore } from '@/store/local/community'
import { Outlet } from 'react-router-dom'

export const Communities = () => {
  return (
    <CommunityStore.Provider>
      <Outlet />
    </CommunityStore.Provider>
  )
}
