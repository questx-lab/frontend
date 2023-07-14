import { FC } from 'react'

import EmojiPicker from 'emoji-picker-react'

import { PopPanel } from '@/townhall/modules/room/chat/input-box'
import { PopoverButton, PopoverPosition } from '@/widgets/popover'
import { FaceSmileIcon } from '@heroicons/react/24/outline'

const Emoji: FC<{ onEmoji: (messgeEmoji: string) => void }> = ({ onEmoji }) => {
  const handleEmojiClick = (emoji: any) => {
    onEmoji(emoji.emoji)
  }

  return (
    <PopoverPosition>
      <PopoverButton>
        <FaceSmileIcon className='w-8 h-8 text-gray-900 cursor-pointer' />
      </PopoverButton>
      <PopPanel isRight>
        <EmojiPicker onEmojiClick={handleEmojiClick} />
      </PopPanel>
    </PopoverPosition>
  )
}

export default Emoji
