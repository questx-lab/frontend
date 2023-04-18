'use client'

import React, { useEffect, useState } from 'react'

import LayoutDefault from '@/components/layouts/layout-default'
import { GameContextProvider } from '@/game/store'

type Player = {
  x: number
  y: number
}

function Townhall() {
  const [loading, setLoading] = useState<boolean>(true)

  const [phaserGame, setPhaserGame] = useState<Phaser.Game>()
  // Loader (for debug)
  async function initPhaser() {
    import('@/game/PhaserGame').then((mod) => {
      setPhaserGame(mod.default)
      if (mod.default!.scene.keys) {
        setLoading(false)
      }
    })
  }
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLoading(false)
      initPhaser()
    }
  }, [])

  return (
    <LayoutDefault>
      <header>
        <title>{'Townhall'}</title>
      </header>
      <div id='phaser-container'>
        {!loading && phaserGame && <GameContextProvider></GameContextProvider>}
      </div>
    </LayoutDefault>
  )
}

export default Townhall
