import { action, Action, createContextStore } from 'easy-peasy'

import { CommunityType, emptyCommunity } from '@/types/community'
import { RoomDataType } from '@/types/townhall'

interface RoomModel {
  roomJoined: boolean
  community: CommunityType
  gameRooms: RoomDataType[]

  setRoomJoined: Action<RoomModel, boolean>
  setCommunity: Action<RoomModel, CommunityType>
  setGameRooms: Action<RoomModel, RoomDataType[]>
}

const RoomStore = createContextStore<RoomModel>({
  roomJoined: false,
  community: emptyCommunity(),
  gameRooms: [],

  setRoomJoined: action((state, joined) => {
    state.roomJoined = joined
  }),
  setCommunity: action((state, newProject) => {
    state.community = newProject
  }),
  setGameRooms: action((state, rooms) => {
    state.gameRooms = rooms
  }),
})

export default RoomStore
