import { FunctionComponent, ReactNode } from 'react'

import tw from 'twin.macro'

import { VerticalFullWidth } from '@/widgets/orientation'
import { Divider, Gap } from '@/widgets/separator'
import { Label, SmallText } from '@/widgets/text'

export const OuterBox = tw(VerticalFullWidth)`
  py-2
  gap-4
`

export const Padding = tw(VerticalFullWidth)`
  py-2
  gap-4
`

export const SubtypeBox: FunctionComponent<{
  title: string
  description?: string
  children: ReactNode
}> = ({ title, description, children }) => {
  let descriptionView = <></>
  if (description) {
    descriptionView = (
      <>
        <Gap height={2} />
        <SmallText>{description}</SmallText>
      </>
    )
  }
  return (
    <>
      <Divider />
      <Padding>
        <Label>{title}</Label>
        <Gap height={2} />
        {children}
        {descriptionView}
      </Padding>
    </>
  )
}
