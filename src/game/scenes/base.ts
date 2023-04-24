import Phaser from 'phaser'
import { w3cwebsocket as W3CWebSocket } from 'websocket'

import { UserType } from '@/types/account.type'
import { getAccessToken } from '@/utils/helper'

import { Playee } from '../interactive/playee'

export class BaseScene extends Phaser.Scene {
  movable = true
  map: any
  LayerToCollide: any
  player: any
  cursors: any
  wasd: any
  signs: any
  showingSign: any
  playee: any
  players: any
  client: W3CWebSocket | undefined
  // --------------------------------------------------------------------------------------------------
  // CREATE
  create(tilemapKey: string) {
    const user: UserType = JSON.parse(localStorage.getItem('user') ?? '{}')
    this.players = this.physics.add.group()
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
    this.client = new W3CWebSocket(
      'ws://localhost:8081/game?room_id=15a2a74a-4ec3-43ce-bc2f-52cad18163fd'
    )

    const spawnPoint = this.map.findObject(
      'Objects',
      (obj: { name: string }) => obj.name === 'Spawn Point'
    )
    this.client.onmessage = (message) => {
      try {
        const rs = JSON.parse(message.data.toString())
        if ('type' in rs && rs.type !== 'map') {
          console.log('got reply! ', message.data)
        }

        if ('type' in rs && rs.type === 'init') {
          if ('value' in rs && 'users' in rs.value) {
            ;(rs.value.users as any[]).forEach((user) => {
              this.players[user.user_id] = new Playee(
                this,
                931,
                641,
                'atlas',
                'ariel-front'
              )
            })
          }
        }

        if ('type' in rs && rs.type === 'join') {
          if ('user_id' in rs && 'id' in user && rs.user_id !== user.id) {
            this.players[rs.user_id] = new Playee(
              this,
              931,
              641,
              'atlas',
              'ariel-front'
            )
          }
        }

        if ('type' in rs && rs.type === 'exit') {
          this.players[rs.user_id].removePlayee()
        }

        if ('type' in rs && rs.type === 'move') {
          this.players[rs.user_id].update(
            rs.value.direction,
            rs.value.x,
            rs.value.y
          )
        }
      } catch (error) {}
    }
    this.client.onerror = (error) => {
      console.log(error)
    }

    this.client.onclose = (event) => {
      console.log('event', event)
    }

    // ----------------
    // PLAYER

    // Create the player and the player animations (see player.js)
    this.player = (this.add as any).player(
      // spawnPoint.x,
      // spawnPoint.y,
      931,
      641,
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
      this.client?.send(
        JSON.stringify({
          type: 'move',
          value: {
            direction: 'left',
            x: parseInt(this.player.x.toFixed(0), 10),
            y: parseInt(this.player.y.toFixed(0), 10),
          },
        })
      )
      moveleft = true
    } else if (this.cursors.right.isDown || this.wasd.d.isDown) {
      this.client?.send(
        JSON.stringify({
          type: 'move',
          value: {
            direction: 'right',
            x: parseInt(this.player.x.toFixed(0), 10),
            y: parseInt(this.player.y.toFixed(0), 10),
          },
        })
      )

      moveright = true
    }

    if (this.cursors.up.isDown || this.wasd.w.isDown) {
      this.client?.send(
        JSON.stringify({
          type: 'move',
          value: {
            direction: 'up',
            x: parseInt(this.player.x.toFixed(0), 10),
            y: parseInt(this.player.y.toFixed(0), 10),
          },
        })
      )
      moveup = true
    } else if (this.cursors.down.isDown || this.wasd.s.isDown) {
      this.client?.send(
        JSON.stringify({
          type: 'move',
          value: {
            direction: 'down',
            x: parseInt(this.player.x.toFixed(0), 10),
            y: parseInt(this.player.y.toFixed(0), 10),
          },
        })
      )
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
