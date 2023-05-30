import { AnswerStatusEnum } from '@/constants/common.const'
import styled from 'styled-components'
import tw from 'twin.macro'

// This comopnent is used as a border for answer in the quiz list.
export const AnswerBox = styled.button<{ status?: number; block?: boolean }>(
  ({ status = AnswerStatusEnum.DEFAULT, block = false }) => {
    const style = [
      tw`
        outline-0
        p-2
        flex
        flex-row
        items-center
        gap-2
        rounded-lg
        border
        border-solid
        border-gray-300
        cursor-pointer
        w-full
      `,
    ]

    switch (status) {
      case AnswerStatusEnum.DANGER:
        style.push(tw`
          border-danger-500
        `)
        break
      case AnswerStatusEnum.DEFAULT:
        style.push(tw`
          border-gray-300
        `)
        break
      case AnswerStatusEnum.ACTIVE:
        style.push(tw`
          border-success-500
          border-2
        `)
        break
    }

    if (block) {
      style.push(tw`text-gray-300 bg-gray-50 hover:cursor-not-allowed`)
    }

    return style
  }
)
