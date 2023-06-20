import { w3cwebsocket } from 'websocket'

import { EnvVariables } from '@/constants/env.const'

export default class WebSocket {
  socket: null | w3cwebsocket

  constructor(roomId: string) {
    this.socket = null
    const url = EnvVariables.SOCKET_SERVER + `/game?room_id=${roomId}`
    console.log(url)

    this.connect(url)
  }

  private connect(url: string) {
    this.socket = new w3cwebsocket(url)
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
