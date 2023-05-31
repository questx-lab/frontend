import { Divider, Gap } from '@/styles/common.style'
import { Vertical } from '@/widgets/orientation'
import { Label } from '@/widgets/text'
import { FunctionComponent } from 'react'
import tw from 'twin.macro'

const ClaimBox = tw(Vertical)`
  h-full
`

const SubmissionFrame = tw(Vertical)`
  p-4
`

const ReviewFrame = tw(Vertical)`
  p-4
`

const ClaimInfo: FunctionComponent = () => {
  return (
    <ClaimBox>
      <SubmissionFrame>
        <Label>SUBMISSION</Label>
        <Gap />
        {
          // TODO: Show the claim details based on what user submits.
          'TODO: COMPLETE THIS'
        }
      </SubmissionFrame>
      <Divider />
      <ReviewFrame>
        <Label>REVIEW</Label>
      </ReviewFrame>
    </ClaimBox>
  )
}

export default ClaimInfo
