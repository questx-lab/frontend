import styled from 'styled-components'
import tw from 'twin.macro'

import {
  HorizontalFullWidth,
  VerticalFullWidth,
  VerticalFullWidthHeight,
} from '@/widgets/orientation'
import { TextBase } from '@/widgets/text'

export const Content = tw(VerticalFullWidth)`
  w-full
  h-full
  gap-4
  p-4
`

export const MarginVertical = tw(VerticalFullWidthHeight)`
  border-2
  border-solid
  border-gray-300
  rounded-lg
  p-5
  gap-4
`

export const GapHorizontal = tw(HorizontalFullWidth)`
  justify-end
  gap-4
`

export const HorizontalFullWidthCenter = tw(HorizontalFullWidth)`
  items-center
  gap-4
`

export const FieldText = tw(TextBase)`
  w-1/3
  font-medium
`
export const InfoText = styled(TextBase)<{ highlight?: boolean }>(({ highlight = false }) => {
  const styles = [
    tw`
      p-4
      font-normal
      text-gray-700
      w-full
    `,
  ]
  if (highlight) {
    styles.push(tw`font-medium text-info`)
  }

  return styles
})
