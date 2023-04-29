'use client'

import React, { useEffect } from 'react'

import { LayoutDefault } from '@/components/layout'

function Townhall() {
  // Loader
  async function initPhaser() {
    await import('@/game/PhaserGame')
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      initPhaser()
    }
  }, [])

  return (
    <LayoutDefault>
      <header>
        <title>{'Townhall'}</title>
      </header>
    </LayoutDefault>
  )
}

export default Townhall
