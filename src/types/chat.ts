import { UserType } from '@/types'

export type MessageAttachmentType = {
  id: string
  content_type: string
  url: string
}

export type ChatMessageType = {
  id: string
  channel_id: string
  author_id: string
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
  id: BigInt
  community_id: string
  name: string
  last_message_id: number
  description?: string
  avatar?: string
}

export const emptyChannel = (): ChannelType => {
  return {
    id: BigInt(0),
    community_id: '',
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

export type ChatMessageReceiver = {
  o: string
}
