import '@/townhall/characters/my-player'

import Phaser from 'phaser'

import { createCharacterAnims } from '@/townhall/anims/CharacterAnims'
import MyPlayer from '@/townhall/characters/my-player'
import PlayerSelector from '@/townhall/characters/player-selecter'
import Chair from '@/townhall/items/Chair'
import { Keyboard, NavKeys } from '@/types/townhall'

export default class Game extends Phaser.Scene {
  private map!: Phaser.Tilemaps.Tilemap
  myPlayer!: MyPlayer
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

  create() {
    console.log('vao game')
    createCharacterAnims(this.anims)

    this.map = this.make.tilemap({ key: 'tilemap' })
    const FloorAndGround = this.map.addTilesetImage('FloorAndGround', 'tiles_wall')
    if (!FloorAndGround) {
      return
    }
    const groundLayer = this.map.createLayer('Ground', FloorAndGround)
    if (!groundLayer) {
      return
    }
    groundLayer.setCollisionByProperty({ collides: true })

    // add my player
    this.myPlayer = this.add.myPlayer(705, 500, 'adam', 'c54gxiLbP')
    this.playerSelector = new PlayerSelector(this, 0, 0, 16, 16)

    // TODO: temporary add hard user here
    this.myPlayer.setPlayerName('Test user')
    this.myPlayer.setPlayerTexture('adam')

    // import chair objects from Tiled map to Phaser
    const chairs = this.physics.add.staticGroup({ classType: Chair })
    const chairLayer = this.map.getObjectLayer('Chair')
    if (!chairLayer) {
      return
    }

    chairLayer.objects.forEach((chairObj) => {
      const item = this.addObjectFromTiled(chairs, chairObj, 'chairs', 'chair') as Chair
      // custom properties[0] is the object direction specified in Tiled
      item.itemDirection = chairObj.properties[0].value
    })

    // import other objects from Tiled map to Phaser
    this.addGroupFromTiled('Wall', 'tiles_wall', 'FloorAndGround', false)
    this.addGroupFromTiled('Objects', 'office', 'Modern_Office_Black_Shadow', false)
    this.addGroupFromTiled('ObjectsOnCollide', 'office', 'Modern_Office_Black_Shadow', true)
    this.addGroupFromTiled('GenericObjects', 'generic', 'Generic', false)
    this.addGroupFromTiled('GenericObjectsOnCollide', 'generic', 'Generic', true)
    this.addGroupFromTiled('Basement', 'basement', 'Basement', true)

    this.cameras.main.zoom = 1.5
    this.cameras.main.startFollow(this.myPlayer, true)

    this.physics.add.collider([this.myPlayer, this.myPlayer.playerContainer], groundLayer)
    this.physics.add.overlap(this.playerSelector, [chairs], () => {}, undefined, this)
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
      this.myPlayer.update(this.playerSelector, this.cursors, this.keyE, this.keyR)
    }
  }
}
