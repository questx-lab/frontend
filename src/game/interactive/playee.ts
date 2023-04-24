import Phaser from 'phaser'

export class Playee extends Phaser.GameObjects.Sprite {
  speed: number
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture,
    frame: string | number | undefined
  ) {
    super(scene, x, y, texture, frame)
    // Add the sprite and the physics body to the scene
    scene.add.existing(this)
    scene.physics.add.existing(this)

    // Set the depth and the size
    this.setDepth(5)
    ;(this.body as any).setSize(26, 41)

    // Create animations
    this.createAnims(scene)

    // Speed of movement
    this.speed = 175
  }

  removePlayee() {
    this.destroy()
  }

  createAnims(scene: Phaser.Scene) {
    // Create the player's walking animations from the texture atlas
    const anims = scene.anims
    anims.create({
      key: 'ariel-left-walk',
      frames: anims.generateFrameNames('atlas', {
        prefix: 'ariel-left-walk.',
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 10,
      repeat: -1,
    })
    anims.create({
      key: 'ariel-right-walk',
      frames: anims.generateFrameNames('atlas', {
        prefix: 'ariel-right-walk.',
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 10,
      repeat: -1,
    })
    anims.create({
      key: 'ariel-front-walk',
      frames: anims.generateFrameNames('atlas', {
        prefix: 'ariel-front-walk.',
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 10,
      repeat: -1,
    })
    anims.create({
      key: 'ariel-back-walk',
      frames: anims.generateFrameNames('atlas', {
        prefix: 'ariel-back-walk.',
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 10,
      repeat: -1,
    })
    anims.create({
      key: 'ariel-wave',
      frames: anims.generateFrameNames('atlas', {
        prefix: 'ariel-wave.',
        start: 0,
        end: 4,
        zeroPad: 3,
      }),
      frameRate: 10,
      repeat: -1,
    })
  }

  update(move: string, x: number, y: number) {
    ;(this.body as any).setVelocity(0)
    switch (move) {
      case 'left':
        ;(this.body as any).setVelocityX(-this.speed)
        this.anims.play('ariel-left-walk', true)
        break
      case 'right':
        ;(this.body as any).setVelocityX(-this.speed)
        this.anims.play('ariel-right-walk', true)
        break
      case 'up':
        ;(this.body as any).setVelocityX(-this.speed)
        this.anims.play('ariel-back-walk', true)
        break
      case 'down':
        ;(this.body as any).setVelocityX(-this.speed)
        this.anims.play('ariel-front-walk', true)
        break
    }
    this.setX(x)
    this.setY(y)
    // this.anims.play('ariel-wave', true)
    ;(this.body as any).velocity.normalize().scale(this.speed)
    ;(this.body as any).setVelocity(0)

    setTimeout(() => {
      this.anims.stop()
      switch (move) {
        case 'left':
          this.setTexture('atlas', 'ariel-left')
          break
        case 'right':
          this.setTexture('atlas', 'ariel-right')
          break
        case 'up':
          this.setTexture('atlas', 'ariel-back')
          break
        case 'down':
          this.setTexture('atlas', 'ariel-front')
          break
      }
    }, 100)
  }
}
