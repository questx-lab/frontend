import { UserType } from '@/types'
import { CommunityType } from '@/types/community'

export enum MemberRole {
  ADMIN = 'Admin',
  SUPER_MOD = 'Super Mod',
  MOD = 'Mod',
}

export enum TabChatType {
  Chat = '#General',
  CHANNEL_LIST = '#Channels',
}

export type EmojiType = {
  // content_type: string
  name: string
}

export type MessageAttachmentType = {
  // content_type: string
  url: string
}

export type ChatReactionType = {
  channel_id: bigint
  emoji: EmojiType
  count: number
  message_id: bigint
  me: boolean
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
  reactions?: ChatReactionType[]
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
  REACTION_ADDED = 'reaction_added',
  READY = 'ready',
  CHANGE_STATUS = 'change_status',
}

export type ReadyMessageType = {
  communities: CommunityType[]
}

export type ChatChangeStatusType = {
  user: UserType
}

export type ChatMessageReceiver = {
  o: ChatMessageReceiverEnum
  d: ChatMessageType | ReadyMessageType | ChatReactionType | ChatChangeStatusType
}
