import { action, Action, createContextStore } from 'easy-peasy'

import { ChannelType, emptyChannel, TabChatType } from '@/types/chat'

interface ChatModel {
  selectedTab: TabChatType
  selectedChannel: ChannelType

  setTab: Action<ChatModel, TabChatType>
  setChannel: Action<ChatModel, ChannelType>
}

const ChatStore = createContextStore<ChatModel>({
  selectedTab: TabChatType.Chat,
  selectedChannel: emptyChannel(),

  setTab: action((state, newTab) => {
    state.selectedTab = newTab
  }),

  setChannel: action((state, newChannel) => {
    state.selectedChannel = newChannel
  }),
})

export default ChatStore
