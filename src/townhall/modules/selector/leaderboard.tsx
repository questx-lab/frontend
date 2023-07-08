import { FC } from 'react'

import tw from 'twin.macro'

import { LeaderboardType } from '@/constants/common.const'
import Leaderboard from '@/modules/community/community-view/guest-or-anonymous/leaderboard'
import RoomStore from '@/store/townhall/room'
import phaserGame from '@/townhall/engine/services/game-controller'
import { ItemType } from '@/types/townhall'
import { CloseIcon } from '@/widgets/image'
import { HorizontalBetweenCenter, Vertical, VerticalFullWidth } from '@/widgets/orientation'
import { Divider } from '@/widgets/separator'
import { TextXl } from '@/widgets/text'

const Frame = tw(Vertical)`
  w-[480px]
  my-[158px]
  h-full
  bg-white
  rounded-lg
  overflow-y-scroll
  border-2
  border-solid
  border-gray-900
`

const PaddingHorizontal = tw(HorizontalBetweenCenter)`
  w-full
  p-5
`

const LeaderboardFrame = tw(VerticalFullWidth)`
  h-full
`

const LeaderboardSelector: FC<{ playerSelector: number }> = ({ playerSelector }) => {
  const community = RoomStore.useStoreState((state) => state.community)

  if (playerSelector !== ItemType.LEADERBOARD) {
    return <></>
  }

  const onClose = () => {
    phaserGame.changePlayerSelectorListeners(ItemType.NONE)
    if (phaserGame.isPaused) {
      phaserGame.resume()
    }
  }

  return (
    <Frame>
      <PaddingHorizontal>
        <TextXl>{'Leaderboard'}</TextXl>
        <CloseIcon onClick={onClose} />
      </PaddingHorizontal>
      <Divider />
      <LeaderboardFrame>
        <Leaderboard type={LeaderboardType.TOWNHALL} community={community} />
      </LeaderboardFrame>
    </Frame>
  )
}

export default LeaderboardSelector
