import { FC } from 'react'

import tw from 'twin.macro'

import { GameState } from '@/townhall/engine/services/game-state'
import useGameState from '@/townhall/hooks/use-game-state'
import { VerticalCenter } from '@/widgets/orientation'
import { TextBase } from '@/widgets/text'

const GapVertical = tw(VerticalCenter)`
  gap-4
`

export const Connectting: FC = () => {
  const gameState = useGameState()

  if (gameState !== GameState.BOOTSTRAP && gameState !== GameState.CONNECTING) {
    return <></>
  }

  return (
    <GapVertical>
      <TextBase> Connecting to server...</TextBase>
    </GapVertical>
  )
}
