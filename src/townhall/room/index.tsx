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
  const community = RoomStore.useStoreState((state) => state.community)
  console.log(community)
  return (
    <Backdrop id='phaser-container'>
      <Connectting />
    </Backdrop>
  )
}

export default Townhall
