import { IMessageEvent, w3cwebsocket } from 'websocket'

import { EnvVariables } from '@/constants/env.const'

export default class WebSocket {
  socket: null | w3cwebsocket

  constructor(roomId: string) {
    this.socket = null
    const url = EnvVariables.SOCKET_SERVER + `/game?room_id=${roomId}`
    this.connect(url)
  }

  private connect(url: string) {
    this.socket = new w3cwebsocket(url)
    this.socket.onopen = this.onOpen
    this.socket.onerror = this.onError
    this.socket.onmessage = this.onMessage
    this.socket.onclose = this.onClose
  }

  onOpen() {
    console.log('WebSocket connected')
  }

  onError(error: Error) {
    console.error('WebSocket error:', error)
  }

  onMessage(event: IMessageEvent) {
    console.log('WebSocket message received:', event.data)
  }

  onClose() {
    console.log('WebSocket disconnected')
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
