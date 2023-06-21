import { FC, useState } from 'react'

import tw from 'twin.macro'

import Bootstrap from '@/townhall/engine/scenes/bootstrap'
import Game from '@/townhall/engine/scenes/game'
import phaserGame from '@/townhall/phaser-game'
import { VerticalCenter } from '@/widgets/orientation'
import { FaceSmileIcon } from '@heroicons/react/24/outline'

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
  const game = phaserGame.scene.keys.game as Game
  const bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap

  if (!isShow) {
    return <></>
  }

  const listEmojies = emojies.map((emoji) => (
    <Icon
      onClick={() => {
        game.myPlayer.setBackgoundEmoji('🗨')
        game.myPlayer.setPlayerEmoji(emoji)
        bootstrap.network.sendEmoji(emoji)
        setTimeout(() => {
          bootstrap.network.sendEmoji('')
          game.myPlayer.setPlayerEmoji('')
          game.myPlayer.setBackgoundEmoji('')
        }, 2000)
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
  const [showEmoji, setShowEmoji] = useState<boolean>(false)

  return (
    <>
      <FaceSmileIcon
        onClick={() => setShowEmoji(!showEmoji)}
        className='cursor-pointer w-7 h-7 text-gray-900'
      />
      <EmojiFrame isShow={showEmoji} />
    </>
  )
}

export default Emoji
