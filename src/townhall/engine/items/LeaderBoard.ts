import Item from '@/townhall/engine/items/Item'
import { ItemType } from '@/types/townhall'

export default class LeaderBoard extends Item {
  itemDirection?: string
  zone!: Phaser.GameObjects.Zone
  x: number
  y: number
  width: number
  height: number

  constructor(scene: Phaser.Scene, x: number, y: number, frame?: string | number) {
    super(scene, x, y, '', frame)

    this.itemType = ItemType.LEADER_BOARD
    this.zone = this.scene.add.zone(x, y, 64 + 10, 64 + 10)
    this.x = x
    this.y = y
    this.width = 64 + 10
    this.height = 64 + 10

    this.scene.physics.add.existing(this.zone, false)
  }

  onOverlapDialog() {
    this.setDialogBox('Press X to read')

    setTimeout(() => {
      this.clearDialogBox()
    }, 2000)
  }

  display() {
    this.scene.add.image(2368, 1792, 'whiteboards')

    this.dialogBox.setVisible(false)
  }
}
