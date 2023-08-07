import { FC, useState } from 'react'

import tw from 'twin.macro'

import { HorizontalFullWidthCenter } from '@/admin-portal/modules/referrals/mini-widget'
import AudioRecord from '@/modules/chat/chat-box/chat-input/audio-record'
import Emoji from '@/modules/chat/chat-box/chat-input/emoji'
import InputBox from '@/modules/chat/chat-box/chat-input/input-box'
import { InputEmojiBox } from '@/modules/chat/chat-box/chat-input/mini-widget'
import UploadAssets from '@/modules/chat/chat-box/chat-input/upload-assets'
import { PopPover } from '@/widgets/popover'
import { PaperAirplaneIcon } from '@heroicons/react/20/solid'
import { PlusCircleIcon } from '@heroicons/react/24/outline'

const Frame = tw(HorizontalFullWidthCenter)`
  gap-2
`

const ChatInput: FC<{ onNewMessagedEntered: (s: string) => void }> = ({ onNewMessagedEntered }) => {
  const [inputMessage, setInputMessage] = useState<string>('')
  const [isRecord, setIsRecord] = useState<boolean>(false)

  const onEmoji = (emoji: string) => {
    setInputMessage(inputMessage + emoji)
  }

  const onInputMessage = (s: string) => {
    setInputMessage(s)
  }

  const onChangeRecord = (isRecord: boolean) => {
    setIsRecord(isRecord)
  }

  if (isRecord) {
    return <AudioRecord onChangeRecord={onChangeRecord} />
  }

  const onSend = () => {
    onNewMessagedEntered(inputMessage)
    onInputMessage('')
  }

  return (
    <Frame>
      <PopPover
        styled='w-[200px] mb-10 bottom-0'
        button={<PlusCircleIcon className='w-8 h-8 text-gray-900' />}
      >
        <UploadAssets />
      </PopPover>
      <InputEmojiBox>
        <InputBox
          onInputMessage={onInputMessage}
          inputMessage={inputMessage}
          onNewMessagedEntered={onNewMessagedEntered}
        />
        <PaperAirplaneIcon
          onClick={onSend}
          className='select-none cursor-pointer w-6 h-6 text-info'
        />
      </InputEmojiBox>
      <Emoji onEmoji={onEmoji} />
    </Frame>
  )
}

export default ChatInput
