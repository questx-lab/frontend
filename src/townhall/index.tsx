import '@/townhall/phaser-game'

import { FC } from 'react'

import tw from 'twin.macro'

import RoomStore from '@/store/townhall/room'
import { Connectting } from '@/townhall/components/connect'
import { VerticalCenter } from '@/widgets/orientation'

const Backdrop = tw(VerticalCenter)`
  absolute
  w-full
  h-full
`

const Townhall: FC = () => {
  return (
    <RoomStore.Provider>
      <Backdrop id='phaser-container'>
        <Connectting />
      </Backdrop>
    </RoomStore.Provider>
  )
}

export default Townhall
