import Item from '@/townhall/engine/items/Item'
import { ItemType } from '@/types/townhall'

export default class GameItem extends Item {
  id?: string

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame)

    this.itemType = ItemType.GAME
  }

  onOverlapDialog() {
    this.setDialogBox('Press X to play game')
  }
}
