export type Rsp<T> = {
  code: number
  data?: T
  error?: string
}
