import { ICloseEvent, IMessageEvent, w3cwebsocket } from 'websocket'

import { EnvVariables } from '@/constants/env.const'
import { MessageReceiver } from '@/types/townhall'
import { setCookieSocket } from '@/utils/helper'

export interface NetworkListener {
  onConnected: () => void
  onDisconnected: () => void
  onMessage: (event: MessageReceiver) => void
}

export type NetworkMessageType = {}

class Network {
  socket: null | w3cwebsocket
  listeners = new Set<NetworkListener>()

  constructor() {
    // TODO: hardcode roomId
    this.socket = null
  }

  async socketDisconnect() {
    if (this.socket) {
      this.socket.close()
    }
  }

  addListener(listener: NetworkListener) {
    this.listeners.add(listener)
  }

  removeListener(listener: NetworkListener) {
    this.listeners.delete(listener)
  }

  async connectRoom(roomId: string) {
    if (this.socket) {
      // TODO: Disconnect and destsroy previous socket.
    }

    setCookieSocket()
    const url = EnvVariables.SOCKET_SERVER + `/game?room_id=${roomId}`
    this.socket = new w3cwebsocket(url)
    this.socket.onopen = () => {
      console.log('Socket is opened')
      this.listeners.forEach((listener) => listener.onConnected())
    }

    this.socket.onclose = (event: ICloseEvent) => {
      console.log('Socket is closed, close event = ', event)
      this.listeners.forEach((listener) => listener.onDisconnected())
    }

    this.socket.onmessage = (event: IMessageEvent) => {
      const messages = JSON.parse(event.data.toString()) as MessageReceiver[]
      this.listeners.forEach((listener) => messages.forEach((msg) => listener.onMessage(msg)))
    }
  }

  send(message: any) {
    if (!this.socket) {
      return
    }

    if (this.socket && this.socket.readyState === this.socket.OPEN) {
      this.socket.send(JSON.stringify(message))
    }
  }
}

const network = new Network()
export default network
