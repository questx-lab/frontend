import Phaser from 'phaser'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'phaser-container-old',
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
  // scene: [Bootstrap, Background, Game],
  scene: [],
}

// const phaserGame = {}

const phaserGame = new Phaser.Game(config)
;(window as any).game = phaserGame

export default phaserGame
