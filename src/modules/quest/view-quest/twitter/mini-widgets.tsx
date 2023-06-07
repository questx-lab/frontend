import styled from 'styled-components'
import tw from 'twin.macro'

import { ColorEnum, SizeEnum } from '@/constants/common.const'
import { HorizontalBetweenCenter, HorizontalStartCenter } from '@/widgets/orientation'

export const ActionTwitterFrame = tw(HorizontalBetweenCenter)`
  gap-4
  w-full
`

export const ColorBox = styled(HorizontalStartCenter)<{ boxColor?: number; width?: number }>(
  ({ boxColor = ColorEnum.NONE, width = SizeEnum.FULL }) => {
    const style = [
      tw`
      rounded-lg
      bg-white
      border
      border-solid
      border-gray-300
      px-3
      py-2
      text-lg
      font-normal
      text-gray-700
      text-start
      gap-2
    `,
    ]

    switch (width) {
      case SizeEnum.NONE:
        break
      case SizeEnum.FULL:
        style.push(tw`w-full`)
        break
    }

    switch (boxColor) {
      case ColorEnum.PRIMARY:
        style.push(tw`
        bg-primary-50
        border-primary
        text-primary
      `)
        break
      case ColorEnum.WARNING:
        style.push(tw`
        bg-warning-50
        border-warning
        text-warning
      `)
        break
      case ColorEnum.SUCCESS:
        style.push(tw`
          bg-success-50
          border-success
          text-success
        `)
        break
      case ColorEnum.DANGER:
        style.push(tw`
        bg-danger-50
        border-danger
        text-danger
      `)
        break
    }

    return style
  }
)
