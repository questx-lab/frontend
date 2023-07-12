import { FC } from 'react'

import { isMobile } from 'react-device-detect'
import styled from 'styled-components'
import tw from 'twin.macro'

import { MessageReceiverEnum } from '@/constants/townhall'
import RoomStore, { ActiveSidebarTab } from '@/store/townhall/room'
import phaserGame from '@/townhall/engine/services/game-controller'
import network from '@/townhall/engine/services/network'
import { VerticalCenter } from '@/widgets/orientation'

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

const Frame = styled.div<{ isMobile: boolean }>(({ isMobile }) => {
  const styles = [
    tw`
    absolute
    max-h-[200px]
    bg-white
    rounded-lg
    overflow-y-scroll
    w-48
`,
  ]

  if (!isMobile) {
    styles.push(tw`
      right-[80px]
      `)
  } else {
    styles.push(tw`
      bottom-[160px]
      `)
  }

  return styles
})

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
    <Frame isMobile={isMobile}>
      <Grid>{listEmojies}</Grid>
    </Frame>
  )
}

const TabEmoji: FC = () => {
  const activeTab = RoomStore.useStoreState((state) => state.activeTab)
  return <EmojiFrame isShow={activeTab === ActiveSidebarTab.EMOJI} />
}

export default TabEmoji
