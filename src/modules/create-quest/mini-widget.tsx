import { FC, ReactNode } from 'react'

import tw from 'twin.macro'

import { RoundedGrayBorderBox } from '@/widgets/box'
import { Horizontal, VerticalFullWidth } from '@/widgets/orientation'
import { RequiredText } from '@/widgets/text'

const Padding = tw(VerticalFullWidth)`
  px-6
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
export const QuestFieldsBox: FC<{
  title?: string
  children: ReactNode
  required?: boolean
}> = ({ title, children, required = false }) => {
  return (
    <RoundedGrayBorderBox>
      <Padding>
        <FieldTitle title={title} required={required} />
        {children}
      </Padding>
    </RoundedGrayBorderBox>
  )
}

export const FieldTitle: FC<{ title?: string; required?: boolean }> = ({ title, required }) => {
  return (
    <Label>
      {title}
      {required && <RequiredText>{'*'}</RequiredText>}
    </Label>
  )
}
