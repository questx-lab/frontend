import Phaser from 'phaser'

export class BaseScene extends Phaser.Scene {
  movable = true
  map: any
  LayerToCollide: any
  player: any
  cursors: any
  wasd: any
  signs: any
  showingSign: any

  // --------------------------------------------------------------------------------------------------
  // CREATE
  create(tilemapKey: string) {
    // ----------------
    // MAP AND TILESET
    this.map = this.make.tilemap({ key: tilemapKey })

    const tileset = this.map.addTilesetImage(
      'tileset',
      'TilesetImage',
      32,
      32,
      1,
      2
    )

    this.map.createLayer('Ground1', tileset, 0, 0)
    this.map.createLayer('Ground2', tileset, 0, 0)
    this.map.createLayer('Collision1', tileset, 0, 0)
    this.map.createLayer('Collision2', tileset, 0, 0)
    this.map.createLayer('Above', tileset, 0, 0).setDepth(10)
    this.LayerToCollide = this.map.createLayer('CollisionLayer', tileset, 0, 0)
    this.LayerToCollide.setVisible(false)
  }

  getPlayerPosition() {
    this.events.emit('player', this.player)
  }

  catchDoBreak() {
    this.movable = !this.movable
  }

  // ---------------------------------------------------
  resize(
    gameSize: { width: number; height: number },
    baseSize: any,
    displaySize: any,
    resolution: any
  ) {
    this.cameras.resize(gameSize.width, gameSize.height)
  }

  collide_with_world() {
    this.physics.add.collider(this.player, this.LayerToCollide)
    this.LayerToCollide.setCollisionBetween(40, 41)
  }
}
