import React, { ChangeEvent, FC, useRef, useState } from 'react'

import tw from 'twin.macro'

import { HorizontalFullWidthCenter } from '@/admin-portal/modules/referrals/mini-widget'
import { AdditionBox } from '@/modules/chat/chat-box/chat-input/mini-widget'
import chatController from '@/modules/chat/services/chat-controller'
import ChatStore from '@/store/chat/chat'
import { Image } from '@/widgets/image'
import BasicModal from '@/widgets/modal/basic'
import { HorizontalFullWidth, VerticalFullWidth } from '@/widgets/orientation'
import { TextSm } from '@/widgets/text'
import { FolderPlusIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'

const SendButton = tw(HorizontalFullWidthCenter)`
  flex-1
  gap-2
  p-2
`

const InputBoxStyle = tw.textarea`
  p-2
  w-full
  outline-0
  bg-gray-200
  resize-none
`

const UploadAssets: FC = () => {
  // data
  const currentChannel = ChatStore.useStoreState((state) => state.selectedChannel)
  const selectedAssetsUri = ChatStore.useStoreState((state) => state.selectedAssetsUri)

  // actions
  const setSelectedAssetsUri = ChatStore.useStoreActions((actions) => actions.setSelectedAssetsUri)

  const [inputMessage, setInputMessage] = useState<string>('')
  const [enterdTime, setEnterTime] = useState<number>(0)
  const fileInput = useRef<HTMLInputElement>(null)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const handleClick = () => {
    fileInput.current?.click()
  }

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        setSelectedAssetsUri(reader.result as string)
        setSelectedFiles([file])
      }
    }
  }

  const handleKeyboardEvent = (event: React.KeyboardEvent) => {
    const now = Date.now()
    // Prevent unikey from triggering enter twice.
    if (event.key === 'Enter' && now - enterdTime > 300 && !event.shiftKey) {
      event.preventDefault()
      submitFileUpload()
      setInputMessage('')
      setEnterTime(now)
    }
  }

  const submitFileUpload = () => {
    if (selectedFiles.length === 0) {
      return
    }

    chatController.sendMessageWithImage(currentChannel.id, inputMessage, selectedFiles)
    // Close the modal
    setSelectedAssetsUri('')
  }

  return (
    <AdditionBox onClick={handleClick}>
      <FolderPlusIcon className='w-6 h-6 text-gray-900' />
      <TextSm>{'Upload image'}</TextSm>
      <input type='file' ref={fileInput} style={{ display: 'none' }} onChange={handleFileUpload} />
      <BasicModal
        title={'Upload Image'}
        styled='!w-[400px]'
        isOpen={selectedAssetsUri !== ''}
        onClose={() => {
          setSelectedAssetsUri('')
        }}
      >
        <VerticalFullWidth>
          <Image width={400} src={selectedAssetsUri || ''} alt='Uploaded image' />
          <HorizontalFullWidth>
            <InputBoxStyle
              rows={1}
              value={inputMessage}
              onKeyDown={handleKeyboardEvent}
              onChange={(e) => {
                setInputMessage(e.target.value)
              }}
            />

            <SendButton onClick={submitFileUpload}>
              <PaperAirplaneIcon className='w-8 h-8 text-primary cursor-pointer' />
            </SendButton>
          </HorizontalFullWidth>
        </VerticalFullWidth>
      </BasicModal>
    </AdditionBox>
  )
}

export default UploadAssets
