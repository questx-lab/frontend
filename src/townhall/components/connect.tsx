import { FC, useState } from 'react'

import tw from 'twin.macro'

import RoomStore from '@/store/townhall/room'
import DialogConnect from '@/townhall/components/dialog-connect'
import { VerticalCenter } from '@/widgets/orientation'
import { TextBase } from '@/widgets/text'

const GapVertical = tw(VerticalCenter)`
  gap-4
`

export const Connectting: FC = () => {
  const roomJoined = RoomStore.useStoreState((state) => state.roomJoined)
  const [showDialog, setSetShowDialog] = useState<boolean>(true)

  const onCloseShowDialog = () => {
    setSetShowDialog(false)
  }

  if (roomJoined) {
    return <></>
  }

  return (
    <GapVertical>
      <TextBase> Connecting to server...</TextBase>
      <DialogConnect showDialog={showDialog} onCloseShowDialog={onCloseShowDialog} />
    </GapVertical>
  )
}
