import Bootstrap, { BootstrapListener } from '@/townhall/engine/scenes/bootstrap'

export interface GameListener {}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'phaser-container',
  backgroundColor: '#93cbee',
  pixelArt: true, // Prevent pixel art from becoming blurred when scaled.
  scale: {
    mode: Phaser.Scale.ScaleModes.RESIZE,
    width: window.innerWidth,
    height: window.innerHeight,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  autoFocus: true,
  scene: [],
}

class GameController extends Phaser.Game {
  private bootstrap: Bootstrap

  private bootstrapListener = {
    onLoadComleted: () => {
      console.log('Bootstrap completed')
    },
  } as BootstrapListener

  constructor() {
    super(config)

    this.bootstrap = new Bootstrap(this.bootstrapListener)
  }

  loadResource(roomId: string) {
    this.scene.add('Bootstrap', this.bootstrap)
    this.scene.start(this.bootstrap)
  }
}

const phaserGame = new GameController()

;(window as any).game = phaserGame

export default phaserGame
