import { FC } from 'react'

import tw from 'twin.macro'

import phaserGame from '@/townhall/engine/services/game-controller'
import { ItemType } from '@/types/townhall'
import { CloseIcon } from '@/widgets/image'
import { Vertical, VerticalFullWidth } from '@/widgets/orientation'

const Frame = tw(Vertical)`
`

const FullVertical = tw(VerticalFullWidth)`
  items-end
  bg-white
  p-2
`

const Iframe = tw.iframe`
  w-[450px]
  h-[800px]
`

const GameSelector: FC<{ playerSelector: number }> = ({ playerSelector }) => {
  if (playerSelector !== ItemType.GAME) {
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
      <FullVertical>
        <CloseIcon onClick={onClose} />
      </FullVertical>
      <Iframe title='game' src='https://topfour.io/' allowFullScreen />
    </Frame>
  )
}

export default GameSelector
