import { action, Action, createContextStore } from 'easy-peasy'

import { CommunityType, emptyCommunity } from '@/types/community'
import { RoomDataType } from '@/types/townhall'

interface RoomModel {
  roomJoined: boolean
  community: CommunityType
  gameRooms: RoomDataType[]
  showChat: boolean

  setRoomJoined: Action<RoomModel, boolean>
  setCommunity: Action<RoomModel, CommunityType>
  setGameRooms: Action<RoomModel, RoomDataType[]>
  setShowChat: Action<RoomModel, boolean>
}

const RoomStore = createContextStore<RoomModel>({
  roomJoined: false,
  community: emptyCommunity(),
  gameRooms: [],
  showChat: false,

  setRoomJoined: action((state, joined) => {
    state.roomJoined = joined
  }),

  setCommunity: action((state, newProject) => {
    state.community = newProject
  }),

  setGameRooms: action((state, rooms) => {
    state.gameRooms = rooms
  }),

  setShowChat: action((state, showChat) => {
    state.showChat = showChat
  }),
})

export default RoomStore
