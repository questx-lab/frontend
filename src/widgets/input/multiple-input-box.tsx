import styled from 'styled-components'
import tw from 'twin.macro'

const MultipleInputBox = styled.textarea<{ danger?: boolean }>(({ danger = false }) => [
  danger
    ? tw`
        w-full
        border
        border-[1px]
        border-solid
        border-danger-500
        p-3
        rounded-lg
        h-full
        focus:border-danger-500
        focus:outline-danger-500
        focus:outline
        focus:ring-danger-500
      `
    : tw`
        w-full
        border
        border-[1px]
        border-solid
        border-primary-300
        p-3
        rounded-lg
        h-full
        font-normal
        focus:border-primary
        focus:outline-primary
        focus:ring-primary
      `,
])

export default MultipleInputBox
