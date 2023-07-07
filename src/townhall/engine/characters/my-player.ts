import Phaser from 'phaser'

import Player from '@/townhall/engine/characters/Player'
import { Event, phaserEvents } from '@/townhall/engine/events/event-center'
import Item from '@/townhall/engine/items/Item'
import phaserGame from '@/townhall/engine/services/game-controller'
import { ItemType, NavKeys, PlayerBehavior } from '@/types/townhall'

export default class MyPlayer extends Player {
  private playContainerBody: Phaser.Physics.Arcade.Body
  selectedItem?: Item
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    id: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, id, frame)
    this.playContainerBody = this.playerContainer.body as Phaser.Physics.Arcade.Body
  }

  setPlayerEmoji(emoji: string) {
    this.playerEmoji.setText(emoji)
    this.backgroundEmoji.setText('🗨')
    setTimeout(() => {
      this.playerEmoji.setText('')
      this.backgroundEmoji.setText('')
    }, 2000)
  }

  setCollectLuckyBox(active: boolean) {
    this.luckyBoxCollected.setVisible(active)
  }

  updateMyPlayer(name: string, x: number, y: number, id: string) {
    this.playerName.setText(name)
    this.playerId = id
    this.x = x
    this.y = y
    phaserEvents.emit(Event.MY_PLAYER_CHANGE, x, y, id)
  }

  setPlayerTexture(texture: string) {
    this.playerTexture = texture
    this.anims.play(`${this.playerTexture}_idle_down`, true)
    if (this.anims.currentAnim) {
      phaserEvents.emit(Event.MY_PLAYER_TEXTURE_CHANGE, this.x, this.y, this.anims.currentAnim.key)
    }
  }

  update(cursors: NavKeys, keyE: Phaser.Input.Keyboard.Key, keyX: Phaser.Input.Keyboard.Key) {
    if (!cursors) return

    const item = this.selectedItem

    if (Phaser.Input.Keyboard.JustDown(keyX)) {
      switch (item?.itemType) {
        // TODO: handle action
        case ItemType.GAME:
          phaserGame.pause()
          phaserGame.changePlayerSelectorListeners(ItemType.GAME)
          break
        case ItemType.LEADERBOARD:
          phaserGame.pause()
          phaserGame.changePlayerSelectorListeners(ItemType.LEADERBOARD)
          break
      }
    }
    if (!this.body) {
      return
    }
    if (!this.anims.currentAnim) {
      return
    }

    switch (this.playerBehavior) {
      case PlayerBehavior.IDLE:
        // if press E in front of selected chair
        const speed = 200
        let vx = 0
        let vy = 0

        let joystickLeft = false
        let joystickRight = false
        let joystickUp = false
        let joystickDown = false

        if (cursors.left?.isDown || cursors.A?.isDown || joystickLeft) vx -= speed
        if (cursors.right?.isDown || cursors.D?.isDown || joystickRight) vx += speed
        if (cursors.up?.isDown || cursors.W?.isDown || joystickUp) {
          vy -= speed
          this.setDepth(this.y) //change player.depth if player.y changes
        }
        if (cursors.down?.isDown || cursors.S?.isDown || joystickDown) {
          vy += speed
          this.setDepth(this.y) //change player.depth if player.y changes
        }
        // update character velocity
        this.setVelocity(vx, vy)

        this.body.velocity.setLength(speed)
        // also update playerNameContainer velocity
        this.playContainerBody.setVelocity(vx, vy)
        this.playContainerBody.velocity.setLength(speed)

        // update animation according to velocity and send new location and anim to server
        if (vx !== 0 || vy !== 0)
          phaserGame.updatePlayer(this.x, this.y, this.anims.currentAnim.key)
        if (vx > 0) {
          this.play(`${this.playerTexture}_run_right`, true)
        } else if (vx < 0) {
          this.play(`${this.playerTexture}_run_left`, true)
        } else if (vy > 0) {
          this.play(`${this.playerTexture}_run_down`, true)
        } else if (vy < 0) {
          this.play(`${this.playerTexture}_run_up`, true)
        } else {
          const parts = this.anims.currentAnim.key.split('_')
          parts[1] = 'idle'
          const newAnim = parts.join('_')
          // this prevents idle animation keeps getting called
          if (this.anims.currentAnim.key !== newAnim) {
            this.play(parts.join('_'), true)
            // send new location and anim to server
            phaserGame.updatePlayer(this.x, this.y, this.anims.currentAnim.key)
          }
        }
        break

      case PlayerBehavior.SITTING:
        // back to idle if player press E while sitting
        if (Phaser.Input.Keyboard.JustDown(keyE)) {
          const parts = this.anims.currentAnim.key.split('_')
          parts[1] = 'idle'
          this.play(parts.join('_'), true)
          this.playerBehavior = PlayerBehavior.IDLE
          // TODO: send new action to server
        }
        break
    }

    if (this.selectedItem) {
      if (!this.scene.physics.overlap(this, this.selectedItem)) {
        if (this.selectedItem.itemType === ItemType.LEADERBOARD) {
          const sprite = this.selectedItem.scene.children.getByName(
            'effect_leaderboard'
          ) as Phaser.GameObjects.Sprite
          if (sprite) {
            sprite.setVisible(false)
          }
        }
        this.selectedItem.clearDialogBox()
        this.selectedItem = undefined
      }
    }
  }
}

declare global {
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      myPlayer: (
        x: number,
        y: number,
        texture: string,
        id: string,
        frame?: string | number
      ) => MyPlayer
    }
  }
}

Phaser.GameObjects.GameObjectFactory.register(
  'myPlayer',
  function (
    this: Phaser.GameObjects.GameObjectFactory,
    x: number,
    y: number,
    texture: string,
    id: string,
    frame?: string | number
  ) {
    const sprite = new MyPlayer(this.scene, x, y, texture, id, frame)
    this.displayList.add(sprite)
    this.updateList.add(sprite)

    this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY)

    const collisionScale = [0.5, 0.2]
    if (!sprite.body) {
      return
    }
    sprite.body
      .setSize(sprite.width * collisionScale[0], sprite.height * collisionScale[1])
      .setOffset(
        sprite.width * (1 - collisionScale[0]) * 0.5,
        sprite.height * (1 - collisionScale[1])
      )

    return sprite
  }
)
