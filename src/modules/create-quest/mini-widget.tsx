import { FunctionComponent, ReactNode } from 'react'

import tw from 'twin.macro'

import { Gap } from '@/styles/common.style'
import { RequireSignal } from '@/styles/input.style'
import { RoundedGrayBorderBox } from '@/widgets/box'
import { Horizontal, VerticalFullWidth } from '@/widgets/orientation'

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
      <RoundedGrayBorderBox>
        <Padding>
          <FieldTitle title={title} required={required} />
          {children}
        </Padding>
      </RoundedGrayBorderBox>
      <Gap height={8} />
    </>
  )
}

export const FieldTitle: FunctionComponent<{ title: string; required?: boolean }> = ({
  title,
  required,
}) => {
  return (
    <Label>
      {title}
      {required && <RequireSignal>{'*'}</RequireSignal>}
    </Label>
  )
}
