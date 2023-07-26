import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next'
import jwt from 'jwt-decode'
import toast from 'react-hot-toast'

import { refreshTokenApi } from '@/api/user'
import { ErrorCodes } from '@/constants/code.const'
import { ShowedInstructionKey } from '@/constants/common.const'
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

export const setCookieSocket = async () => {
  const domain = window.location.hostname.split('.').slice(-2).join('.')
  const accessToken = getAccessToken()
  const refreshToken = getAccessToken()
  if (accessToken) {
    setAccessToken(accessToken, domain)
  }

  if (!accessToken && refreshToken) {
    const data = await refreshTokenApi(refreshToken)
    if (data.code === ErrorCodes.NOT_ERROR && data.data) {
      setAccessToken(data.data.access_token)
      setRefreshToken(data.data.refresh_token)
    }
  }
}

export const setAccessToken = (cookie: string, domain?: string) => {
  const jwtToken: any = jwt(cookie)
  setCookie(KeysEnum.ACCESS_TOKEN, cookie, {
    maxAge: jwtToken['exp'] - parseInt((Date.now() / 1000).toFixed(0)),
    domain,
  })
}

export const setRefreshToken = (cookie: string, domain?: string) => {
  const dToken: any = jwt(cookie)
  setCookie(KeysEnum.REFRESH_TOKEN, cookie, {
    maxAge: dToken['exp'] - parseInt((Date.now() / 1000).toFixed(0)),
    domain,
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

export const isLogin = (): boolean => {
  const accessToken = getAccessToken()

  if (!accessToken) {
    return false
  }

  return true
}

export const onCopy = (url: string) => {
  if (url) {
    navigator.clipboard.writeText(url)
    toast(`Copied ${url}`, {
      icon: '👏',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    })
  }
}

export const getShowedInstruction = () => {
  return localStorage.getItem(ShowedInstructionKey)
}

export const markShowedInstruction = () => {
  localStorage.setItem(ShowedInstructionKey, 'true')
}

export const separateBits = (num: number): number[] => {
  const result: number[] = []
  let bit = 1
  while (num > 0) {
    if (num & 1) {
      result.push(bit)
    }
    bit <<= 1
    num >>= 1
  }
  return result
}
