import { FC } from 'react'

import moment from 'moment'
import tw from 'twin.macro'

import StorageConst from '@/constants/storage.const'
import { MessageHistoryItem } from '@/types/townhall'
import { CircularImage } from '@/widgets/circular-image'
import { Horizontal, Vertical } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { TextSm, TextXs } from '@/widgets/text'

const MessageBox = tw(Vertical)`
  rounded-lg
  bg-gray-100
  p-2
`

const MessageItem: FC<{ message: MessageHistoryItem }> = ({ message }) => {
  const timeago = moment(message.created_at).fromNow()

  return (
    <Horizontal>
      <CircularImage width={40} height={40} src={StorageConst.USER_DEFAULT.src} />
      <Gap />
      <MessageBox>
        <TextSm>{message.message}</TextSm>
        <Gap height={1} />
        <TextXs>{timeago}</TextXs>
      </MessageBox>
    </Horizontal>
  )
}

export default MessageItem
