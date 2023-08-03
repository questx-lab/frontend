import JSONbig from 'json-bigint'
import { ICloseEvent, IMessageEvent, w3cwebsocket } from 'websocket'

import { EnvVariables } from '@/constants/env.const'
import { ChatMessageReceiver } from '@/types/chat'
import { setCookieSocket } from '@/utils/helper'

export interface NetworkListener {
  onConnected: () => void
  onDisconnected: () => void
  onMessage: (event: ChatMessageReceiver) => void
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

  async connect() {
    if (this.socket) {
      // TODO: Disconnect and destsroy previous socket.
      return
    }

    setCookieSocket()
    const url = EnvVariables.NOTIFICATION_SERVER + `/notification`

    console.log('Connecting....')

    this.socket = new w3cwebsocket(url)
    this.socket.onopen = () => {
      console.log('Socket is opened')
      this.listeners.forEach((listener) => listener.onConnected())
    }

    this.socket.onclose = (event: ICloseEvent) => {
      console.log('Socket is closed, close event = ', event)
      this.listeners.forEach((listener) => listener.onDisconnected())
      this.socket = null
    }

    this.socket.onmessage = async (event: IMessageEvent) => {
      if (event.data instanceof Blob) {
        try {
          const arr = await event.data.arrayBuffer()
          const s = new TextDecoder().decode(arr)

          const msg = JSONbig.parse(s) as ChatMessageReceiver
          this.listeners.forEach((listener) => listener.onMessage(msg))
        } catch (error) {
          console.log('json parse error = ', error)
        }
      }
    }
  }

  send(message: any) {
    if (!this.socket) {
      return
    }

    if (this.socket && this.socket.readyState === this.socket.OPEN) {
      const s = JSONbig.stringify(message)
      this.socket.send(s)
    }
  }
}

const network = new Network()
export default network
