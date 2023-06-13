import { FC } from 'react'

import { Outlet } from 'react-router'
import tw from 'twin.macro'

import Header from '@/admin-portal/modules/header'
import ControlPanel from '@/admin-portal/modules/portal/control-panel'
import { FullWidthHeight, Horizontal, Vertical } from '@/widgets/orientation'

const ContentFrame = tw(FullWidthHeight)`
  pt-[64px]
  pl-80
`

const FixedFrame = tw(Vertical)`
  fixed
  w-80
  h-full
  divide-y
  divide-gray-200
  border-r
  border-gray-200
  mt-[64px] // This matches the height of the header
`

const Portal: FC = () => {
  return (
    <Horizontal>
      <FixedFrame>
        <ControlPanel />
      </FixedFrame>

      <ContentFrame>
        <Outlet />
      </ContentFrame>

      <Header />
    </Horizontal>
  )
}

export default Portal
