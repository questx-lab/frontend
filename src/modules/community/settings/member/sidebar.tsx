import { FC } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import { CommunitySettingSidebar } from '@/constants/common.const'
import { Vertical } from '@/widgets/orientation'

const Frame = tw(Vertical)`
  w-[168px]
  fixed
  h-full
`

const TabItem = styled.div<{ isTap: boolean }>(({ isTap }) => {
  const styles = [tw`px-4 py-3 text-sm w-full cursor-pointer rounded-lg`]
  if (isTap) {
    styles.push(tw`bg-primary-100 font-medium text-primary`)
  } else {
    styles.push(tw`bg-white font-normal text-gray-700`)
  }

  return styles
})

const MemberSidebar: FC<{
  tabSide: CommunitySettingSidebar
  onTabSide: (tab: CommunitySettingSidebar) => void
}> = ({ tabSide, onTabSide }) => {
  const renderTab = Object.values(CommunitySettingSidebar).map((value, index) => (
    <TabItem key={index} onClick={() => onTabSide(value)} isTap={value === tabSide}>
      {value}
    </TabItem>
  ))

  return <Frame>{renderTab}</Frame>
}
export default MemberSidebar