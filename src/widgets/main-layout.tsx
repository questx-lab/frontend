'use client'

import { Layout } from '@/components/layout'
import ProjectSide from '@/components/sidebar'
import { FunctionComponent, ReactNode } from 'react'
import tw from 'twin.macro'
import { Horizontal, VerticalFullWidth } from '@/widgets/orientation'

export const Main = tw(VerticalFullWidth)`
  pl-[100px]
  pr-[40px]
  max-lg:pr-[10px]
  max-lg:pl-[80px]
  py-2
`

export const Wrap = tw(Horizontal)`
  min-h-screen
  pt-[70px]
`

export const MainLayout: FunctionComponent<{
  title?: string
  children: ReactNode
}> = ({ title, children }) => {
  return (
    <Layout>
      <header>
        <title>{title}</title>
      </header>
      <Wrap>
        <ProjectSide />
        <Main>{children}</Main>
      </Wrap>
    </Layout>
  )
}
