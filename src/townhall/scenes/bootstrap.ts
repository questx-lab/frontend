import Phaser from 'phaser'

import { EnvVariables } from '@/constants/env.const'
import Network from '@/townhall/services/network'

export default class Bootstrap extends Phaser.Scene {
  private preloadComplete = false
  network!: Network

  constructor() {
    super('bootstrap')
  }

  preload() {
    // TODO: lazy loading
    this.load.baseURL = EnvVariables.TOWNHALL_ASSET_CDN

    this.load.atlas('cloud_day', '/background/cloud_day.png', '/background/cloud_day.json')
    this.load.image('backdrop_day', '/background/backdrop_day.png')
    this.load.atlas('cloud_night', '/background/cloud_night.png', '/background/cloud_night.json')
    this.load.image('backdrop_night', '/background/backdrop_night.png')
    this.load.image('sun_moon', '/background/sun_moon.png')

    this.load.tilemapTiledJSON('tilemap', '/map/map.json')
    this.load.spritesheet('tiles_wall', '/map/FloorAndGround.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet('chairs', '/items/chair.png', {
      frameWidth: 32,
      frameHeight: 64,
    })
    this.load.spritesheet('computers', '/items/computer.png', {
      frameWidth: 96,
      frameHeight: 64,
    })
    this.load.spritesheet('whiteboards', '/items/whiteboard.png', {
      frameWidth: 64,
      frameHeight: 64,
    })
    this.load.spritesheet('vendingmachines', '/items/vendingmachine.png', {
      frameWidth: 48,
      frameHeight: 72,
    })
    this.load.spritesheet('office', '/tileset/Modern_Office_Black_Shadow.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet('basement', '/tileset/Basement.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet('generic', '/tileset/Generic.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet('adam', '/character/adam.png', {
      frameWidth: 32,
      frameHeight: 48,
    })

    this.load.on('complete', () => {
      this.preloadComplete = true
      this.launchBackground()
    })
  }

  init() {
    this.network = new Network()
  }

  private launchBackground() {
    this.scene.launch('background', { backgroundMode: 0 })
  }

  launchGame() {
    if (!this.preloadComplete) return
    this.scene.launch('game', {
      network: this.network,
    })
  }
}
