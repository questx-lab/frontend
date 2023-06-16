import styled from 'styled-components'
import tw from 'twin.macro'

import { Horizontal } from '@/widgets/orientation'

// This tab is used in the in the user profile where the focused tab has light primary background
// color and primary color for the text.
export const Tab = tw(Horizontal)`
  w-full
  justify-center
  items-center
`

export const TabItem = styled.div<{ active: boolean; tabCount: number; position: number }>(
  ({ active, tabCount, position }) => {
    const style = [
      tw`
        flex
        flex-row
        justify-center
        items-center
        text-sm
        font-medium
        py-4
        border-y
        border-solid
        border-gray-300
        cursor-pointer
      `,
    ]

    if (active) {
      style.push(tw`
        bg-primary-100
        text-primary
      `)
    } else {
      style.push(tw`
        bg-white
        text-black
      `)
    }

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

    // Rounded border
    if (position === tabCount - 1) {
      style.push(tw`rounded-r-lg border-r`)
    }
    if (position === 0) {
      style.push(tw`rounded-l-lg border-l`)
    }

    // Left or right vertical border
    if (position > 0) {
      // Add left border
      style.push(tw`border-l`)
    }

    return style
  }
)
