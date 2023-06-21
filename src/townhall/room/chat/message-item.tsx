import { FC } from 'react'

import tw from 'twin.macro'

import StorageConst from '@/constants/storage.const'
import { CircularImage } from '@/widgets/circular-image'
import { Horizontal, Vertical } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { TextSm, TextXs } from '@/widgets/text'

const MessageBox = tw(Vertical)`
  rounded-lg
  bg-gray-100
  p-2
`

const MessageItem: FC = () => {
  return (
    <Horizontal>
      <CircularImage width={40} height={40} src={StorageConst.USER_DEFAULT.src} />
      <Gap />
      <MessageBox>
        <TextSm>This is a sample paragraph</TextSm>
        <Gap height={1} />
        <TextXs>3:37pm</TextXs>
      </MessageBox>
    </Horizontal>
  )
}

export default MessageItem
