import { useEffect, useState } from 'react'

import RoomStore from '@/store/townhall/room'
import phaserGame from '@/townhall/engine/services/game-controller'
import { GameState } from '@/townhall/engine/services/game-state'

export default function useGameState() {
  const [gameState, setGameState] = useState<GameState>(GameState.BOOTSTRAP)

  const setRoomJoined = RoomStore.useStoreActions((action) => action.setRoomJoined)

  useEffect(() => {
    const listener = {
      onStateChanged: (state: GameState, data?: any) => {
        setGameState(state)

        switch (state) {
          case GameState.JOINED_ROOM:
            setRoomJoined(true)
            break
        }
      },
    }

    phaserGame.addGameStateListeners(listener)

    return () => {
      phaserGame.removeGameStateListeners(listener)
    }
  }, [])

  return gameState
}
