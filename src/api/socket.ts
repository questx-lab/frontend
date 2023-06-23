import { ICloseEvent, w3cwebsocket } from 'websocket'

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
    this.socket = new w3cwebsocket(url)
    this.socket.onopen = () => {
      console.log('Socket is opened')
    }
    this.socket.onclose = (event: ICloseEvent) => {
      console.log('Socket is closed, close event = ', event)
    }
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
