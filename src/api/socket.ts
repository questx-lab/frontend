import { w3cwebsocket } from 'websocket'

import { EnvVariables } from '@/constants/env.const'
import { setCookieSocket } from '@/utils/helper'

export default class WebSocket {
  socket: null | w3cwebsocket

  constructor(roomId: string) {
    setCookieSocket()
    this.socket = null
    const url = EnvVariables.SOCKET_SERVER + `/game?room_id=${roomId}`
    this.connect(url)
  }

  private connect(url: string) {
    console.log('Connecting...., url = ', url)
    this.socket = new w3cwebsocket(url)
    console.log('Connected, url = ', url)
  }

  send(data: any) {
    if (this.socket && this.socket.readyState === this.socket.OPEN) {
      this.socket.send(JSON.stringify(data))
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close()
    }
  }
}
