import { FC, useEffect, useState } from 'react'

import toast from 'react-hot-toast'
import tw from 'twin.macro'

import { getLeaderboardApi } from '@/api/communitiy'
import { LeaderboardRangeEnum, LeaderboardSortType } from '@/constants/common.const'
import StorageConst from '@/constants/storage.const'
import { LeaderboardType } from '@/types'
import { CommunityType } from '@/types/community'
import { UserAvatar } from '@/widgets/avatar'
import { Image } from '@/widgets/image'
import {
  HorizontalBetweenCenter,
  HorizontalCenter,
  VerticalCenter,
  VerticalFullWidth,
} from '@/widgets/orientation'
import { SmallSpinner } from '@/widgets/spinner'
import { TextSm } from '@/widgets/text'

const PointerHorizontal = tw(HorizontalBetweenCenter)`
  relative
  py-2
  cursor-pointer
  w-full
`

const GapHorizontalCenter = tw(HorizontalCenter)`
  gap-3
`

const UsernameText = tw.span`
  max-w-[120px]
  font-normal
  text-danger
  text-lg 
  overflow-hidden
  text-ellipsis
`

const EmptyBox = tw(VerticalCenter)`
  w-full
  p-3
`

const CenterNormalText = tw(TextSm)`
  text-center
`

const Empty: FC = () => {
  return (
    <EmptyBox>
      <Image width={250} height={250} src={StorageConst.HUSKY.src} alt={StorageConst.HUSKY.alt} />
      <CenterNormalText>
        {
          'There is no information about the leaderboard yet. Create more quests and connect users to have this leaderboard.'
        }
      </CenterNormalText>
    </EmptyBox>
  )
}

const RenderList: FC<{ data: LeaderboardType[] }> = ({ data }) => {
  if (!data.length) {
    return <Empty />
  }

  const renderItems = data.map((ld, idx) => (
    <PointerHorizontal key={idx}>
      <GapHorizontalCenter>
        <UserAvatar size={32} user={ld.user} />
        <UsernameText>{ld.user?.name}</UsernameText>
      </GapHorizontalCenter>
      <TextSm>{ld.value}</TextSm>
    </PointerHorizontal>
  ))

  return <VerticalFullWidth>{renderItems}</VerticalFullWidth>
}

const RenderLeaderboard: FC<{
  range: LeaderboardRangeEnum
  community: CommunityType
}> = ({ range, community }) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    getLeaderboard()
  }, [community, range])

  const getLeaderboard = async () => {
    if (community.handle) {
      setLoading(true)
      try {
        // TODO: Support infinite scrolling here.
        const data = await getLeaderboardApi(community.handle, range, LeaderboardSortType.POINT, 50)
        if (data.error) {
          toast.error(data.error)
        }

        if (data.data && data.data?.leaderboard) {
          setLeaderboard(data.data?.leaderboard)
        }
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }
  }

  if (loading) {
    return <SmallSpinner />
  }

  return <RenderList data={leaderboard} />
}

export default RenderLeaderboard
