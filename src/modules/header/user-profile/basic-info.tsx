import { FC } from 'react'

import tw from 'twin.macro'

import { UserType } from '@/types'
import { UserAvatar } from '@/widgets/avatar'
import { GrayBorderBox } from '@/widgets/box'
import { HorizontalFullWidth, Vertical, VerticalFullWidth } from '@/widgets/orientation'
import { Divider, Gap } from '@/widgets/separator'
import { MediumTextSm, TextSm, TextXl } from '@/widgets/text'

const BorderBox = tw(GrayBorderBox)`
  w-1/3
  flex
  flex-col
  pt-8
  rounded-lg
  max-sm:w-full
`

const PersonVertical = tw(VerticalFullWidth)`
  justify-center
  items-center
  gap-2
`

const StatisticFrame = tw(Vertical)`
  p-4
`

const StatisticRowTitle = tw(MediumTextSm)`
  flex
  flex-1
`

const BasicInfo: FC<{ user: UserType }> = ({ user }) => {
  const StatisticRow: FC<{ title: string; value: string }> = ({ title, value }) => {
    return (
      <HorizontalFullWidth>
        <StatisticRowTitle>{title}</StatisticRowTitle>
        <TextSm>{value}</TextSm>
      </HorizontalFullWidth>
    )
  }

  return (
    <BorderBox>
      <PersonVertical>
        <UserAvatar size={120} user={user} />
        <TextXl>{user.name}</TextXl>
        <Gap height={4} />
        <Divider />
      </PersonVertical>
      <StatisticFrame>
        <StatisticRow
          title={'Quest Completed'}
          value={`${user.total_claimed_quests}`}
        ></StatisticRow>
        <Gap />
        <StatisticRow title={'Community Joined'} value={`${user.total_communities}`}></StatisticRow>
      </StatisticFrame>
    </BorderBox>
  )
}

export default BasicInfo
