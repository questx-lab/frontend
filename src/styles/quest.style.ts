import styled from 'styled-components'
import tw from 'twin.macro'

import { AnswerStatusEnum } from '@/constants/project.const'
import { Horizontal, Vertical, VerticalFullWidth } from '@/widgets/orientation'

export const TWrap = tw(Horizontal)`
  min-h-screen
  pt-[80px]
`

export const TMain = tw(VerticalFullWidth)`
  px-[80px]
  max-lg:px-[16px]
  py-2
`

export const TActions = tw.div`
  grid
  grid-cols-3
  gap-3
  max-lg:grid-cols-2
  max-sm:grid-cols-1
  w-full
  justify-between
`

export const TEWrap = tw(VerticalFullWidth)`
  mb-14
  max-lg:mb-12
`
export const TBox = tw(Horizontal)`
  items-center
`

export const TCheckBox = tw.input`
  cursor-pointer
  focus:outline-none
  focus-visible:outline-none
  w-4
  h-4
  text-gray-600
  bg-gray-800
  border-gray-300
  rounded
`

export const TEBox = tw(Horizontal)`
  w-full
  h-[80px]
  border-2
  border-solid
  border-gray-200
  rounded-lg
`

export const TImg = styled.div<{ disable?: boolean }>(({ disable = false }) => [
  disable
    ? tw`
  h-[80px]
  w-[80px]
  bg-gray-400
  rounded-l-lg
`
    : tw`
  h-[80px]
  w-[80px]
  bg-black
  rounded-l-lg
`,
])

export const TEEBox = tw(Vertical)`
  p-2
`

export const TEText = tw.p`
  text-sm
  font-light
  text-black
`

export const QuestQuizBox = tw(Vertical)`
  gap-2
  mt-4
`

export const AnswerWrap = tw(Vertical)`
  gap-3
`

export const AnswerBox = styled.div<{ status?: number }>(
  ({ status = AnswerStatusEnum.DEFAULT }) => [
    status === AnswerStatusEnum.DANGER &&
      tw`
    p-2
    flex
    flex-row
    items-center
    gap-2
    rounded-lg
    border
    border-solid
    border-danger-500
    cursor-pointer
  `,
    status === AnswerStatusEnum.DEFAULT &&
      tw`
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
  `,
    status === AnswerStatusEnum.ACTIVE &&
      tw`
    p-2
    flex
    flex-row
    items-center
    gap-2
    rounded-lg
    border-2
    border-solid
    border-success-500
    cursor-pointer
  `,
    status === AnswerStatusEnum.BLOCK &&
      tw`

    p-2
    flex
    flex-row
    items-center
    gap-2
    rounded-lg
    border
    border-solid
    border-gray-300
    cursor-not-allowed
    `,
  ]
)

export const SquareBox = tw.div`
  w-12
  h-12
  text-lg
  font-medium
  text-black
  bg-gray-100
  rounded-lg
  flex
  justify-center
  items-center
`

export const AnswerInput = tw.input`
  border-0
  outline-0
  ring-0
  w-full
  h-full
  text-lg
`

export const AnswerText = styled.div<{ status?: number }>(
  ({ status = AnswerStatusEnum.DEFAULT }) => [
    status === AnswerStatusEnum.DEFAULT &&
      tw`
  w-full
  h-full
  text-lg
  font-normal
  text-gray-700
`,
    status === AnswerStatusEnum.BLOCK &&
      tw`
w-full
h-full
text-lg
font-normal
text-gray-300
`,
  ]
)
