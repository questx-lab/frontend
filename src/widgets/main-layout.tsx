'use client'

import { FunctionComponent, ReactNode } from 'react'

import tw from 'twin.macro'

import { Layout } from '@/components/layout'
import ProjectSide from '@/components/sidebar'
import { Horizontal, VerticalFullWidthStartCenter } from '@/widgets/orientation'

export const Main = tw(VerticalFullWidthStartCenter)`
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
        <ProjectSide activeCommunityId={''} />
        <Main>{children}</Main>
      </Wrap>
    </Layout>
  )
}
