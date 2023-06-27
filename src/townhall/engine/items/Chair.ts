import Item from '@/townhall/engine/items/Item'
import { ItemType } from '@/types/townhall'

export default class Chair extends Item {
  itemDirection?: string

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame)

    this.itemType = ItemType.CHAIR
  }

  onOverlapDialog() {
    this.setDialogBox('Press E to sit')
  }
}
