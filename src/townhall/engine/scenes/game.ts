import '@/townhall/engine/characters/my-player'
import '@/townhall/engine/characters/other-player'

import Phaser from 'phaser'

import { createCharacterAnims } from '@/townhall/engine/anims/CharacterAnims'
import MyPlayer from '@/townhall/engine/characters/my-player'
import OtherPlayer from '@/townhall/engine/characters/other-player'
import PlayerSelector from '@/townhall/engine/characters/player-selecter'
import Network from '@/townhall/engine/services/network'
import { IPlayer, Keyboard, LuckyBoxListType, NavKeys } from '@/types/townhall'
import LuckyBox from '@/townhall/engine/items/LuckyBox'

const addMinutes = (date: Date, minutes: number): Date => {
  const result = new Date(date)
  result.setMinutes(result.getMinutes() + minutes)
  return result
}
const mockLuckyBoxs: LuckyBoxListType[] = [
  {
    id: '1',
    startTime: new Date().toISOString(),
    endTime: addMinutes(new Date(), 1).toISOString(),
    positions: [
      {
        x: 2368,
        y: 1792,
      },
      {
        x: 2312,
        y: 1712,
      },
      {
        x: 2378,
        y: 1767,
      },
    ],
  },
]

export default class Game extends Phaser.Scene {
  network!: Network
  private map!: Phaser.Tilemaps.Tilemap
  myPlayer!: MyPlayer
  private otherPlayers!: Phaser.Physics.Arcade.Group
  private otherPlayerMap = new Map<string, OtherPlayer>()
  private cursors!: NavKeys
  private keyE!: Phaser.Input.Keyboard.Key
  private keyR!: Phaser.Input.Keyboard.Key
  private playerSelector!: Phaser.GameObjects.Zone
  private luckyBoxGroups!: LuckyBoxListType[]
  private luckyBoxArcadeGroup!: Phaser.Physics.Arcade.Group

  constructor() {
    super('game')
  }

  registerKeys() {
    if (!this.input.keyboard) {
      return
    }
    this.cursors = {
      ...this.input.keyboard.createCursorKeys(),
      ...(this.input.keyboard.addKeys('W,S,A,D') as Keyboard),
    }

    // maybe we can have a dedicated method for adding keys if more keys are needed in the future
    this.keyE = this.input.keyboard.addKey('E')
    this.keyR = this.input.keyboard.addKey('R')
    this.input.keyboard.disableGlobalCapture()
  }

  deregisterKeys() {
    if (!this.input.keyboard) {
      return
    }

    this.input.keyboard.removeKey('W')
    this.input.keyboard.removeKey('S')
    this.input.keyboard.removeKey('A')
    this.input.keyboard.removeKey('D')
  }

  private handlePlayersOverlap() {
    // TODO: interactive when overlap
  }

  // function to add new player to the otherPlayer group
  private handlePlayerJoined(newPlayer: IPlayer, id: string) {
    const otherPlayer = this.add.otherPlayer(newPlayer.x, newPlayer.y, 'adam', id, newPlayer.name)
    this.otherPlayers.add(otherPlayer)
    this.otherPlayerMap.set(id, otherPlayer)
  }

  // function to remove the player who left from the otherPlayer group
  private handlePlayerLeft(id: string) {
    if (this.otherPlayerMap.has(id)) {
      const otherPlayer = this.otherPlayerMap.get(id)
      if (!otherPlayer) return
      this.otherPlayers.remove(otherPlayer, true, true)
      this.otherPlayerMap.delete(id)
    }
  }

  // function to update target position upon receiving player updates
  private handlePlayerUpdated(field: string, value: number | string, id: string) {
    const otherPlayer = this.otherPlayerMap.get(id)
    otherPlayer?.updateOtherPlayer(field, value)
  }

  create(data: { network: Network }) {
    if (!data.network) {
      throw new Error('server instance missing')
    } else {
      this.network = data.network
    }

    this.registerKeys()
    createCharacterAnims(this.anims)

    this.map = this.make.tilemap({ key: 'tilemap' })
    const FloorAndGround = this.map.addTilesetImage('FloorAndGround', 'tiles_wall')

    if (!FloorAndGround) {
      return
    }
    this.map.createLayer('Ground', FloorAndGround)
    const wallLayer = this.map.createLayer('Wall', FloorAndGround)
    this.map.createLayer('Float', FloorAndGround)

    if (!wallLayer) {
      return
    }
    wallLayer.setCollisionByProperty({ collides: true })

    // process lucky box logic
    this.processLuckyBox()

    // add my player
    this.myPlayer = this.add.myPlayer(2368, 1792, 'adam', '')
    this.myPlayer.setPlayerTexture('adam')

    this.playerSelector = new PlayerSelector(this, 0, 0, 16, 16)

    // import other objects from Tiled map to Phaser
    this.addGroupFromTiled('Wall', 'tiles_wall', 'FloorAndGround', false)
    this.addGroupFromTiled('Objects', 'office', 'Modern_Office_Black_Shadow', false)
    this.addGroupFromTiled('ObjectsOnCollide', 'office', 'Modern_Office_Black_Shadow', true)
    this.addGroupFromTiled('GenericObjects', 'generic', 'Generic', false)
    this.addGroupFromTiled('GenericObjectsOnCollide', 'generic', 'Generic', true)
    this.addGroupFromTiled('Basement', 'basement', 'Basement', true)

    this.otherPlayers = this.physics.add.group({ classType: OtherPlayer })

    this.cameras.main.zoom = 1
    this.cameras.main.startFollow(this.myPlayer, true)

    this.physics.add.collider([this.myPlayer, this.myPlayer.playerContainer], wallLayer)
    wallLayer.setCollisionBetween(1, 1000)

    this.physics.add.overlap(
      this.myPlayer,
      this.otherPlayers,
      this.handlePlayersOverlap,
      undefined,
      this
    )

    this.physics.add.overlap(
      this.myPlayer,
      this.luckyBoxArcadeGroup,
      (object1, object2) => {
        if (object1 instanceof LuckyBox) {
          // eaten
          object1.destroy()
        }

        if (object2 instanceof LuckyBox) {
          // eaten
          object2.destroy()
        }
      },
      undefined,
      this
    )

    // register network event listeners
    this.network.onPlayerJoined(this.handlePlayerJoined, this)
    this.network.onPlayerLeft(this.handlePlayerLeft, this)
    this.network.onPlayerUpdated(this.handlePlayerUpdated, this)
    this.network.onPlayerLeft(this.handlePlayerLeft, this)
  }

  private addObjectFromTiled(
    group: Phaser.Physics.Arcade.StaticGroup,
    object: Phaser.Types.Tilemaps.TiledObject,
    key: string,
    tilesetName: string
  ) {
    const actualX = object.x! + object.width! * 0.5
    const actualY = object.y! - object.height! * 0.5
    const tileset = this.map.getTileset(tilesetName)

    if (!tileset) {
      return
    }

    const obj = group.get(actualX, actualY, key, object.gid! - tileset.firstgid).setDepth(actualY)
    return obj
  }

  private addGroupFromTiled(
    objectLayerName: string,
    key: string,
    tilesetName: string,
    collidable: boolean
  ) {
    const group = this.physics.add.staticGroup()
    const objectLayer = this.map.getObjectLayer(objectLayerName)
    if (!objectLayer) {
      return
    }

    const tileset = this.map.getTileset(tilesetName)

    if (!tileset) {
      return
    }

    objectLayer.objects.forEach((object) => {
      const actualX = object.x! + object.width! * 0.5
      const actualY = object.y! - object.height! * 0.5
      group.get(actualX, actualY, key, object.gid! - tileset.firstgid).setDepth(actualY)
    })
    if (this.myPlayer && collidable)
      this.physics.add.collider([this.myPlayer, this.myPlayer.playerContainer], group)
  }

  update(t: number, dt: number) {
    if (this.myPlayer) {
      this.playerSelector.update(this.myPlayer, this.cursors)
      this.myPlayer.update(this.playerSelector, this.cursors, this.keyE, this.keyR, this.network)
    }
  }

  processLuckyBox() {
    this.luckyBoxGroups = mockLuckyBoxs
    this.luckyBoxArcadeGroup = this.physics.add.group({ classType: LuckyBox })

    this.luckyBoxGroups.forEach((group) => {
      const list = group.positions.map((pos) => new LuckyBox(this, pos))

      list.forEach((l) => {
        this.luckyBoxArcadeGroup.add(l)
        l.display()
      })

      setTimeout(() => {
        list.forEach((l) => {
          l.destroy()
        })
      }, diffTime(new Date(group.startTime), new Date(group.endTime)))
    })
  }
}

const diffTime = (time1: Date, time2: Date): number => {
  let differenceValue = time2.getTime() - time1.getTime()
  let result: number = Math.abs(Math.round(differenceValue))
  return result
}
