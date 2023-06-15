import tw from 'twin.macro'

import CommunityContent from '@/admin-portal/modules/communities/community-table'
import { VerticalFullWidth } from '@/widgets/orientation'
import { Text2xl } from '@/widgets/text'

export default function Community() {
  const GapVertical = tw(VerticalFullWidth)`
    gap-6
    p-6
  `

  return (
    <GapVertical>
      <Text2xl>{'Community Tracking'}</Text2xl>
      <CommunityContent />
    </GapVertical>
  )
}
