import styled from 'styled-components'
import tw from 'twin.macro'

export enum CheckBoxSize {
  SMALL,
  MEDIUM,
}

export const CheckBox = styled.input<{ size?: CheckBoxSize }>(({ size = CheckBoxSize.SMALL }) => {
  switch (size) {
    case CheckBoxSize.MEDIUM:
      return tw`
        cursor-pointer
        focus:outline-none
        focus-visible:outline-none
        w-5
        h-5
        text-white
        bg-gray-800
        border-gray-300
        rounded
        mr-4
      `
    default:
      // default is small size
      return tw`
        cursor-pointer
        focus:outline-none
        focus-visible:outline-none
        w-4
        h-4
        text-white
        bg-gray-800
        border-gray-300
        rounded
        mr-4
      `
  }
})
