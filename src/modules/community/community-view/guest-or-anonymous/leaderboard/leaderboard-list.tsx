import { FC, useEffect, useState } from 'react'

import toast from 'react-hot-toast'
import tw from 'twin.macro'

import { getLeaderboardApi } from '@/api/communitiy'
import { LeaderboardRangeEnum, LeaderboardSortType } from '@/constants/common.const'
import StorageConst from '@/constants/storage.const'
import CommunityStore from '@/store/local/community'
import { LeaderboardType } from '@/types'
import { CircularImage } from '@/widgets/circular-image'
import { Image } from '@/widgets/image'
import { HorizontalBetweenCenter, HorizontalCenter, VerticalCenter } from '@/widgets/orientation'
import { SmallSpinner } from '@/widgets/spinner'
import { NormalText, RewardText } from '@/widgets/text'

const PointerHorizontal = tw(HorizontalBetweenCenter)`
  relative
  py-2
  cursor-pointer
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

const CenterNormalText = tw(NormalText)`
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
        <CircularImage width={40} height={40} src={StorageConst.USER_DEFAULT.src} alt={'logo'} />
        <UsernameText>{ld.user?.name}</UsernameText>
      </GapHorizontalCenter>
      <RewardText>{ld.value}</RewardText>
    </PointerHorizontal>
  ))

  return <>{renderItems}</>
}

const RenderLeaderboard: FC<{
  range: LeaderboardRangeEnum
}> = ({ range }) => {
  const community = CommunityStore.useStoreState((state) => state.selectedCommunity)
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
