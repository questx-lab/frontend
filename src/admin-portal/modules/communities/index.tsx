import { FC } from 'react'

import tw from 'twin.macro'

import CommunityContent from '@/admin-portal/modules/communities/community-table'
import { VerticalFullWidth } from '@/widgets/orientation'
import { Text2xl } from '@/widgets/text'

const GapVertical = tw(VerticalFullWidth)`
    gap-6
    p-6
  `

const Community: FC = () => {
  return (
    <GapVertical>
      <Text2xl>{'Community Tracking'}</Text2xl>
      <CommunityContent />
    </GapVertical>
  )
}

export default Community
