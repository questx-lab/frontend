import { UserType } from '@/types'

export enum TabChatType {
  Chat = '#General',
  CHANNEL_LIST = '#Channels',
}

export type MessageAttachmentType = {
  // content_type: string
  url: string
}

export type ChatMessageType = {
  id: bigint
  channel_id: bigint
  author: UserType
  content: string
  timestamp?: string

  // Optional fields
  attachments?: MessageAttachmentType[]
  mentions?: UserType[]
}

export type ChatMessagesType = {
  messages: ChatMessageType[]
}

export type ChannelType = {
  id: bigint
  community_handle: string
  name: string
  last_message_id: number
  description?: string
  avatar?: string
}

export const emptyChannel = (): ChannelType => {
  return {
    id: BigInt(0),
    community_handle: '',
    name: '',
    last_message_id: 0,
  }
}

export type ChannelsType = {
  channels: ChannelType[]
}

export enum UserChatStatusType {
  ONLINE = 'online',
  BUSY = 'busy',
  OFFLINE = 'offline',
}

export type UserChatType = {
  user: UserType
  status: UserChatStatusType
  shordStatus?: string
}

export enum ChatMessageReceiverEnum {
  MESSAGE_CREATED = 'message_created',
}

export type ReadyMessageType = {
  chat_members: UserType[]
}

export type ChatMessageReceiver = {
  o: ChatMessageReceiverEnum
  d: ChatMessageType | ReadyMessageType
}
