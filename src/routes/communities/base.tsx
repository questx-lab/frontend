import { LayoutWithLeftPanel } from '@/widgets/layout-with-left-panel'
import { Outlet } from 'react-router-dom'

export const Communities = () => {
  return (
    <LayoutWithLeftPanel>
      <Outlet />
    </LayoutWithLeftPanel>
  )
}
