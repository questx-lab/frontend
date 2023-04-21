import Phaser from 'phaser'

export class Door extends Phaser.GameObjects.Zone {
  destination: any
  link: any
  constructor(
    scene: any,
    x: number,
    y: number,
    width: number | undefined,
    height: number | undefined,
    destination: any,
    link: any
  ) {
    super(scene, x, y, width, height)

    // Tiled coordinate is of the bottom left of the object
    this.setOrigin(0, 1)

    // Add the GameObject and collider to the scene
    scene.add.existing(this)
    scene.physics.world.enable(this, 1) // 1 is for static body
    this.destination = destination
    this.link = link
    scene.physics.add.collider(scene.player, this, () => this.enterDoor(scene))
  }

  enterDoor(scene: {
    player: { body: { touching: { none: any }; wasTouching: { none: any } } }
    scene: { switch: (arg0: any) => void }
  }) {
    if (
      !scene.player.body.touching.none &&
      scene.player.body.wasTouching.none
    ) {
      scene.scene.switch(this.destination)
    }
  }
}
