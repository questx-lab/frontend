import { useEffect, useState } from 'react'

import phaserGame from '@/townhall/engine/services/game-controller'
import { ItemType } from '@/types/townhall'

export default function usePlayerSelector() {
  const [playerSelector, setPlayerSelector] = useState<ItemType>(ItemType.NONE)

  useEffect(() => {
    const listener = {
      onStateChanged: (state: ItemType, data?: any) => {
        setPlayerSelector(state)
      },
    }

    phaserGame.addPlayerSelectorListeners(listener)

    return () => {
      phaserGame.removePlayerSelectorListeners(listener)
    }
  }, [])

  return playerSelector
}
