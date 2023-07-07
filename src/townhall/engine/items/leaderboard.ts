import Item from '@/townhall/engine/items/Item'
import { ItemType } from '@/types/townhall'

export default class LeaderboardItem extends Item {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame)

    this.itemType = ItemType.LEADERBOARD
  }

  onOverlapDialog() {
    const sprite = this.scene.children.getByName('effect_leaderboard') as Phaser.GameObjects.Sprite
    if (sprite) {
      sprite.setVisible(true)
    }

    this.setDialogBox('Press X to show Leaderboard')
  }
}
