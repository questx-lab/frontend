import { BrowserView } from 'react-device-detect'

import GameSidebar from '@/townhall/modules/game-sidebar'

const Browser = () => {
  return (
    <BrowserView className='h-full w-full'>
      <GameSidebar />
    </BrowserView>
  )
}

export default Browser
