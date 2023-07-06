import Phaser from 'phaser'

import { EnvVariables } from '@/constants/env.const'
import { getCharactersApi } from '@/api/communitiy'

export interface BootstrapListener {
  onLoadComleted: () => void
  connectRoom: () => void
}

export default class Bootstrap extends Phaser.Scene {
  private preloadComplete = false
  private listener: BootstrapListener

  constructor(listener: BootstrapListener) {
    super('bootstrap')
    this.listener = listener
  }

  async preload() {
    if (this.preloadComplete) {
      return
    }

    // TODO: lazy loading
    this.load.baseURL = EnvVariables.TOWNHALL_ASSET_CDN

    this.load.atlas('cloud_day', '/background/cloud_day.png', '/background/cloud_day.json')
    this.load.image('backdrop_day', '/background/backdrop_day.png')
    this.load.atlas('cloud_night', '/background/cloud_night.png', '/background/cloud_night.json')
    this.load.image('backdrop_night', '/background/backdrop_night.png')
    this.load.image('sun_moon', '/background/sun_moon.png')

    this.load.tilemapTiledJSON('tilemap', '/map/jp_map.json')
    this.load.spritesheet('tiles_wall', '/map/jp_tileset.png', {
      frameWidth: 32,
      frameHeight: 32,
    })

    this.load.spritesheet('games', '/map/jp_tileset.png', {
      frameWidth: 64,
      frameHeight: 64,
    })

    // should change if we have lucky box image
    this.load.spritesheet('lucky_box', '/items/box.png', {
      frameWidth: 64,
      frameHeight: 64,
    })

    this.load.spritesheet('coin', '/items/coin.png', {
      frameWidth: 32,
      frameHeight: 32,
    })

    await this.loadCharacters()
    this.load.on('complete', () => {
      this.preloadComplete = true
      this.listener.onLoadComleted()
    })
  }

  launchGame() {
    if (!this.preloadComplete) return

    // this.scene.launch('game', {
    //   network: this.network,
    // })
  }
  connectRoom() {
    if (!this.preloadComplete) return
    this.listener.connectRoom()
  }

  async loadCharacters() {
    const resp = await getCharactersApi()

    if (resp.code === 0 && resp.data)
      resp.data.game_characters.forEach((character) => {
        this.load.spritesheet(character.name, `/character/${character.name}.png`, {
          frameWidth: 32,
          frameHeight: 48,
        })
      })
  }
}
