import { Rsp } from '@/types/common.type'

export const serialize = (val: Rsp<any>): string => {
  return JSON.stringify(val)
}

export const deserialize = (val: string | null): Rsp<any> => {
  return JSON.parse(val || '{}')
}

export const loadCache = (val: string): string => {
  return sessionStorage.getItem(val) || ''
}

export const storeCache = (key: string, val: string) => {
  return sessionStorage.setItem(key, val)
}
