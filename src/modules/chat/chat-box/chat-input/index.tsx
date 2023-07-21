import { FC, useState } from 'react'

import tw from 'twin.macro'

import { HorizontalFullWidthCenter } from '@/admin-portal/modules/referrals/mini-widget'
import AudioRecord from '@/modules/chat/chat-box/chat-input/audio-record'
import Emoji from '@/modules/chat/chat-box/chat-input/emoji'
import { InputBoxBorder } from '@/modules/chat/chat-box/chat-input/mini-widget'
import { HorizontalCenter } from '@/widgets/orientation'

const InputEmojiBox = tw(HorizontalCenter)`
  pl-5
  pr-2
  gap-2
  rounded-full
  bg-gray-200
  w-full
  py-2
`

const Frame = tw(HorizontalFullWidthCenter)`
  gap-2
`

const ChatInput: FC<{ onNewMessagedEntered: (s: string) => void }> = ({ onNewMessagedEntered }) => {
  const [inputMessage, setInputMessage] = useState<string>('')
  const [enterdTime, setEnterTime] = useState<number>(0)
  const [isRecord, setIsRecord] = useState<boolean>(false)

  const handleKeyboardEvent = (event: React.KeyboardEvent) => {
    const now = Date.now()
    // Prevent unikey from triggering enter twice.
    if (event.key === 'Enter' && now - enterdTime > 300 && !event.shiftKey) {
      event.preventDefault()
      onNewMessagedEntered(inputMessage)
      setInputMessage('')
      setEnterTime(now)
    }
  }

  const onEmoji = (emoji: string) => {
    setInputMessage(inputMessage + emoji)
  }

  const onChangeRecord = (isRecord: boolean) => {
    setIsRecord(isRecord)
  }

  if (isRecord) {
    return <AudioRecord onChangeRecord={onChangeRecord} />
  }

  return (
    <Frame>
      {/* <PopPover
        styled='w-[200px] mb-10 bottom-0'
        button={<PlusCircleIcon className='w-8 h-8 text-gray-900' />}
      >
        <AdditionBox onClick={() => onChangeRecord(true)}>
          <MicrophoneIcon className='w-6 h-6 text-gray-900' />
          <TextSm>{'Record sound'}</TextSm>
        </AdditionBox>

        <UploadImage />
      </PopPover> */}
      <InputEmojiBox>
        <InputBoxBorder
          rows={1}
          value={inputMessage}
          onKeyDown={handleKeyboardEvent}
          onChange={(e) => {
            setInputMessage(e.target.value)
          }}
        />
        <Emoji onEmoji={onEmoji} />
      </InputEmojiBox>
    </Frame>
  )
}

export default ChatInput
