import { FC } from 'react'

import tw from 'twin.macro'

import { Image } from '@/widgets/image'
import { BadgeType } from '@/types'
import { VerticalFullWidth } from '@/widgets/orientation'
import StorageConst from '@/constants/storage.const'

const BadgesBox = tw(VerticalFullWidth)`
  grid 
  grid-cols-4
  gap-4
`

const BadgeItem = tw.div`
  border-2
  rounded-lg
  p-4
`

const Badges: FC<{ badges: BadgeType[] }> = ({ badges }) => {
  return (
    <BadgesBox>
      {badges.map((badge: BadgeType) => {
        return (
          <BadgeItem>
            <Image width={70} height={70} src={badge.icon_url} alt={'Badge'} />
          </BadgeItem>
        )
      })}
    </BadgesBox>
  )
}

export default Badges
