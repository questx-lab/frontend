import { ProjectSide } from '@/modules/home/project-side/project-side'
import { Horizontal } from '@/widgets/orientation'
import { FunctionComponent } from 'react'
import { Outlet } from 'react-router-dom'
import tw from 'twin.macro'

const TopMargin = tw(Horizontal)`
  min-h-screen
  pt-[70px]
`

const LeftMargin = tw.div`
  pl-20
`

export const Home: FunctionComponent = () => {
  return (
    <>
      <TopMargin>
        <ProjectSide />
        <LeftMargin>
          <Outlet />
        </LeftMargin>
      </TopMargin>
    </>
  )
}
