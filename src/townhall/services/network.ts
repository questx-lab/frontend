import { Event, phaserEvents } from '@/townhall/events/event-center'
import { IPlayer } from '@/types/townhall'

export default class Network {
  // TODO: Add player hardcode
  async jointoMap() {
    console.log('vao network')

    console.log('emit: player join')

    const player: IPlayer = {
      name: 'test1',
      x: 805,
      y: 600,
      anim: 'adam',
    }
    phaserEvents.emit(Event.PLAYER_JOINED, player, 'jdksadks')
  }

  // method to register event listener and call back function when a player joined
  onPlayerJoined(callback: (Player: IPlayer, key: string) => void, context?: any) {
    console.log('action: player join')
    phaserEvents.on(Event.PLAYER_JOINED, callback, context)
    console.log('phaserEvents.on: player join')
  }

  // method to register event listener and call back function when a player left
  onPlayerLeft(callback: (key: string) => void, context?: any) {
    phaserEvents.on(Event.PLAYER_LEFT, callback, context)
  }
}
