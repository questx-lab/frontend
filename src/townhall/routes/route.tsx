import { FC } from 'react'

import { Outlet } from 'react-router-dom'

import RoomStore from '@/store/townhall/room'

const Townhall: FC = () => {
  return (
    <RoomStore.Provider>
      <Outlet />
    </RoomStore.Provider>
  )
}

export default Townhall
