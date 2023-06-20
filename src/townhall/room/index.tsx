import '@/townhall/phaser-game'

import { FC } from 'react'

import tw from 'twin.macro'

import { Connectting } from '@/townhall/components/connect'
import GameSidebar from '@/townhall/components/game-sidebar'
import { VerticalCenter } from '@/widgets/orientation'

const Backdrop = tw(VerticalCenter)`
  absolute
  w-full
  h-full
`

const Townhall: FC = () => {
  return (
    <Backdrop id='phaser-container'>
      <Connectting />
      <GameSidebar />
    </Backdrop>
  )
}

export default Townhall
