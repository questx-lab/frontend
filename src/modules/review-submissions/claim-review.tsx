import { ThinBorderBox } from '@/widgets/box'
import { Vertical } from '@/widgets/orientation'
import { Horizontal } from '@/widgets/orientation'
import { Label } from '@/widgets/text'
import { FunctionComponent } from 'react'
import tw from 'twin.macro'

const OuterFrame = tw(Horizontal)`
  w-full
  h-full
`

const ClaimColumn = tw(ThinBorderBox)`
  w-2/3
  h-full
  mt-8
  ml-8
  mr-4
`

const ClaimBox = tw(Vertical)`
  h-full
`

const QuestColumn = tw.div`
  w-1/3
  h-full
  pt-8
  pr-8
  pl-4
`

const ClaimReview: FunctionComponent = () => {
  return (
    <OuterFrame>
      <ClaimColumn>
        <ClaimBox>
          <Label>AAAA</Label>
        </ClaimBox>
      </ClaimColumn>
      <QuestColumn>Quest</QuestColumn>
    </OuterFrame>
  )
}

export default ClaimReview
