import { FC } from 'react'

import moment from 'moment'
import tw from 'twin.macro'

import StorageConst from '@/constants/storage.const'
import { MessageHistoryItem } from '@/types/townhall'
import { CircularImage } from '@/widgets/circular-image'
import { HorizontalFullWidth, Stretch, Vertical } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { TextBase, TextSm, TextXs } from '@/widgets/text'

const MessageBox = tw(Vertical)`
  w-full
  rounded-lg
  bg-gray-100
  p-2
`

const ImageFrame = tw(Vertical)`
  h-full
`

const UserNameText = tw(TextBase)`
  text-lg
  text-black
  font-normal
  max-md:text-lg
`

const MessageItem: FC<{ message: MessageHistoryItem }> = ({ message }) => {
  const timeago = moment(message.created_at).fromNow()

  return (
    <HorizontalFullWidth>
      <ImageFrame>
        <Stretch />
        <CircularImage width={60} height={60} src={StorageConst.USER_DEFAULT.src} />
      </ImageFrame>
      <Gap />
      <MessageBox>
        <UserNameText>{message.user?.name}</UserNameText>
        <Gap height={1} />
        <TextSm>{message.message}</TextSm>
        <Gap height={1} />
        <TextXs>{timeago}</TextXs>
      </MessageBox>
    </HorizontalFullWidth>
  )
}

export default MessageItem
