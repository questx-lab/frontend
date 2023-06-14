import { action, Action, createContextStore } from 'easy-peasy'

interface RoomModel {
  roomJoined: boolean

  setRoomJoined: Action<RoomModel, boolean>
}

const RoomStore = createContextStore<RoomModel>({
  roomJoined: false,

  setRoomJoined: action((state, joined) => {
    state.roomJoined = joined
  }),
})

export default RoomStore
