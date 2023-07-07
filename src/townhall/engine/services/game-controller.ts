import { MessageReceiverEnum } from '@/constants/townhall'
import { Event, phaserEvents } from '@/townhall/engine/events/event-center'
import Bootstrap, { BootstrapListener } from '@/townhall/engine/scenes/bootstrap'
import Game from '@/townhall/engine/scenes/game'
import { GameState } from '@/townhall/engine/services/game-state'
import messageManager from '@/townhall/engine/services/message-manager'
import network from '@/townhall/engine/services/network'
import { UserType } from '@/types'
import {
  CollectLuckyBoxValue,
  IPlayer,
  ItemType,
  LuckyBoxValue,
  MessageEmoji,
  MessageHistoryItem,
  MessageInitValue,
  MessageJoinValue,
  MessageMoveValue,
  MessageReceiver,
} from '@/types/townhall'

const BOOTSTRAP_SCENE = 'Bootstrap'
const GAME_SCENE = 'game'

export interface GameStateListener {
  onStateChanged: (state: GameState, data?: any) => void
}

export interface PlayerSelectorListener {
  onStateChanged: (state: ItemType, data?: any) => void
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'phaser-container',
  backgroundColor: '#93cbee',
  pixelArt: true, // Prevent pixel art from becoming blurred when scaled.
  scale: {
    mode: Phaser.Scale.ScaleModes.RESIZE,
    width: window.innerWidth,
    height: window.innerHeight,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  autoFocus: true,
  scene: [],
}

class GameController extends Phaser.Game {
  private bootstrapScene?: Bootstrap
  private gameScene?: Game
  private currentRoomId = ''
  private gamteStateListeners = new Set<GameStateListener>()
  private playerSelectorListeners = new Set<PlayerSelectorListener>()
  private myUser?: UserType

  constructor() {
    super(config)

    network.addListener(this.networkListener)
  }

  /**
   * This is a callback from the BOOTSTRAP scene.
   */
  private bootstrapListener = {
    onLoadComleted: async () => {
      this.scene.remove(BOOTSTRAP_SCENE)

      this.gameScene = new Game()
      this.scene.add(GAME_SCENE, this.gameScene)
      this.scene.start(this.gameScene)
      this.gameScene.registerKeys()
    },
  } as BootstrapListener

  /**
   * This listener interface handles callback from network.
   */
  private networkListener = {
    onConnected: () => {
      // TODO: handle reconnection after a temporary disconnection. In that case, we should not
      // launch the game.
      this.broadcastState(GameState.JOINED_ROOM)
    },

    onDisconnected: () => {},

    onMessage: (message: MessageReceiver) => {
      switch (message.type) {
        case MessageReceiverEnum.INIT:
          this.handleInitMessage(message)
          break
        case MessageReceiverEnum.JOIN:
          this.handleJoinMessage(message)
          break
        case MessageReceiverEnum.MOVE:
          this.handleMoveMessage(message)
          break
        case MessageReceiverEnum.EMOJI:
          const value = message.value as MessageEmoji
          phaserEvents.emit(Event.PLAYER_UPDATED, 'emoji', value.emoji, message.user_id)
          break
        case MessageReceiverEnum.EXIT:
          phaserEvents.emit(Event.PLAYER_LEFT, message.user_id)
          break
        case MessageReceiverEnum.MESSAGE:
          messageManager.onNewMessage(message.value as MessageHistoryItem)
          break
        case MessageReceiverEnum.START_LUCKY_BOX:
          phaserEvents.emit(Event.CREATE_LUCKY_BOXES, message.value as LuckyBoxValue)
          break
        case MessageReceiverEnum.COLLECT_LUCKY_BOX:
          phaserEvents.emit(
            Event.COLLECT_LUCKY_BOX,
            message.value as CollectLuckyBoxValue,
            message.user_id
          )
          break
        case MessageReceiverEnum.STOP_LUCKY_BOX:
          phaserEvents.emit(Event.REMOVE_LUCKY_BOXES, message.value as LuckyBoxValue)
          break
      }
    },
  }

  setMyPlayerEmoji(emoji: string) {
    phaserEvents.emit(Event.MY_PLAYER_EMOJI_CHANGE, emoji)
  }

  setUser(user: UserType) {
    this.myUser = user
  }

  quitGame() {
    if (this.gameScene) {
      this.scene.remove(GAME_SCENE)
      this.gameScene = undefined
    }

    this.pause()
    network.socketDisconnect()
  }

  registerKey() {
    if (this.gameScene) {
      this.gameScene.registerKeys()
    }
  }

  deRegisterKey() {
    if (this.gameScene) {
      this.gameScene.deRegisterKeys()
    }
  }

  connectRoom() {
    this.broadcastState(GameState.CONNECTING)
    network.connectRoom(this.currentRoomId)
  }

  /////////// Handle different kind of messages from server.

  private handleInitMessage(message: MessageReceiver) {
    const game = this.scene.keys.game as Game

    // Init the message history
    messageManager.initMessageList((message.value as MessageInitValue).message_history)

    // Init
    ;(message.value as MessageInitValue).users.forEach((user) => {
      const { x, y } = user.pixel_position
      const { name, id } = user.user

      if (this.myUser?.id === user.user.id) {
        if (game.myPlayer) {
          game.myPlayer.updateMyPlayer(name, x, y, id)
          game.myPlayer.setPlayerTexture(user.character.name + '_' + user.character.level)
        }
      } else {
        const player: IPlayer = {
          name,
          x,
          y,
          anim: user.user.name,
        }
        phaserEvents.emit(Event.PLAYER_JOINED, player, user.user.id)
      }
    })

    phaserEvents.emit(Event.CREATE_LUCKY_BOXES, message.value as LuckyBoxValue)
  }

  private handleJoinMessage(message: MessageReceiver) {
    // Join
    const value = message.value as MessageJoinValue
    if (this.myUser?.id !== value.user.id) {
      const player: IPlayer = {
        name: value.user.name,
        x: value.position.x,
        y: value.position.y,
        anim: value.user.name,
      }
      phaserEvents.emit(Event.PLAYER_JOINED, player, value.user.id)
    }
  }

  private handleMoveMessage(message: MessageReceiver) {
    // Move
    const game = this.scene.keys.game as Game

    const value = message.value as MessageMoveValue
    // TODO: hardcode character name
    phaserEvents.emit(
      Event.PLAYER_UPDATED,
      'anim',
      `${game.myPlayer.texture.key}_run_${value.direction}`,
      message.user_id
    )
    phaserEvents.emit(Event.PLAYER_UPDATED, 'x', value.x, message.user_id)
    phaserEvents.emit(Event.PLAYER_UPDATED, 'y', value.y, message.user_id)

    setTimeout(() => {
      phaserEvents.emit(
        Event.PLAYER_UPDATED,
        'anim',
        `${game.myPlayer.texture.key}_idle_${value.direction}`,
        message.user_id
      )
    }, 100)
  }

  /////////// Add, Remove receive update selector from this game controller.
  addPlayerSelectorListeners(listener: PlayerSelectorListener) {
    this.playerSelectorListeners.add(listener)
  }

  removePlayerSelectorListeners(listener: PlayerSelectorListener) {
    this.playerSelectorListeners.delete(listener)
  }

  changePlayerSelectorListeners(state: ItemType) {
    this.playerSelectorListeners.forEach((listener) => listener.onStateChanged(state))
  }

  /////////// Add, Remove, broadcast message to receive update from this game controller.

  addGameStateListeners(listener: GameStateListener) {
    this.gamteStateListeners.add(listener)
  }

  removeGameStateListeners(listener: GameStateListener) {
    this.gamteStateListeners.delete(listener)
  }

  broadcastState(state: GameState) {
    this.gamteStateListeners.forEach((listener) => listener.onStateChanged(state))
  }

  /////////// Game Related functions

  bootstrap(roomId: string) {
    if (this.currentRoomId === roomId) {
      // We are doing something with this room. No need to have duplicated action
      return
    }

    if (this.bootstrapScene) {
      this.scene.remove(BOOTSTRAP_SCENE)
    }

    this.currentRoomId = roomId

    this.bootstrapScene = new Bootstrap(this.bootstrapListener)
    this.scene.add(BOOTSTRAP_SCENE, this.bootstrapScene)
    this.scene.start(this.bootstrapScene)

    this.broadcastState(GameState.BOOTSTRAP)
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

  onCreateLuckyBoxes(callback: (value: LuckyBoxValue) => void, context?: any) {
    phaserEvents.on(Event.CREATE_LUCKY_BOXES, callback, context)
  }

  onCollectLuckyBox(
    callback: (value: CollectLuckyBoxValue, userId: string) => void,
    context?: any
  ) {
    phaserEvents.on(Event.COLLECT_LUCKY_BOX, callback, context)
  }

  onRemoveLuckyBoxes(callback: (value: LuckyBoxValue) => void, context?: any) {
    phaserEvents.on(Event.REMOVE_LUCKY_BOXES, callback, context)
  }

  onMyPlayerEmoji(callback: (emoji: string) => void, context?: any) {
    phaserEvents.on(Event.MY_PLAYER_EMOJI_CHANGE, callback, context)
  }

  onLoadMapCompleted(callback: () => void, context?: any) {
    phaserEvents.on(Event.LOAD_MAP_COMPLETED, callback, context)
  }

  onConnectRoom(callback: () => void, context?: any) {
    phaserEvents.on(Event.CONNECT_ROOM, callback, context)
  }

  // method to send player updates to Colyseus server
  updatePlayer(currentX: number, currentY: number, currentAnim: string) {
    const direction = currentAnim.split('_').at(-1)

    network.send({
      type: MessageReceiverEnum.MOVE,
      value: {
        direction: direction,
        x: parseInt(currentX.toFixed(0), 10),
        y: parseInt(currentY.toFixed(0), 10),
      },
    })
  }
}

const phaserGame = new GameController()

;(window as any).game = phaserGame

export default phaserGame
