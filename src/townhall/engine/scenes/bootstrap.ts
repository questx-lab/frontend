import Phaser from 'phaser'

import { EnvVariables } from '@/constants/env.const'
import { CharacterType } from '@/types'
import { getCharacterSet } from '@/utils/character'

export interface BootstrapListener {
  onLoadComleted: () => void
}

export default class Bootstrap extends Phaser.Scene {
  private preloadComplete = false
  private listener: BootstrapListener
  private characterList: CharacterType[]

  constructor(listener: BootstrapListener, characterList: CharacterType[]) {
    super('bootstrap')
    this.listener = listener
    this.characterList = characterList
  }

  preload() {
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

    this.characterList.forEach((character) => {
      const characterSet = getCharacterSet(character)

      this.load.spritesheet(characterSet, `/characters/${characterSet}.png`, {
        frameWidth: 32,
        frameHeight: 48,
      })
    })

    this.load.on('complete', () => {
      console.log('Bootstrap COMPLETED')
      this.preloadComplete = true
      this.listener.onLoadComleted()
    })
  }
}
