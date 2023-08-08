import { FC, ReactNode, useMemo } from 'react'

import { useStoreState } from 'easy-peasy'
import parseHtml from 'html-react-parser'
import styled from 'styled-components'
import tw from 'twin.macro'

import { addReactionApi } from '@/api/chat'
import StorageConst from '@/constants/storage.const'
import ChatStore from '@/store/chat/chat'
import { GlobalStoreModel } from '@/store/store'
import { UserType } from '@/types'
import { ChatMessageType, ChatReactionType, EmojiType, MessageAttachmentType } from '@/types/chat'
import { getInfoFromMarkup } from '@/utils/convert'
import { UserAvatar } from '@/widgets/avatar'
import { Image } from '@/widgets/image'
import {
  Horizontal,
  HorizontalCenter,
  HorizontalFullWidth,
  Vertical,
  VerticalFullWidth,
} from '@/widgets/orientation'
import { PopoverClick, PopoverHover } from '@/widgets/popover/popover-hover'
import { LightTextBase, LightTextXs, MediumTextSm } from '@/widgets/text'
import Picker from '@emoji-mart/react'
import { Tooltip } from '@material-tailwind/react'

const PaddingIcon = tw.div`p-2 rounded-lg bg-white cursor-pointer`

const Padding1Icon = tw(HorizontalCenter)`p-1 rounded-lg bg-white gap-1`

const Gap1Horizontal = tw(Horizontal)`gap-1`

const GapHorizontal = styled(HorizontalFullWidth)<{ isOwnser?: boolean }>(
  ({ isOwnser = false }) => {
    const styles = [tw`gap-3  cursor-pointer `]
    if (isOwnser) {
      styles.push(tw`flex-row-reverse`)
    }

    return styles
  }
)

const GapVerticalFullWidth = tw(VerticalFullWidth)`gap-1`

const GapVertical = styled(Vertical)<{ isOwnser?: boolean }>(({ isOwnser = false }) => {
  const styles = [tw`gap-1 justify-center bg-cyan-50 rounded-lg p-3 max-w-[80%]`]
  if (!isOwnser) {
    styles.push(tw`bg-info-100 hover:bg-info-200`)
  } else {
    styles.push(tw`bg-gray-100 hover:bg-gray-200`)
  }

  return styles
})

const Attachments: FC<{ attachments: MessageAttachmentType[] | undefined }> = ({ attachments }) => {
  if (!attachments || attachments.length === 0) {
    return <></>
  }

  return <Image src={attachments[0].url} width={300} />
}

const EmojiReact: FC<{ reactions: ChatReactionType[] | undefined }> = ({ reactions }) => {
  if (!reactions || reactions.length === 0) {
    return <></>
  }

  const renderReact = reactions.map((emoji, index) => (
    <Padding1Icon key={index}>
      {emoji.emoji.name}
      <LightTextXs>{emoji.count}</LightTextXs>
    </Padding1Icon>
  ))

  return <Gap1Horizontal>{renderReact}</Gap1Horizontal>
}

enum SideEnum {
  LEFT = 'left',
  RIGHT = 'right',
}

const Reaction: FC<{ side: SideEnum; children: ReactNode; message: ChatMessageType }> = ({
  children,
  message,
  side,
}) => {
  const currentChannel = ChatStore.useStoreState((state) => state.selectedChannel)
  const handleEmojiClick = (emoji: any) => {
    const emojiData: EmojiType = {
      name: emoji.native,
    }
    addReactionApi(currentChannel.id, message.id, emojiData)
  }

  return (
    <PopoverHover button={children} placement={side}>
      <Tooltip content='Add reaction'>
        <div>
          <PopoverClick
            placement={side}
            button={
              <PaddingIcon>
                <Image
                  width={20}
                  height={20}
                  src={StorageConst.EMOJI_BLANK.src}
                  alt=''
                  className='cursor-pointer'
                />
              </PaddingIcon>
            }
          >
            <Picker onEmojiSelect={handleEmojiClick} />
          </PopoverClick>
        </div>
      </Tooltip>
    </PopoverHover>
  )
}

const MessageItem: FC<{ message: ChatMessageType }> = ({ message }) => {
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)
  const cachedMessageContent = useMemo(() => {
    const infos = getInfoFromMarkup(message.content)
    let result = message.content
    infos.forEach((info) => {
      result = result.replaceAll(
        info.reg,
        `<span style="background-color:#FFEEB9;color:black;padding:1px;border-radius:3px;margin-right:2px"> @${info.display} </span>`
      )
    })

    return result
  }, [message.content])
  if (!user) {
    return <></>
  }

  // Sender
  if (message.author.id === user.id) {
    return (
      <GapHorizontal isOwnser>
        <GapVertical isOwnser>
          <Reaction side={SideEnum.LEFT} message={message}>
            <GapVerticalFullWidth>
              <Attachments attachments={message.attachments} />
              <LightTextBase>{parseHtml(cachedMessageContent)}</LightTextBase>
              <EmojiReact reactions={message.reactions} />
            </GapVerticalFullWidth>
          </Reaction>
        </GapVertical>
      </GapHorizontal>
    )
  }

  // Messages from other people
  return (
    <GapHorizontal>
      <UserAvatar user={message.author} size={32} />
      <GapVertical>
        <Reaction side={SideEnum.RIGHT} message={message}>
          <GapVerticalFullWidth>
            <MediumTextSm>{message.author.name}</MediumTextSm>
            <Attachments attachments={message.attachments} />
            <LightTextBase>{parseHtml(cachedMessageContent)}</LightTextBase>
            <EmojiReact reactions={message.reactions} />
          </GapVerticalFullWidth>
        </Reaction>
      </GapVertical>
    </GapHorizontal>
  )
}

export default MessageItem
