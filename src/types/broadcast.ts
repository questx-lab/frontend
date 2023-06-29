export enum BroadcastEventType {
  DELETE_QUEST,
}

export interface BroadcastListener {
  onEvent: (event: BroadcastEventType, data?: any) => void
}

class Broadcast {
  private listeners = new Map<BroadcastEventType, Set<BroadcastListener>>()

  private getPool(event: BroadcastEventType): Set<BroadcastListener> {
    let pool = this.listeners.get(event)
    if (!pool) {
      pool = new Set<BroadcastListener>()
    }
    return pool
  }

  addListener(event: BroadcastEventType, listener: BroadcastListener) {
    const pool = this.getPool(event)
    pool.add(listener)
    this.listeners.set(event, pool)
  }

  removeListener(event: BroadcastEventType, listener: BroadcastListener) {
    const pool = this.getPool(event)
    pool.delete(listener)
    if (pool.size === 0) {
      this.listeners.delete(event)
    }
  }

  publish(event: BroadcastEventType, data: any) {
    const pool = this.getPool(event)
    pool.forEach((listener) => listener.onEvent(event, data))
  }
}

const broadcast = new Broadcast()

export default broadcast
