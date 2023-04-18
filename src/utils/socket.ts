import io, { Socket } from 'socket.io-client'

import { socketConnectApi } from '@/app/api/client/socket'
import { DefaultEventsMap } from '@socket.io/component-emitter'

let socket: Socket<DefaultEventsMap, DefaultEventsMap>

export const socketInit = async () => {
  // We just call it because we don't need anything else out of it
  await socketConnectApi('broadcast')

  socket = io()

  socket.on('newIncomingPayload', (payload) => {
    // reveive payload here

    console.log('payload', payload)
  })
}

export const sendPayload = async () => {
  socket.emit('sendPayload', {})
}
