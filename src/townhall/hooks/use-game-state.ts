import { useEffect, useState } from 'react'

import phaserGame from '@/townhall/engine/services/game-controller'
import { GameState } from '@/townhall/engine/services/game-state'

export default function useGameState() {
  const [gameState, setGameState] = useState<GameState>(GameState.BOOTSTRAP)

  useEffect(() => {
    const listener = {
      onStateChanged: (state: GameState, data?: any) => {
        setGameState(state)
      },
    }

    phaserGame.addGameStateListeners(listener)

    return () => {
      phaserGame.removeGameStateListeners(listener)
    }
  }, [])

  return gameState
}
