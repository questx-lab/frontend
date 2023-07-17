import { FC } from 'react'

import EmojiPicker from 'emoji-picker-react'

import { PopPover } from '@/widgets/popover'
import { FaceSmileIcon } from '@heroicons/react/24/outline'

const Emoji: FC<{ onEmoji: (messgeEmoji: string) => void }> = ({ onEmoji }) => {
  const handleEmojiClick = (emoji: any) => {
    onEmoji(emoji.emoji)
  }

  return (
    <PopPover
      styled='right-0 mb-10 bottom-0'
      button={<FaceSmileIcon className='w-8 h-8 text-gray-900 cursor-pointer' />}
    >
      <EmojiPicker onEmojiClick={handleEmojiClick} />
    </PopPover>
  )
}

export default Emoji
