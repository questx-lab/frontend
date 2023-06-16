import { FC } from 'react'

import tw from 'twin.macro'

import StorageConst from '@/constants/storage.const'
import { UserType } from '@/types'
import { GrayBorderBox } from '@/widgets/box'
import { CircularImage } from '@/widgets/circular-image'
import {
  HorizontalFullWidth,
  Vertical,
  VerticalFullWidth,
  VerticalFullWidthHeight,
} from '@/widgets/orientation'
import { Divider, Gap } from '@/widgets/separator'
import { TextBase, TextXl } from '@/widgets/text'

const ContentFrame = tw(HorizontalFullWidth)`
  p-4
`

const LeftSideStyled = tw(GrayBorderBox)`
  w-1/3
  flex
  flex-col
  mr-2
`

const PersonVertical = tw(VerticalFullWidth)`
  justify-center
  items-center
  gap-2
`

const StatisticFrame = tw(Vertical)`
  p-4
`

const StatisticRowTitle = tw(TextBase)`
  flex
  flex-1
`

const LeftSide: FC<{ user: UserType }> = ({ user }) => {
  const StatisticRow: FC<{ title: string; value: string }> = ({ title, value }) => {
    return (
      <HorizontalFullWidth>
        <StatisticRowTitle>{title}</StatisticRowTitle>
        <TextBase>{value}</TextBase>
      </HorizontalFullWidth>
    )
  }

  return (
    <LeftSideStyled>
      <PersonVertical>
        <CircularImage
          width={120}
          height={120}
          src={user.avatar_url || StorageConst.USER_DEFAULT.src}
          alt={'Avatar'}
        />
        <TextXl>{user.name}</TextXl>
        <Gap height={8} />
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
    </LeftSideStyled>
  )
}

const UserProfile: FC<{ user: UserType }> = ({ user }) => {
  return (
    <VerticalFullWidthHeight>
      <Divider />
      <ContentFrame>
        <LeftSide user={user} />
      </ContentFrame>
    </VerticalFullWidthHeight>
  )
}

export default UserProfile
