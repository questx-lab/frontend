import Item from '@/townhall/engine/items/Item'
import { ItemType, PositionType } from '@/types/townhall'

export default class LuckyBox extends Item {
  private value!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
  private position!: PositionType

  constructor(scene: Phaser.Scene, position: PositionType, frame?: string | number) {
    super(scene, position.x, position.y, '', frame)

    this.itemType = ItemType.LUCKY_BOX
    this.position = position
  }

  display() {
    this.value = this.scene.physics.add.image(this.position.x, this.position.y, 'lucky_box')
  }

  destroy() {
    this.value.destroy()
  }
}
