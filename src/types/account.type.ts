export type UserType = {
  id?: string
  address?: string
  name?: string
  services: {
    discord?: string
    twitter?: string
    google?: string
  }
}
