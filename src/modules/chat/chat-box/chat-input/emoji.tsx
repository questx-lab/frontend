import { FC, useState } from 'react'

import StorageConst from '@/constants/storage.const'
import { PopPover } from '@/widgets/popover'
import Picker from '@emoji-mart/react'

const Emoji: FC<{ onEmoji: (messgeEmoji: string) => void }> = ({ onEmoji }) => {
  const [isHovering, setIsHovering] = useState<boolean>(false)

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  const handleEmojiClick = (emoji: any) => {
    onEmoji(emoji.native)
  }

  return (
    <PopPover
      styled='right-0 mb-10 bottom-0'
      button={
        <img
          width={28}
          height={28}
          src={isHovering ? StorageConst.EMOJI.src : StorageConst.EMOJI_BLANK.src}
          alt=''
          className='cursor-pointer'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      }
    >
      <Picker onEmojiSelect={handleEmojiClick} />
    </PopPover>
  )
}

export default Emoji
