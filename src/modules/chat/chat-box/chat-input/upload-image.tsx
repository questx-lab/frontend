import React, { ChangeEvent, FC, useRef, useState } from 'react'

import tw from 'twin.macro'

import { HorizontalFullWidthCenter } from '@/admin-portal/modules/referrals/mini-widget'
import { AdditionBox } from '@/modules/chat/chat-box/chat-input/mini-widget'
import { Image } from '@/widgets/image'
import BasicModal from '@/widgets/modal/basic'
import { VerticalFullWidth } from '@/widgets/orientation'
import { TextSm } from '@/widgets/text'
import { FolderPlusIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'

const InputBox = tw(HorizontalFullWidthCenter)`
  gap-2
  justify-end
  p-2
`

const FileUploadButton: FC = () => {
  const fileInput = useRef<HTMLInputElement>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const handleClick = () => {
    fileInput.current?.click()
  }

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        setImageUrl(reader.result as string)
      }
    }
    // Do something with the file
  }

  return (
    <AdditionBox onClick={handleClick}>
      <FolderPlusIcon className='w-6 h-6 text-gray-900' />
      <TextSm>{'Upload image'}</TextSm>
      <input type='file' ref={fileInput} style={{ display: 'none' }} onChange={handleFileUpload} />
      <BasicModal
        styled='!w-[400px]'
        isOpen={imageUrl !== null}
        onClose={() => {
          // setImageUrl(null)
        }}
      >
        <VerticalFullWidth>
          <Image width={400} src={imageUrl || ''} alt='Uploaded image' />
          <InputBox>
            <PaperAirplaneIcon className='w-8 h-8 text-primary cursor-pointer' />
          </InputBox>
        </VerticalFullWidth>
      </BasicModal>
    </AdditionBox>
  )
}

export default FileUploadButton
