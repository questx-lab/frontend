import Phaser from 'phaser'

export class Player extends Phaser.GameObjects.Sprite {
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

  update(moveleft: any, moveright: any, moveup: any, movedown: any) {
    const prevVelocity = (this.body as any).velocity.clone() // Stop any previous movement from the last frame
    ;(this.body as any).setVelocity(0)

    // Update the animation and give left/right animations precedence over up/down animations in diagonal movement
    if (moveleft) {
      ;(this.body as any).setVelocityX(-this.speed)
      this.anims.play('ariel-left-walk', true)
    } else if (moveright) {
      ;(this.body as any).setVelocityX(this.speed)
      this.anims.play('ariel-right-walk', true)
    }
    if (moveup) {
      ;(this.body as any).setVelocityY(-this.speed)
      if (!(moveleft || moveright)) {
        // When moving diagonally display the left / right animation
        this.anims.play('ariel-back-walk', true)
      }
    } else if (movedown) {
      ;(this.body as any).setVelocityY(this.speed)
      if (!(moveleft || moveright)) {
        // When moving diagonally display the left / right animation
        this.anims.play('ariel-front-walk', true)
      }
    }

    ;(this.body as any).velocity.normalize().scale(this.speed)

    if (
      !(moveleft || moveright || moveup || movedown) &&
      !(
        this.anims.currentAnim == null ||
        this.anims.currentAnim.key === 'ariel-wave'
      )
    ) {
      this.anims.stop()
      if (prevVelocity.x < 0) this.setTexture('atlas', 'ariel-left')
      else if (prevVelocity.x > 0) this.setTexture('atlas', 'ariel-right')
      else if (prevVelocity.y < 0) this.setTexture('atlas', 'ariel-back')
      else if (prevVelocity.y > 0) this.setTexture('atlas', 'ariel-front')
    }
  }
}
