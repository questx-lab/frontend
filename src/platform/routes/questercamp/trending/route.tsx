import { FC, useEffect } from 'react'

import { Outlet } from 'react-router-dom'
import tw from 'twin.macro'

import { AnalyticPage } from '@/utils/analytic'
import { VerticalCenter } from '@/widgets/orientation'

const FullWidth = tw(VerticalCenter)`
  w-full
`

const Trending: FC = () => {
  useEffect(() => {
    AnalyticPage({
      path: window.location.pathname,
      title: 'Trending Questcamp',
    })
  }, [])

  return (
    <FullWidth>
      <Outlet />
    </FullWidth>
  )
}

export default Trending
