import { action, Action, createContextStore } from 'easy-peasy'

import { ChannelType, emptyChannel, NewMessageStatusType, TabChatType } from '@/types/chat'
import { EqualBigInt } from '@/utils/number'

interface ChatModel {
  selectedTab: TabChatType
  selectedChannel: ChannelType
  selectedAssetsUri: string
  channelNewMessageStatus: NewMessageStatusType[]

  setTab: Action<ChatModel, TabChatType>
  setChannel: Action<ChatModel, ChannelType>
  setSelectedAssetsUri: Action<ChatModel, string>
  setChannelNewMessageStatus: Action<ChatModel, NewMessageStatusType>
}

const ChatStore = createContextStore<ChatModel>({
  selectedTab: TabChatType.Chat,
  selectedChannel: emptyChannel(),
  selectedAssetsUri: '',
  channelNewMessageStatus: [],

  setTab: action((state, newTab) => {
    state.selectedTab = newTab
  }),

  setChannel: action((state, newChannel) => {
    state.selectedChannel = newChannel
  }),

  setSelectedAssetsUri: action((state, uri) => {
    state.selectedAssetsUri = uri
  }),

  setChannelNewMessageStatus: action((state, newMessageStatus) => {
    let exist = state.channelNewMessageStatus.find((status) =>
      EqualBigInt(status.channelId, newMessageStatus.channelId)
    )
    if (exist)
      state.channelNewMessageStatus = state.channelNewMessageStatus.map((status) => {
        if (EqualBigInt(status.channelId, newMessageStatus.channelId)) return newMessageStatus
        else return status
      })
    else {
      state.channelNewMessageStatus = [...state.channelNewMessageStatus, newMessageStatus]
    }
  }),
})

export default ChatStore
