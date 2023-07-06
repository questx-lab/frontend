import '@/townhall/engine/characters/my-player'
import '@/townhall/engine/characters/other-player'

import Phaser from 'phaser'

import { MessageReceiverEnum } from '@/constants/townhall'
import { createCharacterAnims } from '@/townhall/engine/anims/CharacterAnims'
import MyPlayer from '@/townhall/engine/characters/my-player'
import OtherPlayer from '@/townhall/engine/characters/other-player'
import GameItem from '@/townhall/engine/items/game'
import Item from '@/townhall/engine/items/Item'
import LuckyBox from '@/townhall/engine/items/LuckyBox'
import phaserGame from '@/townhall/engine/services/game-controller'
import network from '@/townhall/engine/services/network'
import {
  CollectLuckyBoxValue,
  IPlayer,
  Keyboard,
  LuckyBoxValue,
  NavKeys,
  PlayerBehavior,
} from '@/types/townhall'

export default class Game extends Phaser.Scene {
  private map!: Phaser.Tilemaps.Tilemap
  myPlayer!: MyPlayer
  private otherPlayers!: Phaser.Physics.Arcade.Group
  private otherPlayerMap = new Map<string, OtherPlayer>()
  private cursors!: NavKeys
  private keyE!: Phaser.Input.Keyboard.Key
  private keyX!: Phaser.Input.Keyboard.Key
  luckyBoxes = new Map<string, LuckyBox>()
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
    this.keyX = this.input.keyboard.addKey('X')
    this.input.keyboard.disableGlobalCapture()
  }

  deRegisterKeys() {
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

  private handleItemSelectorOverlap(myPlayer: any, selectionItem: any) {
    const currentItem = myPlayer.selectedItem as Item
    // currentItem is undefined if nothing was perviously selected
    if (currentItem) {
      // if the selection has not changed, do nothing
      if (currentItem === selectionItem || currentItem.depth >= selectionItem.depth) {
        return
      }
      // if selection changes, clear pervious dialog
      if (this.myPlayer.playerBehavior !== PlayerBehavior.SITTING) currentItem.clearDialogBox()
    }

    // set selected item and set up new dialog
    myPlayer.selectedItem = selectionItem
    selectionItem.onOverlapDialog()
  }

  async create() {
    this.registerKeys()
    await createCharacterAnims(this.anims)

    this.map = this.make.tilemap({ key: 'tilemap' })
    const FloorAndGround = this.map.addTilesetImage('FloorAndGround', 'tiles_wall')

    if (!FloorAndGround) {
      return
    }
    this.map.createLayer('Ground', FloorAndGround)
    const wallLayer = this.map.createLayer('Wall', FloorAndGround)
    this.map.createLayer('Float', FloorAndGround)?.setDepth(10000)
    this.map.createLayer('Object', FloorAndGround)
    this.map.createLayer('Doors', FloorAndGround)

    if (!wallLayer) {
      return
    }
    wallLayer.setCollisionByProperty({ collides: true })

    // add my player
    this.myPlayer = this.add.myPlayer(2368, 1792, 'adam_0', '')
    this.myPlayer.setPlayerTexture('adam_0')

    const games = this.physics.add.staticGroup({ classType: GameItem })
    const gameLayer = this.map.getObjectLayer('Game')
    if (gameLayer) {
      gameLayer.objects.forEach((obj, i) => {
        const item = this.addObjectFromTiled(games, obj, 'games', 'FloorAndGround') as GameItem
        item.setDepth(item.y + item.height * 0.27)
        const id = `${i}`
        item.id = id
      })
    }

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

    // TODO: enable interactive game when it's ready
    // this.physics.add.overlap(
    //   this.myPlayer,
    //   [games],
    //   this.handleItemSelectorOverlap,
    //   undefined,
    //   this
    // )

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
          const box = this.luckyBoxes.get(object1.id)

          if (box) {
            this.luckyBoxArcadeGroup.kill(box)
            this.removeLuckyBoxById(object1.id)

            network.send({
              type: MessageReceiverEnum.COLLECT_LUCKY_BOX,
              value: {
                luckybox_id: object1.id,
              },
            })
          }
        }

        if (object2 instanceof LuckyBox) {
          const box = this.luckyBoxes.get(object2.id)
          if (box) {
            this.luckyBoxArcadeGroup.kill(box)
            this.removeLuckyBoxById(object2.id)
            network.send({
              type: MessageReceiverEnum.COLLECT_LUCKY_BOX,
              value: {
                luckybox_id: object2.id,
              },
            })
          }
        }
      },
      undefined,
      this
    )

    // register network event listeners
    phaserGame.onPlayerJoined(this.handlePlayerJoined, this)
    phaserGame.onPlayerLeft(this.handlePlayerLeft, this)
    phaserGame.onPlayerUpdated(this.handlePlayerUpdated, this)
    phaserGame.onPlayerLeft(this.handlePlayerLeft, this)
    phaserGame.onCreateLuckyBoxes(this.handleCreateLuckyBoxes, this)
    phaserGame.onCollectLuckyBox(this.handleCollectLuckyBox, this)
    phaserGame.onRemoveLuckyBoxes(this.handleRemoveLuckyBoxes, this)
    phaserGame.onMyPlayerEmoji(this.handleMyPlayerEmoji, this)
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
      this.myPlayer.update(this.cursors, this.keyE, this.keyX)
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
      this.luckyBoxes.set(box.id, box)
    })
  }

  removeLuckyBoxById(id: string) {
    const box = this.luckyBoxes.get(id)
    if (box) {
      this.luckyBoxArcadeGroup.kill(box)
      box.destroy()
      this.luckyBoxes.delete(id)
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

  handleMyPlayerEmoji(emoji: string) {
    this.myPlayer.setPlayerEmoji(emoji)
  }
}
