import { Rsp } from '@/types/common.type'

// serialize
export const serialize = (val: Rsp<any>): string => {
  return JSON.stringify(val)
}

export const deserialize = (val: string | null): Rsp<any> => {
  return JSON.parse(val || '{}')
}

////// Cache /////
export const loadCache = (val: string): string => {
  return sessionStorage.getItem(val) || ''
}

export const storeCache = (key: string, val: string) => {
  return sessionStorage.setItem(key, val)
}

export const removeCache = (key: string) => {
  sessionStorage.removeItem(key)
}

export const clearCache = () => {
  sessionStorage.clear()
}
