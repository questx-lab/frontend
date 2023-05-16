export type UserType = {
  id?: string
  address?: string
  name?: string
  services?: {
    discord?: string
    twitter?: string
    google?: string
  }
  is_new_user?: boolean
  role?: string
}
