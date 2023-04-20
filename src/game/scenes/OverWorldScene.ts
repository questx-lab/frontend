import { BaseScene } from './base'

export default class OverWorldScene extends BaseScene {
  constructor() {
    super('OverWorldScene')
  }

  preload() {
    console.log('Loading overworld map')
    this.load.image('TilesetImage', '/assets/tilesets/tileset_extruded.png')
    this.load.tilemapTiledJSON('OverWorldMap', '/assets/maps/overworld_v.json')
    this.load.atlas(
      'atlas',
      '/assets/atlas/player.png',
      '/assets/atlas/player.json'
    )
  }

  create() {
    super.create('OverWorldMap')

    this.physics.world.setBounds(0, 0, 1920, 1088)
    this.cameras.main.setBounds(0, 0, 1920, 1088)

    this.collide_with_world()
  }
}
