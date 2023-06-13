import { FC, ReactNode } from 'react'

import { useStoreState } from 'easy-peasy'
import styled from 'styled-components'
import tw from 'twin.macro'

import CommunitiesNavigation from '@/modules/community/communities-navigation'
import { GlobalStoreModel } from '@/store/store'
import { Horizontal } from '@/widgets/orientation'

const TopMargin = tw(Horizontal)`
  min-h-screen
  pt-[64px]
`

export const MainContent = tw.div`
  max-sm:px-3
  md:px-8
  xl:w-[980px]
  md:w-[780px]
  w-full
`

const LeftMargin = styled.div<{ hasUser: boolean }>(({ hasUser }) => {
  if (hasUser) {
    return tw`
      pl-20
      w-full
      max-sm:pl-0
    `
  }

  return tw`w-full`
})

export const LayoutWithLeftPanel: FC<{ children: ReactNode }> = ({ children }) => {
  const user = useStoreState<GlobalStoreModel>((state) => state.user)

  return (
    <>
      <TopMargin>
        <CommunitiesNavigation />
        <LeftMargin hasUser={user !== undefined}>{children}</LeftMargin>
      </TopMargin>
    </>
  )
}
