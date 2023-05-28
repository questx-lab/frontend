import { Gap } from '@/styles/common.style'
import { RequireSignal } from '@/styles/input.style'
import { ThinBorderBox } from '@/widgets/box'
import { Horizontal, VerticalFullWidth } from '@/widgets/orientation'
import { FunctionComponent, ReactNode } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

const Padding = tw(VerticalFullWidth)`
  py-2
  px-6
  gap-4
`

const Label = tw(Horizontal)`
  gap-1
  items-center
  text-lg
  font-medium
  text-gray-900
`

/**
 * This is a bounding box around several fields in the create quest flow.
 * @returns
 */
export const QuestFieldsBox: FunctionComponent<{
  title: string
  children: ReactNode
  required?: boolean
}> = ({ title, children, required = false }) => {
  return (
    <>
      <ThinBorderBox>
        <Padding>
          <Label>
            {title}
            {required && <RequireSignal>{'*'}</RequireSignal>}
          </Label>
          {children}
        </Padding>
      </ThinBorderBox>
      <Gap height={8} />
    </>
  )
}

export const TypeButton = styled.div<{ active?: boolean }>(({ active = false }) => {
  if (active) {
    return tw`
      py-2
      px-3
      bg-primary-100
      border-solid
      border-[1px]
      border-primary-100
      rounded-lg
      cursor-pointer
      mr-2
      mt-2
      text-sm
      text-primary-500
      font-medium
    `
  }

  return tw`
    py-2
    px-3
    border-solid
    border-[1px]
    border-gray-200
    rounded-lg
    bg-white
    cursor-pointer
    mr-2
    mt-2
    text-sm
    text-black
    font-medium
  `
})

export const TypeButtonFrame = tw.div`
  flex
  flex-wrap
  justify-start
  items-center
  w-full
`
