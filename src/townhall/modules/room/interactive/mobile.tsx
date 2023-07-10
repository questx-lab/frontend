import { FC } from 'react'

import { MobileView } from 'react-device-detect'
import tw from 'twin.macro'

import Game from '@/townhall/engine/scenes/game'
import phaserGame from '@/townhall/engine/services/game-controller'
import GameSidebar from '@/townhall/modules/game-sidebar'
import JoystickItem, { JoystickMovement } from '@/townhall/modules/selector/joystick'
import { Horizontal, Vertical } from '@/widgets/orientation'

const JoyStick = tw.div`
  right-10
  bottom-20
  fixed
`

const Menu = tw(Horizontal)`
  w-full
  bg-white
  bottom-0
  fixed
`

const GameSidebarFrame = tw(Vertical)`
  h-[64px]
  w-full
`

const Mobile: FC = () => {
  const handleMovement = (movement: JoystickMovement) => {
    ;(phaserGame.scene.keys.game as Game).myPlayer?.handleJoystickMovement(movement)
  }

  return (
    <MobileView className='w-full'>
      <Menu>
        <GameSidebarFrame>
          <GameSidebar />
        </GameSidebarFrame>
      </Menu>
      <JoyStick>
        <JoystickItem onDirectionChange={handleMovement} />
      </JoyStick>
    </MobileView>
  )
}

export default Mobile
