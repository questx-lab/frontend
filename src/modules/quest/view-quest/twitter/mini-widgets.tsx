import styled from 'styled-components'
import tw from 'twin.macro'

import { ColorEnum } from '@/constants/common.const'
import { HorizontalBetweenCenter, HorizontalStartCenter } from '@/widgets/orientation'

export const ActionTwitterFrame = tw(HorizontalBetweenCenter)`
  gap-4
  w-full
`

export const WarningBox = styled(HorizontalStartCenter)<{ boxColor?: number }>(
  ({ boxColor = ColorEnum.NONE }) => {
    const style = [
      tw`
      w-full
      rounded-lg
      bg-white
      border
      border-solid
      border-gray-300
      p-3
      text-lg
      font-normal
      text-gray-700
      text-start
    `,
    ]

    switch (boxColor) {
      case ColorEnum.PRIMARY:
        style.push(tw`
        bg-primary-50
        border-primary
      `)
        break
      case ColorEnum.WARNING:
        style.push(tw`
        bg-warning-50
        border-warning
      `)
        break
      case ColorEnum.DANGER:
        style.push(tw`
        bg-danger-50
        border-danger
      `)
        break
    }

    return style
  }
)
