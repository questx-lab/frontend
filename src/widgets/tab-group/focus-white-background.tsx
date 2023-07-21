import styled from 'styled-components'
import tw from 'twin.macro'

import { Horizontal } from '@/widgets/orientation'

// This is the tab used in the "Review Submission" or Settings of a community. It has a property
// where the focused tab has a white background and primary text color.
export const Tab = tw(Horizontal)`
  w-full
  bg-gray-100
  border-y
  border-solid
  border-gray-200
  max-2xl:px-12
  max-lg:px-6
  justify-center
  items-center
`

export const TabItem = styled.div<{ active?: boolean; tabCount?: number }>(
  ({ active = false, tabCount = 2 }) => {
    const style = [
      tw`
        border-x
        border-solid
        border-gray-200
        cursor-pointer
        py-4
        text-sm
        font-bold
        flex
        flex-row
        justify-center
        items-center
      `,
    ]

    switch (tabCount) {
      case 1:
        style.push(tw`w-full`)
        break
      case 2:
        style.push(tw`w-1/2`)
        break
      case 3:
        style.push(tw`w-1/3`)
        break
      case 4:
        style.push(tw`w-1/4`)
        break
      case 5:
        style.push(tw`w-1/5`)
        break
    }

    if (active) {
      style.push(tw`
        bg-white
        text-primary
       
      `)
    } else {
      style.push(tw`
        bg-gray-100
        text-gray-900
      `)
    }

    return style
  }
)
