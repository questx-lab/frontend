import { FC, useState } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import { HorizontalFullWidthCenter } from '@/admin-portal/modules/referrals/mini-widget'
import AudioRecord from '@/townhall/modules/room/chat/input-box/audio-record'
import Emoji from '@/townhall/modules/room/chat/input-box/emoji'
import { AdditionBox, InputBoxBorder } from '@/townhall/modules/room/chat/input-box/mini-widget'
import UploadImage from '@/townhall/modules/room/chat/input-box/upload-image'
import { HorizontalCenter } from '@/widgets/orientation'
import { PopoverButton, PopoverPosition } from '@/widgets/popover'
import { TextSm } from '@/widgets/text'
import { Popover } from '@headlessui/react'
import { MicrophoneIcon, PlusCircleIcon } from '@heroicons/react/24/outline'

const InputEmojiBox = tw(HorizontalCenter)`
  pl-5
  pr-2
  gap-2
  rounded-full
  bg-gray-200
  w-full
`

const Frame = tw(HorizontalFullWidthCenter)`
  gap-2
`

export const PopPanel = styled(Popover.Panel)<{ isRight?: boolean }>(({ isRight }) => {
  const styles = [
    tw`
    divide-y
    bottom-10
    rounded-lg
    mt-5
    absolute z-10
    bg-white
    shadow-lg
    border
    border-solid
    border-gray-300
    flex
    flex-col
  `,
  ]

  if (isRight) {
    styles.push(tw`right-0`)
  } else {
    styles.push(tw`w-[200px]`)
  }

  return styles
})

const InputBox: FC<{ onNewMessagedEntered: (s: string) => void }> = ({ onNewMessagedEntered }) => {
  const [inputMessage, setInputMessage] = useState<string>('')
  const [enterdTime, setEnterTime] = useState<number>(0)
  const [isRecord, setIsRecord] = useState<boolean>(false)

  const handleKeyboardEvent = (event: React.KeyboardEvent) => {
    const now = Date.now()
    // Prevent unikey from triggering enter twice.
    if (event.key === 'Enter' && now - enterdTime > 300) {
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
      <PopoverPosition>
        <PopoverButton>
          <PlusCircleIcon className='w-8 h-8 text-gray-900' />
        </PopoverButton>
        <PopPanel>
          <AdditionBox onClick={() => onChangeRecord(true)}>
            <MicrophoneIcon className='w-6 h-6 text-gray-900' />
            <TextSm>{'Record sound'}</TextSm>
          </AdditionBox>

          <UploadImage />
        </PopPanel>
      </PopoverPosition>
      <InputEmojiBox>
        <InputBoxBorder
          value={inputMessage}
          onKeyDown={handleKeyboardEvent}
          onChange={(e) => {
            setInputMessage(e.target.value)
            e.stopPropagation()
          }}
        />
        <Emoji onEmoji={onEmoji} />
      </InputEmojiBox>
    </Frame>
  )
}

export default InputBox
