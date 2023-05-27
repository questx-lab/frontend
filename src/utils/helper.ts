import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next'
import jwt from 'jwt-decode'

import { KeysEnum } from '@/constants/key.const'
import { UserType } from '@/utils/type'

export const getAccessToken = (): string | null => {
  return localStorage.getItem(KeysEnum.ACCESS_TOKEN)
}

export const getRefreshToken = (): string | null => {
  return localStorage.getItem(KeysEnum.REFRESH_TOKEN)
}

export const delCookies = () => {
  deleteCookie(KeysEnum.AUTH_SESSION)
  deleteCookie(KeysEnum.ACCESS_TOKEN)
  deleteCookie(KeysEnum.REFRESH_TOKEN)
  deleteCookie(KeysEnum.USER)
}

export const setAccessToken = (cookie: string) => {
  const dToken: any = jwt(cookie)
  setCookie(KeysEnum.ACCESS_TOKEN, cookie, {
    maxAge: dToken['exp'] - parseInt((Date.now() / 1000).toFixed(0)),
  })
}

export const setRefreshToken = (cookie: string) => {
  const dToken: any = jwt(cookie)
  setCookie(KeysEnum.REFRESH_TOKEN, cookie, {
    maxAge: dToken['exp'] - parseInt((Date.now() / 1000).toFixed(0)),
  })
}

export const setUserLocal = (data: UserType) => {
  localStorage.setItem('user', JSON.stringify(data))
}

export const getUserLocal = (): UserType | undefined => {
  const user = localStorage.getItem('user')
  if (!user) {
    // Try to get user from cookie
    if (hasCookie(KeysEnum.USER)) {
      const userCookie = getCookie(KeysEnum.USER)
      if (userCookie) {
        const json = JSON.parse(userCookie.toString())
        return json.data
      }
    }

    return undefined
  }

  return JSON.parse(user)
}

export const delUserLocal = () => {
  localStorage.removeItem('user')
}

export const clearLocalStorage = () => {
  localStorage.clear()
}

export const isLogin = (user: UserType): boolean => {
  if (!user) {
    return false
  }

  if (!Object.values(user).length) {
    return false
  }

  return true
}
