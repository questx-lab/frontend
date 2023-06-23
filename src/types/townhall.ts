import Phaser from 'phaser'

import { UserType } from '@/types'

export enum ItemType {
  CHAIR,
  COMPUTER,
  WHITEBOARD,
  VENDINGMACHINE,
  LUCKY_BOX,
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

// ===== SOCKET MESSAGE TYPE =====
export interface PixelPosition {
  x: number
  y: number
}

export interface Player {
  id: string
  name: string
}

interface User {
  direction: string
  pixel_position: PixelPosition
  player: Player
  user: UserType
}

export interface MessageHistoryItem {
  created_at: any
  message: string
  user: UserType
}

export interface MessageInitValue {
  message_history: MessageHistoryItem[]
  users: User[]
  luckyboxes: LuckyBoxType[]
}

export interface MessageJoinValue {
  direction: string
  position: PixelPosition
  user: UserType
}

export interface MessageMoveValue {
  direction: string
  x: number
  y: number
}

export interface MessageEmoji {
  emoji: string
}

export interface MessageReceiver {
  user_id: string
  type: string
  value:
    | MessageInitValue
    | MessageJoinValue
    | MessageMoveValue
    | MessageEmoji
    | MessageHistoryItem
    | LuckyBoxValue
}

export interface MapData {
  id: string
  config_url: string
  tilesets: any[]
  players: Player[]
}

export interface RoomDataType {
  id: string
  name: string
  map: MapData
}

export type PositionType = {
  x: number
  y: number
}

export type LuckyBoxType = {
  id: string
  event_id: string
  position: PositionType
}
export type LuckyBoxValue = {
  luckyboxes?: LuckyBoxType[]
}

export type CollectLuckyBoxValue = {
  luckybox: LuckyBoxType
}

export interface LuckyBoxReq {
  room_id: string
  number_of_boxes: number
  point_per_box: number
  start_time: string
  duration: number
}
