export enum GameState {
  NONE,
  BOOTSTRAP, // Include loading resources.
  CONNECTING,
  CONNECTED,
  JOINED_ROOM,
  RECONNECTING,
  QUITTING,
  QUITTED,
}
