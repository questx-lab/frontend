import WebSocket from '@/api/socket'
import { MessageReceiverEnum } from '@/constants/townhall'
import { Event, phaserEvents } from '@/townhall/engine/events/event-center'
import Game from '@/townhall/engine/scenes/game'
import messagesManager from '@/townhall/engine/services/messages'
import phaserGame from '@/townhall/phaser-game'
import { UserType } from '@/types'
import {
  IPlayer,
  MessageInitValue,
  MessageJoinValue,
  MessageMoveValue,
  MessageReceiver,
} from '@/types/townhall'

export default class Network {
  socket: null | WebSocket
  constructor() {
    // TODO: hardcode roomId
    this.socket = null
  }

  async socketDisconnect() {
    if (this.socket) {
      this.socket.disconnect()
    }
  }

  // TODO: Add player hardcode
  // TODO: Log file for debug
  async jointoMap(myPlayerData: UserType, roomId: string) {
    const game = phaserGame.scene.keys.game as Game
    this.socket = new WebSocket(roomId)
    if (!this.socket.socket) {
      return
    }
    this.socket.socket.onmessage = (event) => {
      const message = JSON.parse(event.data.toString()) as MessageReceiver
      if (message.type === MessageReceiverEnum.INIT) {
        // Init
        ;(message.value as MessageInitValue).users.forEach((user) => {
          const { x, y } = user.pixel_position
          const { name, id } = user.user

          if (myPlayerData.id === user.user.id) {
            if (game.myPlayer) {
              game.myPlayer.updateMyPlayer(name, x, y, id)
            }
          } else {
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
        // Join
        const value = message.value as MessageJoinValue
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
        // TODO: hardcode character name
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

      if (message.type === MessageReceiverEnum.MESSAGE) {
        console.log('New message in the network')
        messagesManager.onNewMessage('')
      }
    }
  }

  // method to register event listener and call back function when a player joined
  onPlayerJoined(callback: (Player: IPlayer, key: string) => void, context?: any) {
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

  sendChatMessage(message: string) {
    if (this.socket) {
      console.log('SEnding message to server')
      this.socket.send({
        type: MessageReceiverEnum.MESSAGE,
        value: {
          message,
        },
      })
    }
  }
}
