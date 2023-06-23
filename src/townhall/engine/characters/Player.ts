import Phaser from 'phaser'

import { PlayerBehavior } from '@/types/townhall'

interface Directions {
  up: number[]
  down: number[]
  left: number[]
  right: number[]
}

/**
 * shifting distance for sitting animation
 * format: direction: [xShift, yShift, depthShift]
 */
export const sittingShiftData: Directions = {
  up: [0, 3, -10],
  down: [0, 3, 1],
  left: [0, -8, 10],
  right: [0, -8, 10],
}

export default class Player extends Phaser.Physics.Arcade.Sprite {
  playerId: string
  playerTexture: string
  playerBehavior = PlayerBehavior.IDLE
  readyToConnect = false
  videoConnected = false
  playerName: Phaser.GameObjects.Text
  playerEmoji: Phaser.GameObjects.Text
  luckyBoxCollected: Phaser.GameObjects.Image
  backgroundEmoji: Phaser.GameObjects.Text
  playerContainer: Phaser.GameObjects.Container
  private playerDialogBubble: Phaser.GameObjects.Container

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    id: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame)

    this.playerId = id
    this.playerTexture = texture
    this.setDepth(this.y)

    this.anims.play(`${this.playerTexture}_idle_down`, true)

    this.playerContainer = this.scene.add.container(this.x, this.y - 30).setDepth(5000)

    // add dialogBubble to playerContainer
    this.playerDialogBubble = this.scene.add.container(0, 0).setDepth(5000)
    this.playerContainer.add(this.playerDialogBubble)

    // add playerName to playerContainer
    this.playerName = this.scene.add
      .text(0, 0, '')
      .setFontFamily('Arial')
      .setFontSize(12)
      .setColor('#000000')
      .setOrigin(0.5)

    this.playerEmoji = this.scene.add
      .text(0, -8, '')
      .setFontFamily('Arial')
      .setFontSize(18)
      .setOrigin(0.5, 1.3)

    this.backgroundEmoji = this.scene.add
      .text(0, -8, '')
      .setFontFamily('Arial')
      .setFontSize(40)
      .setOrigin(0.5, 0.8)

    this.luckyBoxCollected = this.scene.add.image(0, -8, 'computer').setOrigin(0.5, 0.8)

    this.luckyBoxCollected.setVisible(false)

    this.playerContainer.add(this.playerName)
    this.playerContainer.add(this.backgroundEmoji)
    this.playerContainer.add(this.playerEmoji)
    this.playerContainer.add(this.luckyBoxCollected)

    this.scene.physics.world.enable(this.playerContainer)
    const playContainerBody = this.playerContainer.body as Phaser.Physics.Arcade.Body
    const collisionScale = [0.5, 0.2]
    playContainerBody
      .setSize(this.width * collisionScale[0], this.height * collisionScale[1])
      .setOffset(-8, this.height * (1 - collisionScale[1]) + 6)
  }
}
