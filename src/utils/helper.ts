import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next'
import jwt from 'jwt-decode'

import { KeysEnum } from '@/constants/key.const'
import { UserType } from '@/types'

export const getAccessToken = (): string | undefined => {
  const cookie = getCookie(KeysEnum.ACCESS_TOKEN)
  if (cookie) {
    return cookie.toString()
  }
  return undefined
}

export const getRefreshToken = (): string | undefined => {
  const cookie = getCookie(KeysEnum.REFRESH_TOKEN)
  if (cookie) {
    return cookie.toString()
  }
  return undefined
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

export const setCookieSocket = () => {
  const domain = window.location.hostname.split('.').slice(-2).join('.')
  const accessToken = getAccessToken()
  if (accessToken) {
    const jwtToken: any = jwt(accessToken)
    const cookieExpDate: Date = new Date(
      (Math.floor(Date.now() / 1000) + (jwtToken['exp'] - Math.floor(Date.now() / 1000))) * 1000
    )
    const cookieExpFormatted: string = cookieExpDate.toUTCString()

    document.cookie = `access_token=${accessToken};domain=${domain};path=/;expires=${cookieExpFormatted}`
  }
}

export const setRefreshToken = (cookie: string) => {
  const dToken: any = jwt(cookie)
  setCookie(KeysEnum.REFRESH_TOKEN, cookie, {
    maxAge: dToken['exp'] - parseInt((Date.now() / 1000).toFixed(0)),
  })
}

export const setUserLocal = (data: UserType) => {
  localStorage.setItem(KeysEnum.USER, JSON.stringify(data))
}

export const getUserLocal = (): UserType | undefined => {
  const user = localStorage.getItem(KeysEnum.USER)
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
