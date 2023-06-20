import { FC } from 'react'

import { useStoreState } from 'easy-peasy'
import tw from 'twin.macro'

import ClaimHistory from '@/modules/header/user-profile/claim-history'
import { GlobalStoreModel } from '@/store/store'
import { UserType } from '@/types'
import { Vertical } from '@/widgets/orientation'
import { Tab, TabItem } from '@/widgets/tab-group/focus-light-primary'

const BoundingBox = tw(Vertical)`
  w-2/3
  flex
  flex-col
  ml-2
`

const ControlTabs: FC = () => {
  return (
    <Tab>
      <TabItem active={true} tabCount={1} position={0}>
        {'HISTORY'}
      </TabItem>
    </Tab>
  )
}

const RewardsBadges: FC<{ user: UserType }> = ({ user }) => {
  // TODO: Add badges and ranking
  const me: UserType = useStoreState<GlobalStoreModel>((state) => state.user)
  if (user.id !== me.id) {
    return <></>
  }

  return (
    <BoundingBox>
      <ControlTabs />

      <ClaimHistory user={user} />
    </BoundingBox>
  )
}

export default RewardsBadges
