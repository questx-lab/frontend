import { ProjectSide } from '@/modules/home/project-side/project-side'
import { Horizontal } from '@/widgets/orientation'
import { FunctionComponent } from 'react'
import { Outlet } from 'react-router-dom'
import tw from 'twin.macro'

const TopMargin = tw(Horizontal)`
  min-h-screen
  pt-[70px]
`

export const Home: FunctionComponent = () => {
  return (
    <>
      <TopMargin>
        <ProjectSide />
        <Outlet />
      </TopMargin>
    </>
  )
}
