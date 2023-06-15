import Phaser from 'phaser'

export const phaserEvents = new Phaser.Events.EventEmitter()

export enum Event {
  MY_PLAYER_NAME_CHANGE = 'my-player-name-change',
  MY_PLAYER_TEXTURE_CHANGE = 'my-player-texture-change',
  PLAYER_DISCONNECTED = 'player-disconnected',
  PLAYER_JOINED = 'player-joined',
  PLAYER_LEFT = 'player-left',
}
