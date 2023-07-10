import { FC } from 'react'

import { BrowserView } from 'react-device-detect'
import tw from 'twin.macro'

import { ActiveSidebarTab } from '@/store/townhall/room'
import GameSidebar from '@/townhall/modules/game-sidebar'
import { Horizontal, Vertical } from '@/widgets/orientation'

const Menu = tw(Horizontal)`
  h-full
  bg-white
  right-0
  fixed
`

const GameSidebarFrame = tw(Vertical)`
  w-[64px]
  h-full
`

const Browser: FC<{ activeTab: ActiveSidebarTab }> = ({ activeTab }) => {
  return (
    <BrowserView className='h-full'>
      <Menu>
        <GameSidebarFrame>
          <GameSidebar />
        </GameSidebarFrame>
      </Menu>
    </BrowserView>
  )
}

export default Browser
