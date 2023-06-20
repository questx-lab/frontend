import Phaser from 'phaser'

import MyPlayer from '@/townhall/engine/characters/my-player'
import Item from '@/townhall/engine/items/Item'
import { NavKeys, PlayerBehavior } from '@/types/townhall'

export default class PlayerSelector extends Phaser.GameObjects.Zone {
  selectedItem?: Item

  constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
    super(scene, x, y, width, height)

    scene.physics.add.existing(this)
  }

  update(player: MyPlayer, cursors: NavKeys) {
    if (!cursors) {
      return
    }

    // no need to update player selection while sitting
    if (player.playerBehavior === PlayerBehavior.SITTING) {
      return
    }

    // while currently selecting an item,
    // if the selector and selection item stop overlapping, clear the dialog box and selected item
    if (this.selectedItem) {
      if (!this.scene.physics.overlap(this, this.selectedItem)) {
        this.selectedItem.clearDialogBox()
        this.selectedItem = undefined
      }
    }
  }
}
