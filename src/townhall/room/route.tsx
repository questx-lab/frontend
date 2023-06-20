import { FC, useEffect } from 'react'

import { json, Outlet, Params, useLoaderData } from 'react-router-dom'

import { getRoomsByCommunityApi } from '@/api/townhall'
import RoomStore from '@/store/townhall/room'
import { CommunityType } from '@/types/community'
import { RoomDataType } from '@/types/townhall'

export const Loader = async (args: { params: Params }) => {
  const result = await getRoomsByCommunityApi(args.params['communityHandle'] || '')

  if (result.error) {
    throw new Response('Not Found', { status: 404 })
  }

  if (result.data) {
    return json(
      {
        community: result.data.community || undefined,
        gameRooms: result.data.game_rooms || undefined,
      },
      { status: 200 }
    )
  }

  return {}
}

const TownhallRoom: FC = () => {
  let data = useLoaderData() as {
    community: CommunityType
    gameRooms: RoomDataType[]
  }

  // action
  const setCommunity = RoomStore.useStoreActions((action) => action.setCommunity)
  const setGameRooms = RoomStore.useStoreActions((action) => action.setGameRooms)

  useEffect(() => {
    if (data.community) {
      setCommunity(data.community)
    }

    if (data.gameRooms) {
      setGameRooms(data.gameRooms)
    }
  }, [data])

  return <Outlet />
}

export default TownhallRoom
