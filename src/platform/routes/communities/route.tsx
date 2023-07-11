import { useEffect } from 'react'

import { Outlet } from 'react-router-dom'
import tw from 'twin.macro'

import { AnalyticPage } from '@/utils/analytic'
import { LayoutWithLeftPanel } from '@/widgets/layout/layout-with-left-panel'

const FullWidth = tw.div`
  w-full
`

const Communities = () => {
  useEffect(() => {
    AnalyticPage({
      path: window.location.pathname,
      title: 'Community page',
    })
  }, [])

  return (
    <LayoutWithLeftPanel>
      <FullWidth>
        <Outlet />
      </FullWidth>
    </LayoutWithLeftPanel>
  )
}

export default Communities
