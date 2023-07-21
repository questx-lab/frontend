import { UserType } from '@/types'

export type MessageAttachment = {
  id: string
  content_type: string
  url: string
}

export type ChatMessage = {
  id: string
  author: UserType
  content: string
  timestamp: string

  // Optional fields
  attachments?: MessageAttachment[]
  mentions: UserType[]
}
