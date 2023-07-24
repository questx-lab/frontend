import { FC, useEffect } from 'react'

import { json, Outlet, Params, useLoaderData, useLocation } from 'react-router-dom'

import { getRoomsByCommunityApi } from '@/api/townhall'
import { communityRoute } from '@/constants/router.const'
import RoomStore from '@/store/townhall/room'
import network from '@/townhall/engine/services/network'
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

const TownhallCommunity: FC = () => {
  let data = useLoaderData() as {
    community: CommunityType
    gameRooms: RoomDataType[]
  }

  // action
  const setCommunity = RoomStore.useStoreActions((action) => action.setCommunity)
  const setGameRooms = RoomStore.useStoreActions((action) => action.setGameRooms)
  const location = useLocation()
  console.log('for deploy')
  useEffect(() => {
    if (data.community) {
      setCommunity(data.community)
    }

    if (data.gameRooms) {
      setGameRooms(data.gameRooms)
    }
  }, [data])

  useEffect(() => {
    const handleBackButton = (event: PopStateEvent) => {
      event.preventDefault()
      // Disconnect socket
      network.socketDisconnect()
      const paths = location.pathname.split('/')
      const communityHandle = paths[2]
      window.location.href = communityRoute(communityHandle)
    }

    // Add a listener for the popstate event
    window.addEventListener('popstate', handleBackButton)

    return () => {
      // Remove the listener when the component is unmounted
      window.removeEventListener('popstate', handleBackButton)
    }
  }, [])

  return <Outlet />
}

export default TownhallCommunity
