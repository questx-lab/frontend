import Item from '@/townhall/items/Item'
import { ItemType } from '@/types/townhall'

export default class VendingMachine extends Item {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame)

    this.itemType = ItemType.VENDINGMACHINE
  }

  onOverlapDialog() {
    this.setDialogBox('Press R to buy a coffee :)')
  }
}
