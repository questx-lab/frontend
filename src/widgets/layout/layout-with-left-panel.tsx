import { FunctionComponent, ReactNode } from 'react'

import { useStoreState } from 'easy-peasy'
import styled from 'styled-components'
import tw from 'twin.macro'

import { CommunitiesNavigationn } from '@/modules/communities-navigation/navigation'
import { GlobalStoreModel } from '@/store/store'
import { Horizontal } from '@/widgets/orientation'

const TopMargin = tw(Horizontal)`
  min-h-screen
  pt-[70px]
`

const LeftMargin = styled.div<{ hasUser: boolean }>(({ hasUser }) => {
  if (hasUser) {
    return tw`
      pl-20
      w-full
    `
  }

  return tw`w-full`
})

export const LayoutWithLeftPanel: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const user = useStoreState<GlobalStoreModel>((state) => state.user)

  return (
    <>
      <TopMargin>
        <CommunitiesNavigationn />
        <LeftMargin hasUser={user !== undefined}>{children}</LeftMargin>
      </TopMargin>
    </>
  )
}
