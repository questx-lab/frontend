import { FC } from 'react'

import { MobileView } from 'react-device-detect'
import tw from 'twin.macro'

import Game from '@/townhall/engine/scenes/game'
import phaserGame from '@/townhall/engine/services/game-controller'
import usePlayerSelector from '@/townhall/hooks/user-player-selector'
import GameSidebar from '@/townhall/modules/game-sidebar'
import JoystickItem, { JoystickMovement } from '@/townhall/modules/selector/joystick'
import { ItemType } from '@/types/townhall'
import { Horizontal, Vertical, VerticalCenter } from '@/widgets/orientation'

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

const Action = tw(VerticalCenter)`
  fixed
  right-4
`

const BorderCircle = tw(VerticalCenter)`
  w-8
  h-8
  border
  border-solid
  border-gray-200
  bg-white
  rounded-full
  text-sm
  font-medium
`

const Mobile: FC = () => {
  const playerSelector = usePlayerSelector()

  const handleMovement = (movement: JoystickMovement) => {
    ;(phaserGame.scene.keys.game as Game).myPlayer?.handleJoystickMovement(movement)
  }

  const handleClick = () => {
    phaserGame.changePlayerSelectorListeners(ItemType.LEADERBOARD)
  }

  return (
    <MobileView className='w-full'>
      <Menu>
        <GameSidebarFrame>
          <GameSidebar />
        </GameSidebarFrame>
      </Menu>
      {playerSelector === ItemType.REQUIRE_SHOW_LEADERBOARD && (
        <Action>
          <BorderCircle onClick={handleClick}>{'X'}</BorderCircle>
        </Action>
      )}
      <JoyStick>
        <JoystickItem onDirectionChange={handleMovement} />
      </JoyStick>
    </MobileView>
  )
}

export default Mobile
