import { action, Action, createContextStore } from 'easy-peasy'

import { ChannelType } from '@/types/chat'

export enum ChannelAction {
  ADD,
  EDIT,
}

interface ChannelSettingModel {
  showModal: boolean
  channels: ChannelType[]
  name: string
  description: string
  channelAction: ChannelAction
  channelId: bigint

  setChannels: Action<ChannelSettingModel, ChannelType[]>
  setShowModal: Action<ChannelSettingModel, boolean>
  setName: Action<ChannelSettingModel, string>
  setDescription: Action<ChannelSettingModel, string>
  setChannelAction: Action<ChannelSettingModel, ChannelAction>
  setChannelId: Action<ChannelSettingModel, bigint>
}

const ChannelSettingStore = createContextStore<ChannelSettingModel>({
  channels: [],
  showModal: false,
  name: '',
  description: '',
  channelAction: ChannelAction.ADD,
  channelId: BigInt(0),

  setChannels: action((state, channels) => {
    state.channels = channels
  }),

  setShowModal: action((state, modal) => {
    state.showModal = modal
  }),

  setName: action((state, name) => {
    state.name = name
  }),

  setDescription: action((state, description) => {
    state.description = description
  }),

  setChannelAction: action((state, channelAction) => {
    state.channelAction = channelAction
  }),

  setChannelId: action((state, channelId) => {
    state.channelId = channelId
  }),
})

export default ChannelSettingStore
