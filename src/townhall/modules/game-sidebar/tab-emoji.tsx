import { FC } from 'react'

import tw from 'twin.macro'

import { MessageReceiverEnum } from '@/constants/townhall'
import RoomStore, { ActiveSidebarTab } from '@/store/townhall/room'
import phaserGame from '@/townhall/engine/services/game-controller'
import network from '@/townhall/engine/services/network'
import { Vertical, VerticalCenter } from '@/widgets/orientation'
import { FaceSmileIcon } from '@heroicons/react/24/outline'
import { Tooltip } from '@material-tailwind/react'

const emojies = [
  '🙂',
  '😀',
  '😃',
  '😄',
  '😁',
  '😅',
  '😆',
  '🤣',
  '😂',
  '🙃',
  '😉',
  '😊',
  '😇',
  '😎',
  '🤓',
  '🧐',
  '🥳',
  '🥰',
  '😍',
  '😘',
  '😗',
  '😚',
  '😙',
  '🥲',
  '😐',
  '🤐',
  '🤨',
  '😶',
]

const Frame = tw.div`
  absolute
  right-[80px]
  w-48
  max-h-[200px]
  bg-white
  rounded-lg
  overflow-y-scroll
`

const Grid = tw.div`
  grid
  grid-cols-4
  gap-2
  p-2
  w-full
  h-full
`

const Icon = tw(VerticalCenter)`
  p-1
  rounded-full
  hover:bg-gray-100
  cursor-pointer
`

const EmojiFrame: FC<{ isShow: boolean }> = ({ isShow }) => {
  // const game = phaserGame.scene.keys.game as Game
  // const bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap

  // action
  const setActiveTab = RoomStore.useStoreActions((action) => action.toggleTab)

  if (!isShow) {
    return <></>
  }

  const listEmojies = emojies.map((emoji, index) => (
    <Icon
      key={index}
      onClick={() => {
        network.send({
          type: MessageReceiverEnum.EMOJI,
          value: {
            emoji,
          },
        })
        phaserGame.setMyPlayerEmoji(emoji)

        setActiveTab(ActiveSidebarTab.NONE)
      }}
    >
      {emoji}
    </Icon>
  ))

  return (
    <Frame>
      <Grid>{listEmojies}</Grid>
    </Frame>
  )
}

const Emoji: FC = () => {
  const activeTab = RoomStore.useStoreState((state) => state.activeTab)

  // action
  const toggleTab = RoomStore.useStoreActions((action) => action.toggleTab)

  return (
    <>
      <Tooltip content={'Emoji'} placement='right'>
        <Vertical>
          <FaceSmileIcon
            onClick={() => toggleTab(ActiveSidebarTab.EMOJI)}
            className='cursor-pointer w-7 h-7 text-gray-900'
          />
        </Vertical>
      </Tooltip>
      <EmojiFrame isShow={activeTab === ActiveSidebarTab.EMOJI} />
    </>
  )
}

const TabEmoji: FC = () => {
  return (
    <Tooltip content={'Emoji'} placement='right'>
      <Vertical>
        <Emoji />
      </Vertical>
    </Tooltip>
  )
}

export default TabEmoji