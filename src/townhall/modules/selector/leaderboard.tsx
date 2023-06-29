import { FC } from 'react'

import tw from 'twin.macro'

import phaserGame from '@/townhall/engine/services/game-controller'
import { ItemType } from '@/types/townhall'
import { CloseIcon } from '@/widgets/image'
import { HorizontalBetweenCenter, Vertical } from '@/widgets/orientation'
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

const LeaderboardSelector: FC<{ playerSelector: number }> = ({ playerSelector }) => {
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
    </Frame>
  )
}

export default LeaderboardSelector
