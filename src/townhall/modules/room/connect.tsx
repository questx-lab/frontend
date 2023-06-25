import { FC, useEffect } from 'react'

import tw from 'twin.macro'

import RoomStore from '@/store/townhall/room'
import DialogConnect from '@/townhall/modules/room/dialog-connect'
import { VerticalCenter } from '@/widgets/orientation'
import { TextBase } from '@/widgets/text'

const GapVertical = tw(VerticalCenter)`
  gap-4
`

export const Connectting: FC = () => {
  const roomJoined = RoomStore.useStoreState((state) => state.roomJoined)

  useEffect(() => {
    // if (phaserGame.isPaused) {
    //   phaserGame.resume()
    // }
  }, [])

  if (roomJoined) {
    return <></>
  }

  return (
    <GapVertical>
      <TextBase> Connecting to server...</TextBase>
      <DialogConnect />
    </GapVertical>
  )
}
