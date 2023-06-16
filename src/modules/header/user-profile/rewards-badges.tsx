import { FC } from 'react'

import tw from 'twin.macro'

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

const RewardsBadges: FC = () => {
  return (
    <BoundingBox>
      <ControlTabs></ControlTabs>
    </BoundingBox>
  )
}

export default RewardsBadges
