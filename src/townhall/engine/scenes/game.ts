import '@/townhall/engine/characters/my-player'
import '@/townhall/engine/characters/other-player'

import Phaser from 'phaser'

import { createCharacterAnims } from '@/townhall/engine/anims/CharacterAnims'
import MyPlayer from '@/townhall/engine/characters/my-player'
import OtherPlayer from '@/townhall/engine/characters/other-player'
import PlayerSelector from '@/townhall/engine/characters/player-selecter'
import Network from '@/townhall/engine/services/network'
import { CollectLuckyBoxValue, IPlayer, Keyboard, LuckyBoxValue, NavKeys } from '@/types/townhall'
import LuckyBox from '@/townhall/engine/items/LuckyBox'

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
  luckyBoxes: LuckyBox[]
  private luckyBoxArcadeGroup!: Phaser.Physics.Arcade.Group

  constructor() {
    super('game')
    this.luckyBoxes = []
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
    this.luckyBoxArcadeGroup = this.physics.add.group({ classType: LuckyBox })

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
      async (object1, object2) => {
        if (object1 instanceof LuckyBox) {
          const box = this.luckyBoxes.find((box) => box.id === object1.id)

          if (box) {
            this.luckyBoxArcadeGroup.kill(box)
            this.removeLuckyBoxById(object1.id)
            await this.network.collectLuckyBox(object1.id)
          }
        }

        if (object2 instanceof LuckyBox) {
          const box = this.luckyBoxes.find((box) => box.id === object2.id)
          if (box) {
            this.luckyBoxArcadeGroup.kill(box)
            this.removeLuckyBoxById(object2.id)
            await this.network.collectLuckyBox(object2.id)
          }
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
    this.network.onCreateLuckyBoxes(this.handleCreateLuckyBoxes, this)
    this.network.onCollectLuckyBox(this.handleCollectLuckyBox, this)
    this.network.onRemoveLuckyBoxes(this.handleRemoveLuckyBoxes, this)
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

  handleCreateLuckyBoxes(value: LuckyBoxValue) {
    if (!value.luckyboxes) return
    const newLuckyboxes = value.luckyboxes.map(
      (luckyBox) =>
        new LuckyBox(this, luckyBox.event_id, luckyBox.id, {
          x: luckyBox.position.x,
          y: luckyBox.position.y,
        })
    )
    newLuckyboxes.forEach((box) => {
      box.display()
      this.luckyBoxArcadeGroup.add(box)
    })
    this.luckyBoxes = [...this.luckyBoxes, ...newLuckyboxes]
  }

  removeLuckyBoxById(id: string) {
    const index = this.luckyBoxes.findIndex((box) => box.id === id)
    if (index !== -1) {
      this.luckyBoxArcadeGroup.kill(this.luckyBoxes[index])
      this.luckyBoxes[index].destroy()
      this.luckyBoxes.splice(index, 1)
    }
  }

  handleCollectLuckyBox(value: CollectLuckyBoxValue, userId: string) {
    this.removeLuckyBoxById(value.luckybox.id)
    if (userId === this.myPlayer.playerId) {
      this.myPlayer.setCollectLuckyBox(true)
      setTimeout(() => {
        this.myPlayer.setCollectLuckyBox(false)
      }, 2000)
    } else {
      const otherPlayer = this.otherPlayerMap.get(userId)
      if (otherPlayer) {
        otherPlayer.setCollectLuckyBox(true)
        setTimeout(() => {
          otherPlayer.setCollectLuckyBox(false)
        }, 2000)
      }
    }
  }

  removeLuckyBoxByIds(ids: string[]) {
    if (ids.length === 0) return

    ids.forEach((id) => this.removeLuckyBoxById(id))
  }

  handleRemoveLuckyBoxes(value: LuckyBoxValue) {
    if (!value.luckyboxes) return
    const ids = value.luckyboxes.map((box) => box.id)
    this.removeLuckyBoxByIds(ids)
  }
}
