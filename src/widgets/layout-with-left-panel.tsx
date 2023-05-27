import { ProjectSide } from '@/modules/root/project-side/project-side'
import { GlobalStoreModel } from '@/store/store'
import { UserType } from '@/utils/type'
import { Horizontal } from '@/widgets/orientation'
import { useStoreState } from 'easy-peasy'
import { FunctionComponent, ReactNode } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

const TopMargin = tw(Horizontal)`
  min-h-screen
  pt-[70px]
`

const LeftMargin = styled.div<{ hasUser: boolean }>(({ hasUser }) => {
  if (hasUser) {
    return tw`
      pl-20
    `
  }

  return tw``
})

export const LayoutWithLeftPanel: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const user = useStoreState<GlobalStoreModel>((state) => state.user)

  return (
    <>
      <TopMargin>
        <ProjectSide />
        <LeftMargin hasUser={user !== undefined}>{children}</LeftMargin>
      </TopMargin>
    </>
  )
}
