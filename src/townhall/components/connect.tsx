import { FC, useEffect } from 'react'

import { useStoreState } from 'easy-peasy'
import tw from 'twin.macro'

import WebSocket from '@/api/socket'
import { GlobalStoreModel } from '@/store/store'
import RoomStore from '@/store/townhall/room'
import phaserGame from '@/townhall/phaser-game'
import Bootstrap from '@/townhall/scenes/bootstrap'
import Game from '@/townhall/scenes/game'
import { UserType } from '@/types'
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
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)
  // TODO: hardcode roomId
  const roomId = 'c301556f-f09d-4afc-9804-cba2d4d705ff'
  const socket = new WebSocket(roomId)
  console.log('readyState', socket.socket?.readyState)

  useEffect(() => {
    // TODO: connect to server
    connectSocket()
  }, [socket])

  const connectSocket = async () => {
    if (!socket.socket) {
      return
    }
    if (socket.socket.readyState === socket.socket.OPEN) {
      setRoomJoined(true)
      handleConnect()
    }
    if (socket.socket.readyState === socket.socket.CLOSED) {
      // TODO: handle close connection
    }
  }

  const handleConnect = async () => {
    console.log('call')

    // TODO: hard connection
    const bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap
    bootstrap.launchGame()
    game.registerKeys()

    await bootstrap.network.jointoMap()

    // setTimeout(() => {
    //   if (user && game) {
    //     game.myPlayer.setPlayerName(user.name)
    //   }
    // }, 1000)
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
