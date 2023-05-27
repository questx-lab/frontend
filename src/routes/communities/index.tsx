import { CommunityStore } from '@/store/local/community'
import { LayoutWithLeftPanel } from '@/widgets/layout-with-left-panel'
import { Outlet } from 'react-router-dom'

export const Communities = () => {
  console.log('This is community')

  return (
    <CommunityStore.Provider>
      <LayoutWithLeftPanel>
        <Outlet />
      </LayoutWithLeftPanel>
    </CommunityStore.Provider>
  )
}
