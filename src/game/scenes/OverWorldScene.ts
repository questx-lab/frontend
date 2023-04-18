import './interactive/factory' // This has to run before the first scene in order to add the commands

import { BaseScene } from './base'

export default class OverWorldScene extends BaseScene {
  constructor() {
    super('OverWorldScene')
  }

  preload() {
    // The keys have to be unique! Otherwise they will not be preloaded again.
    // this.load.image("OverworldTiles", "./assets/prod/tilesets_and_maps/tileset.png");
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

    // Resize the world and camera bounds
    this.physics.world.setBounds(0, 0, 1920, 1088)
    this.cameras.main.setBounds(0, 0, 1920, 1088)

    this.collide_with_world() // Has to be called after the rest of the colliders are defined
  }
}
