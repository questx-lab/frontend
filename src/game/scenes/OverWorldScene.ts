import '../interactive/fatory'

import { BaseScene } from './base'

export default class OverWorldScene extends BaseScene {
  constructor() {
    super('OverWorldScene')
  }

  preload() {
    this.load.image('TilesetImage', '/tileset_extruded.png')
    this.load.baseURL = 'https://reeni-me.s3.us-west-004.backblazeb2.com'
    // this.load.tilemapTiledJSON('OverWorldMap', '/assets/maps/overworld_v.json')
    this.load.atlas('atlas', '/player.png', '/player.json')
    this.load.tilemapTiledJSON('OverWorldMap', '/overworld_v.json')
  }

  create() {
    super.create('OverWorldMap')

    this.physics.world.setBounds(0, 0, 1920, 1088)
    this.cameras.main.setBounds(0, 0, 1920, 1088)

    this.collide_with_world()
  }
}
