import WebSocket from '@/api/socket'
import { MessageReceiverEnum } from '@/constants/townhall'
import { Event, phaserEvents } from '@/townhall/events/event-center'
import phaserGame from '@/townhall/phaser-game'
import Game from '@/townhall/scenes/game'
import { UserType } from '@/types'
import {
  IPlayer,
  MessageInitValue,
  MessageJoinValue,
  MessageMoveValue,
  MessageReceiver,
} from '@/types/townhall'

const roomId = '043686e5-b9c8-4fc7-b4b2-13d615723020'

export default class Network {
  socket: null | WebSocket

  constructor() {
    // TODO: hardcode roomId
    this.socket = null
  }

  // TODO: Add player hardcode
  // TODO: Log file for debug
  async jointoMap(myPlayerData: UserType) {
    const game = phaserGame.scene.keys.game as Game
    this.socket = new WebSocket(roomId)
    console.log('====socket connection===')
    if (!this.socket.socket) {
      return
    }
    this.socket.socket.onmessage = (event) => {
      const message = JSON.parse(event.data.toString()) as MessageReceiver
      if (message.type === MessageReceiverEnum.INIT) {
        // Init
        console.log('===room init===', message)
        ;(message.value as MessageInitValue).users.forEach((user) => {
          const { x, y } = user.pixel_position
          const { name, id } = user.user

          if (myPlayerData.id === user.user.id) {
            console.log('****myplayer****')
            if (game.myPlayer) {
              game.myPlayer.updateMyPlayer(name, x, y, id)
            }
          } else {
            console.log('****other****')
            const player: IPlayer = {
              name,
              x,
              y,
              anim: user.player.name,
            }
            phaserEvents.emit(Event.PLAYER_JOINED, player, user.user.id)
          }
        })
      }

      if (message.type === MessageReceiverEnum.JOIN) {
        console.log('===room join===', message)
        // Join
        const value = message.value as MessageJoinValue
        console.log('join check', myPlayerData.id !== value.user.id)
        if (myPlayerData.id !== value.user.id) {
          const player: IPlayer = {
            name: value.user.name,
            x: value.position.x,
            y: value.position.y,
            anim: value.user.name,
          }
          phaserEvents.emit(Event.PLAYER_JOINED, player, value.user.id)
        }
      }

      if (message.type === MessageReceiverEnum.MOVE) {
        // Move
        const value = message.value as MessageMoveValue
        phaserEvents.emit(
          Event.PLAYER_UPDATED,
          'anim',
          `adam_run_${value.direction}`,
          message.user_id
        )
        phaserEvents.emit(Event.PLAYER_UPDATED, 'x', value.x, message.user_id)
        phaserEvents.emit(Event.PLAYER_UPDATED, 'y', value.y, message.user_id)

        setTimeout(() => {
          phaserEvents.emit(
            Event.PLAYER_UPDATED,
            'anim',
            `adam_idle_${value.direction}`,
            message.user_id
          )
        }, 100)
      }

      if (message.type === MessageReceiverEnum.EXIT) {
        phaserEvents.emit(Event.PLAYER_LEFT, message.user_id)
      }
    }
  }

  // method to register event listener and call back function when a player joined
  onPlayerJoined(callback: (Player: IPlayer, key: string) => void, context?: any) {
    console.log('PLAYER_JOINED')
    phaserEvents.on(Event.PLAYER_JOINED, callback, context)
  }

  // method to register event listener and call back function when a myplayer joined
  onMyPlayerJoined(callback: (x: number, y: number, id: string) => void, context?: any) {
    phaserEvents.on(Event.MY_PLAYER_JOINED, callback, context)
  }

  // method to register event listener and call back function when a player left
  onPlayerLeft(callback: (key: string) => void, context?: any) {
    phaserEvents.on(Event.PLAYER_LEFT, callback, context)
  }

  // method to register event listener and call back function when a player updated
  onPlayerUpdated(
    callback: (field: string, value: number | string, key: string) => void,
    context?: any
  ) {
    console.log('PLAYER_UPDATED')
    phaserEvents.on(Event.PLAYER_UPDATED, callback, context)
  }

  // method to send player updates to Colyseus server
  updatePlayer(currentX: number, currentY: number, currentAnim: string) {
    const direction = currentAnim.split('_').at(-1)
    if (this.socket) {
      this.socket.send({
        type: MessageReceiverEnum.MOVE,
        value: {
          direction: direction,
          x: parseInt(currentX.toFixed(0), 10),
          y: parseInt(currentY.toFixed(0), 10),
        },
      })
    }
  }
}
