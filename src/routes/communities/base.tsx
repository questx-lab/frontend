import { CommunityStore } from '@/store/local/community'
import { LayoutWithLeftPanel } from '@/widgets/layout-with-left-panel'
import { Outlet } from 'react-router-dom'

export const Communities = () => {
  return (
    <CommunityStore.Provider>
      <LayoutWithLeftPanel>
        <Outlet />
      </LayoutWithLeftPanel>
    </CommunityStore.Provider>
  )
}
