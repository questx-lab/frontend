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
`

const UserProfile: FC<{ user: UserType }> = ({ user }) => {
  return (
    <VerticalFullWidthHeight>
      <Divider />
      <ContentFrame>
        <BasicInfo user={user} />
        <RewardsBadges />
      </ContentFrame>
    </VerticalFullWidthHeight>
  )
}

export default UserProfile
