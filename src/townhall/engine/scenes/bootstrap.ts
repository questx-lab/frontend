import Phaser from 'phaser'

import { getCharactersApi } from '@/api/townhall'
import { EnvVariables } from '@/constants/env.const'
import { getCharacterSet } from '@/utils/character'

export interface BootstrapListener {
  onLoadComleted: () => void
}

export default class Bootstrap extends Phaser.Scene {
  private preloadComplete = false
  private listener: BootstrapListener
  startTime!: Date

  constructor(listener: BootstrapListener) {
    super('bootstrap')
    this.listener = listener
  }

  async preload() {
    this.startTime = new Date()
    if (this.preloadComplete) {
      return
    }
    // TODO: lazy loading
    this.load.baseURL = EnvVariables.TOWNHALL_ASSET_CDN

    await this.loadCharacters()

    this.load.tilemapTiledJSON('tilemap', '/map/jp_map.json')
    this.load.spritesheet('tiles_wall', '/map/jp_tileset.png', {
      frameWidth: 64,
      frameHeight: 64,
    })

    this.load.spritesheet('tiles_effect_leaderboard', '/map/effect_leaderboard.png', {
      frameWidth: 64 * 3,
      frameHeight: 64,
    })

    this.load.spritesheet('games', '/map/jp_tileset.png', {
      frameWidth: 64,
      frameHeight: 64,
    })

    this.load.spritesheet('leaderboards', '/map/jp_tileset.png', {
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

    this.preloadComplete = true

    this.listener.onLoadComleted()
  }

  async loadCharacters() {
    const resp = await getCharactersApi()

    if (resp.code === 0 && resp.data)
      resp.data.game_characters.forEach((character) => {
        const characterSet = getCharacterSet(character)

        this.load.spritesheet(characterSet, `/characters/${characterSet}.png`, {
          frameWidth: 32,
          frameHeight: 48,
        })
      })
    const now = new Date()
    console.log('load characters', Math.abs(now.getTime() - this.startTime.getTime()))
  }
}
