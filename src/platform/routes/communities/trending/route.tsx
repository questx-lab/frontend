import { FunctionComponent } from 'react'

import { Outlet } from 'react-router-dom'
import tw from 'twin.macro'

import { VerticalCenter } from '@/widgets/orientation'

const FullWidth = tw(VerticalCenter)`
  w-full
`
const Trending: FunctionComponent = () => {
  return (
    <FullWidth>
      <Outlet />
    </FullWidth>
  )
}

export default Trending
