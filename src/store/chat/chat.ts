import { action, Action, createContextStore } from 'easy-peasy'

import { ChannelType, emptyChannel, TabChatType } from '@/types/chat'

interface ChatModel {
  selectedTab: TabChatType
  selectedChannel: ChannelType
  selectedAssetsUri: string

  setTab: Action<ChatModel, TabChatType>
  setChannel: Action<ChatModel, ChannelType>
  setSelectedAssetsUri: Action<ChatModel, string>
}

const ChatStore = createContextStore<ChatModel>({
  selectedTab: TabChatType.Chat,
  selectedChannel: emptyChannel(),
  selectedAssetsUri: '',

  setTab: action((state, newTab) => {
    state.selectedTab = newTab
  }),

  setChannel: action((state, newChannel) => {
    state.selectedChannel = newChannel
  }),

  setSelectedAssetsUri: action((state, uri) => {
    state.selectedAssetsUri = uri
  }),
})

export default ChatStore
