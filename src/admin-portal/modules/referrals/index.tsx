import tw from 'twin.macro'

import { VerticalFullWidth } from '@/widgets/orientation'
import { Text2xl } from '@/widgets/text'

import ReferralContent from './referral-table'

export default function Referral() {
  const GapVertical = tw(VerticalFullWidth)`
  gap-6
  p-6
`

  return (
    <GapVertical>
      <Text2xl>{'Referral Tracking'}</Text2xl>
      <ReferralContent />
    </GapVertical>
  )
}
