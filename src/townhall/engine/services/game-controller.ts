import { MessageReceiverEnum } from '@/constants/townhall'
import { Event, phaserEvents } from '@/townhall/engine/events/event-center'
import Bootstrap, { BootstrapListener } from '@/townhall/engine/scenes/bootstrap'
import Game from '@/townhall/engine/scenes/game'
import network from '@/townhall/engine/services/network'
import { CollectLuckyBoxValue, IPlayer, LuckyBoxValue, MessageReceiver } from '@/types/townhall'

const BOOTSTRAP_SCENE = 'Bootstrap'
const GAME_SCENE = 'game'

export interface GameListener {}

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

  constructor() {
    super(config)

    network.addListener(this.networkListener)
  }

  private bootstrapListener = {
    onLoadComleted: async () => {
      console.log('Bootstrap completed, connecting to room ', this.currentRoomId)

      // We can now connect to the game
      network.connectRoom(this.currentRoomId)
    },
  } as BootstrapListener

  private networkListener = {
    onConnected: () => {
      console.log('Connected')

      // TODO: handle reconnection after a temporary disconnection. In that case, we should not
      // launch the game.
      this.scene.remove(BOOTSTRAP_SCENE)
      this.bootstrapScene = undefined

      this.gameScene = new Game()
      this.scene.add(GAME_SCENE, this.gameScene)
      this.scene.start(this.gameScene)
    },

    onDisconnected: () => {},

    onMessage: (event: MessageReceiver) => {},
  }

  loadResource(roomId: string) {
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
