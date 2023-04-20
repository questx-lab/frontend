import Phaser from 'phaser'

import OverWorldScene from './scenes/OverWorldScene'
import SoftwareScene from './scenes/SoftwareScene'

declare global {
  interface Window {
    mouseOverMenu: any
  }
}

const config: Phaser.Types.Core.GameConfig = {
  title: 'XQuest',
  version: '1.0',
  type: Phaser.CANVAS,
  parent: 'phaser-container',
  //backgroundColor: '#282c34',
  pixelArt: true,
  autoFocus: true,
  scale: {
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.NO_CENTER,
    width: getWidth(),
    height: getHeight(),
    zoom: resizeDPR()
      ? Math.floor(window.devicePixelRatio) / window.devicePixelRatio
      : 1,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 },
    },
  },
  scene: [OverWorldScene, SoftwareScene],
}

const game = new Phaser.Game(config)

// ------------------------------------------------------------------------------------
// DevicePixelRatio handling

function mobileOrTablet() {
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  )
    return true
  return false
}
function resizeDPR() {
  if (Number.isInteger(window.devicePixelRatio)) {
    return false
  } else if (
    !mobileOrTablet() &&
    1 < window.devicePixelRatio &&
    window.devicePixelRatio < 2
  ) {
    return true
  } else {
    return false
  }
}

// ------------------------------------------------------------------------------------
// RESIZE BEHAVIOR
function getWidth() {
  return resizeDPR()
    ? window.innerWidth * window.devicePixelRatio
    : window.innerWidth
}
function getHeight() {
  return resizeDPR()
    ? window.innerHeight * window.devicePixelRatio
    : window.innerHeight
}
window.addEventListener(
  'resize',
  function (event) {
    game.scale.resize(getWidth(), getHeight())
  },
  false
)

export default game
