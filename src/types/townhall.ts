import Phaser from 'phaser'

export enum ItemType {
  CHAIR,
  COMPUTER,
  WHITEBOARD,
  VENDINGMACHINE,
}

export enum PlayerBehavior {
  IDLE,
  SITTING,
}

export type Keyboard = {
  W: Phaser.Input.Keyboard.Key
  S: Phaser.Input.Keyboard.Key
  A: Phaser.Input.Keyboard.Key
  D: Phaser.Input.Keyboard.Key
}

export type NavKeys = Keyboard & Phaser.Types.Input.Keyboard.CursorKeys

export interface IPlayer {
  name: string
  x: number
  y: number
  anim: string
}

export interface IOfficeState {
  players: IPlayer[]
}

export enum RoomType {
  LOBBY = 'lobby',
  PUBLIC = 'skyoffice',
  CUSTOM = 'custom',
}
