import { Outlet } from 'react-router-dom'
import tw from 'twin.macro'

import { LayoutWithLeftPanel } from '@/widgets/layout/layout-with-left-panel'

const FullWidth = tw.div`
  w-full
`

const Communities = () => {
  return (
    <LayoutWithLeftPanel>
      <FullWidth>
        <Outlet />
      </FullWidth>
    </LayoutWithLeftPanel>
  )
}

export default Communities
