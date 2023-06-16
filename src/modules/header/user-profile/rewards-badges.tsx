import { FC } from 'react'

import tw from 'twin.macro'

import { Vertical } from '@/widgets/orientation'

const BoundingBox = tw(Vertical)`
  w-2/3
  flex
  flex-col
  ml-2
`

const ControlTabs: FC = () => {
  return <></>
}

const RewardsBadges: FC = () => {
  return <BoundingBox></BoundingBox>
}

export default RewardsBadges
