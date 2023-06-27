import { Link } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

import { VerticalFullWidth } from '@/widgets/orientation'

export const NavigateBox = tw(VerticalFullWidth)`
  gap-2
  mx-2
  mt-2
`

export const NavigateOption = styled(Link)<{ isactive: boolean }>(({ isactive }) => {
  const style = [
    tw`
    w-full
    px-2
    py-3
    text-lg
    font-normal
    text-gray-700
    rounded-lg
  `,
  ]

  if (isactive) {
    style.push(tw`
    bg-primary-50
    text-primary
  `)
  }
  return style
})
