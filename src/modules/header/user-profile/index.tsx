import { FC } from 'react'

import tw from 'twin.macro'

import BasicInfo from '@/modules/header/user-profile/basic-info'
import RewardsBadges from '@/modules/header/user-profile/rewards-badges'
import { UserType } from '@/types'
import { HorizontalFullWidth, VerticalFullWidthHeight } from '@/widgets/orientation'
import { Divider } from '@/widgets/separator'

const ContentFrame = tw(HorizontalFullWidth)`
  py-4
  px-8
  max-sm:flex-col
  gap-4
`

const FixedHeight = tw(VerticalFullWidthHeight)`
  max-h-[calc(100vh_-_160px)]
  overflow-y-scroll
`

const UserProfile: FC<{ user: UserType }> = ({ user }) => {
  return (
    <FixedHeight>
      <Divider />
      <ContentFrame>
        <BasicInfo user={user} />
        <RewardsBadges user={user} />
      </ContentFrame>
    </FixedHeight>
  )
}

export default UserProfile
