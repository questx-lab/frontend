import '@/townhall/engine/characters/my-player'
import '@/townhall/engine/characters/other-player'

import Phaser from 'phaser'

import { createCharacterAnims } from '@/townhall/engine/anims/CharacterAnims'
import MyPlayer from '@/townhall/engine/characters/my-player'
import OtherPlayer from '@/townhall/engine/characters/other-player'
import PlayerSelector from '@/townhall/engine/characters/player-selecter'
import Network from '@/townhall/engine/services/network'
import { IPlayer, Keyboard, NavKeys } from '@/types/townhall'

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

    // add my player
    this.myPlayer = this.add.myPlayer(705, 500, 'adam', 'c54gxiLbP')
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

    this.cameras.main.zoom = 0.6
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
}
