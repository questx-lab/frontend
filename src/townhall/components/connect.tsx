import { FC, useEffect } from 'react'

import tw from 'twin.macro'

import RoomStore from '@/store/townhall/room'
import phaserGame from '@/townhall/phaser-game'
import Bootstrap from '@/townhall/scenes/bootstrap'
import Game from '@/townhall/scenes/game'
import { VerticalCenter } from '@/widgets/orientation'
import { SmallSpinner } from '@/widgets/spinner'
import { TextBase } from '@/widgets/text'

const GapVertical = tw(VerticalCenter)`
  gap-4
`

export const Connectting: FC = () => {
  const roomJoined = RoomStore.useStoreState((state) => state.roomJoined)
  const game = phaserGame.scene.keys.game as Game
  const setRoomJoined = RoomStore.useStoreActions((action) => action.setRoomJoined)

  useEffect(() => {
    // TODO: connect to server
    setTimeout(() => {
      setRoomJoined(true)
      handleConnect()
    }, 5000)
  }, [])

  const handleConnect = () => {
    const bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap
    bootstrap.launchGame()
  }

  if (roomJoined) {
    return <></>
  }

  return (
    <GapVertical>
      <TextBase> Connecting to server...</TextBase>
      <SmallSpinner />
    </GapVertical>
  )
}
