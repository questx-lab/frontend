import Phaser from 'phaser'

import { Door } from './door'
import { Playee } from './playee'
import { Player } from './player'
import { Sign } from './sign'

Phaser.GameObjects.GameObjectFactory.register(
  'sign',
  function (this: any, x: any, y: any, text: any, direction: any) {
    return new Sign(this.scene, x, y, text, direction)
  }
)

Phaser.GameObjects.GameObjectFactory.register(
  'door',
  function (
    this: any,
    x: number,
    y: number,
    width: number | undefined,
    height: number | undefined,
    destination: any,
    link: any
  ) {
    return new Door(this.scene, x, y, width, height, destination, link)
  }
)

Phaser.GameObjects.GameObjectFactory.register(
  'player',
  function (this: any, x: any, y: any, texture: any, frame: any) {
    return new Player(this.scene, x, y, texture, frame)
  }
)

Phaser.GameObjects.GameObjectFactory.register(
  'playee',
  function (this: any, x: any, y: any, texture: any, frame: any) {
    return new Playee(this.scene, x, y, texture, frame)
  }
)
