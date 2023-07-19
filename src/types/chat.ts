import { UserType } from '@/types'

export enum MemberRole {
  ADMIN = 'Admin',
  SUPER_MOD = 'Super Mod',
  MOD = 'Mod',
}

export type MessageAttachmentType = {
  id: string
  content_type: string
  url: string
}

export type ChatMessageType = {
  id: string
  author: UserType
  content: string
  timestamp?: string

  // Optional fields
  attachments?: MessageAttachmentType[]
  mentions?: UserType[]
}

export type ChannelType = {
  avatar: string
  name: string
  description: string
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
  role?: MemberRole
}
