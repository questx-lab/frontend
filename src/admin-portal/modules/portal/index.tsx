import { FC } from 'react'

import { Outlet } from 'react-router'
import tw from 'twin.macro'

import Header from '@/admin-portal/modules/header'
import ControlPanel from '@/admin-portal/modules/portal/control-panel'
import { Vertical } from '@/widgets/orientation'

const ContentFrame = tw.div`
  fixed
  mt-[70px] // header height
  ml-80 // left panel width
`

const FixedFrame = tw(Vertical)`
  fixed
  w-80
  h-full
  divide-y
  divide-gray-200
  border-r
  border-gray-200
  mt-[70px] // This matches the height of the header
`

const Portal: FC = () => {
  return (
    <>
      <Header />

      <FixedFrame>
        <ControlPanel />
      </FixedFrame>

      <ContentFrame>
        <Outlet />
      </ContentFrame>
    </>
  )
}

export default Portal
