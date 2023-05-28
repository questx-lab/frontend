import { LayoutWithLeftPanel } from '@/widgets/layout-with-left-panel'
import { Outlet } from 'react-router-dom'
import tw from 'twin.macro'

const FullWidth = tw.div`
  w-full
`

export const Communities = () => {
  return (
    <LayoutWithLeftPanel>
      <FullWidth>
        <Outlet />
      </FullWidth>
    </LayoutWithLeftPanel>
  )
}