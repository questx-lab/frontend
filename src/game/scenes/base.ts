import Phaser from 'phaser'
import { w3cwebsocket as W3CWebSocket } from 'websocket'

import { getAccessToken } from '@/utils/helper'

export class BaseScene extends Phaser.Scene {
  movable = true
  map: any
  LayerToCollide: any
  player: any
  cursors: any
  wasd: any
  signs: any
  showingSign: any
  playerGuess: any
  // --------------------------------------------------------------------------------------------------
  // CREATE
  create(tilemapKey: string) {
    console.log('hello create')
    this.map = this.make.tilemap({ key: tilemapKey })
    const tileset = this.map.addTilesetImage(
      'tileset',
      'TilesetImage',
      32,
      32,
      1,
      2
    )

    this.map.createLayer('Ground1', tileset, 0, 0)
    this.map.createLayer('Ground2', tileset, 0, 0)
    this.map.createLayer('Collision1', tileset, 0, 0)
    this.map.createLayer('Collision2', tileset, 0, 0)
    this.map.createLayer('Above', tileset, 0, 0).setDepth(10) // To have the "Above" layer sit on top of the player, we give it a depth.
    this.LayerToCollide = this.map.createLayer('CollisionLayer', tileset, 0, 0)
    this.LayerToCollide.setVisible(false) // Comment out this line if you wish to see which objects the player will collide with
    const accessToken = getAccessToken()
    document.cookie = `access_token=${accessToken}`
    const client = new W3CWebSocket(
      'ws://localhost:8081/game?room_id=6483e6e3-534c-4cde-8be9-2c25d576adf7'
    )
    client.onmessage = (message) => {
      console.log('got reply! ', message.data)
      const rs = JSON.parse(message.data.toString())
      if (rs.type && rs.type === 'join') {
        console.log('heree', rs.user_id)
        this.playerGuess[rs.user_id] = (this.add as any).player(
          Math.floor(Math.random() * 100),
          Math.floor(Math.random() * 100),
          'atlas',
          'ariel-front'
        )
      }
      if (rs.type && rs.type === 'exit') {
        this.player.destroy()
      }
      console.log(this.playerGuess)
    }
    client.onerror = (error) => {
      console.log(error)
    }

    client.onclose = (event) => {
      console.log('event', event)
    }

    // ----------------
    // PLAYER
    const spawnPoint = this.map.findObject(
      'Objects',
      (obj: { name: string }) => obj.name === 'Spawn Point'
    )

    // Create the player and the player animations (see player.js)
    this.player = (this.add as any).player(
      spawnPoint.x,
      spawnPoint.y,
      'atlas',
      'ariel-front'
    )

    // CAMERA AND CURSORS
    const camera = this.cameras.main
    camera.startFollow(this.player)
    camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
    this.cursors = this.input.keyboard.createCursorKeys()
    this.wasd = {
      w: this.input.keyboard.addKey('W'),
      a: this.input.keyboard.addKey('A'),
      s: this.input.keyboard.addKey('S'),
      d: this.input.keyboard.addKey('D'),
    }

    // Camera resize behavior
    this.scale.on('resize', this.resize, this)

    // ----------------
    // INTERACTIVE OBJECTS
    this.signs = []
    this.showingSign = false
    this.map.filterObjects('Objects', (obj: any) => {
      // DOORS
      if (obj.name === 'door') {
        ;(this.add as any).door(
          Math.round(obj.x),
          Math.round(obj.y),
          obj.width,
          obj.height,
          obj.properties[0].value,
          obj.properties[1].value
        )
        // last 2: destination (str) and link (bool, if true leads to a redirect)
      }

      // SIGNS
      if (obj.name === 'sign') {
        this.signs.push(
          (this.add as any).sign(
            obj.x,
            obj.y,
            obj.properties[1].value,
            obj.properties[0].value
          )
        )
        // Last parameters are the text to show and the direction of the text in relation to the object
      }
    })

    this.events.on('break', this.catchDoBreak, this)
    this.events.on('position', this.getPlayerPosition, this)
  }

  getPlayerPosition() {
    this.events.emit('player', this.player)
  }

  catchDoBreak() {
    this.movable = !this.movable
  }

  // ---------------------------------------------------
  resize(
    gameSize: { width: number; height: number },
    baseSize: any,
    displaySize: any,
    resolution: any
  ) {
    this.cameras.resize(gameSize.width, gameSize.height)
  }

  collide_with_world() {
    // Collision with the world layers. Has to come after the rest of the colliders in order for them to detect.
    // We need to call this at the end of the children's create
    this.physics.add.collider(this.player, this.LayerToCollide)
    this.LayerToCollide.setCollisionBetween(40, 41)

    // Set the player to collide with the world bounds
    this.player.body.setCollideWorldBounds(true)
    this.player.body.onWorldBounds = true
  }

  // --------------------------------------------------------------------------------------------------
  // UPDATE
  update(time: any, delta: any) {
    let moveleft = false
    let moveright = false
    let moveup = false
    let movedown = false

    // Not movable? stop movement and return
    if (!this.movable) {
      this.player.update(moveleft, moveright, moveup, movedown)
      return false
    }

    // ----------------
    // KEYBOARD
    if (this.cursors.left.isDown || this.wasd.a.isDown) {
      moveleft = true
    } else if (this.cursors.right.isDown || this.wasd.d.isDown) {
      moveright = true
    }

    if (this.cursors.up.isDown || this.wasd.w.isDown) {
      moveup = true
    } else if (this.cursors.down.isDown || this.wasd.s.isDown) {
      movedown = true
    }

    this.player.update(moveleft, moveright, moveup, movedown)

    // ---------------------
    // INTERACTIVE OBJECTS
    // Hide the signs
    if (this.showingSign && (moveleft || moveright || moveup || movedown)) {
      this.signs.forEach(
        (sign: {
          activated: any
          playerMovement: (
            arg0: boolean,
            arg1: boolean,
            arg2: boolean,
            arg3: boolean
          ) => void
        }) => {
          if (sign.activated)
            sign.playerMovement(moveleft, moveright, moveup, movedown)
        }
      )
    }
  }
}
