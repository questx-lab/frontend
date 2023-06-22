import { action, Action, createContextStore } from 'easy-peasy'

import { CommunityType, emptyCommunity } from '@/types/community'
import { RoomDataType } from '@/types/townhall'

export enum ActiveSidebarTab {
  NONE,
  EMOJI,
  CHAT,
  LUCKY_BOX_SETTING,
}

interface RoomModel {
  roomJoined: boolean
  community: CommunityType
  gameRooms: RoomDataType[]
  activeTab: ActiveSidebarTab

  setRoomJoined: Action<RoomModel, boolean>
  setCommunity: Action<RoomModel, CommunityType>
  setGameRooms: Action<RoomModel, RoomDataType[]>
  setActiveTab: Action<RoomModel, ActiveSidebarTab>
}

const RoomStore = createContextStore<RoomModel>({
  roomJoined: false,
  community: emptyCommunity(),
  gameRooms: [],
  activeTab: ActiveSidebarTab.NONE,

  setRoomJoined: action((state, joined) => {
    state.roomJoined = joined
  }),

  setCommunity: action((state, newProject) => {
    state.community = newProject
  }),

  setGameRooms: action((state, rooms) => {
    state.gameRooms = rooms
  }),

  setActiveTab: action((state, tab) => {
    state.activeTab = tab
  }),
})

export default RoomStore
