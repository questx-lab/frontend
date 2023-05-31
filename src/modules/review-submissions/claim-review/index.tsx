import ClaimInfo from '@/modules/review-submissions/claim-review/claim-info'
import { ThinBorderBox } from '@/widgets/box'
import { Horizontal } from '@/widgets/orientation'
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
        <ClaimInfo />
      </ClaimColumn>
      <QuestColumn>Quest</QuestColumn>
    </OuterFrame>
  )
}

export default ClaimReview
