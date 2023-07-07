import Phaser from 'phaser'

export const phaserEvents = new Phaser.Events.EventEmitter()

export enum Event {
  LOAD_MAP_COMPLETED = 'load-map-completed',
  CONNECT_ROOM = 'connect-room',
  MY_PLAYER_NAME_CHANGE = 'my-player-name-change',
  MY_PLAYER_EMOJI_CHANGE = 'my-player-emoji-change',
  BACKGROUND_EMOJI_CHANGE = 'background-emoji-change',
  MY_PLAYER_CHANGE = 'my-player-change',
  MY_PLAYER_TEXTURE_CHANGE = 'my-player-texture-change',
  MY_PLAYER_DATA_CHANGE = 'my-player-data-change',
  PLAYER_DISCONNECTED = 'player-disconnected',
  PLAYER_JOINED = 'player-joined',
  MY_PLAYER_JOINED = 'my_player-joined',
  PLAYER_LEFT = 'player-left',
  PLAYER_UPDATED = 'player-updated',
  MY_PLAYER_READY = 'my-player-ready',
  CREATE_LUCKY_BOXES = 'create-lucky-boxes',
  COLLECT_LUCKY_BOX = 'collect-lucky-box',
  REMOVE_LUCKY_BOXES = 'remove-lucky-box',
}
