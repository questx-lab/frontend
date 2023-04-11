import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next'
import jwt from 'jwt-decode'

import { KeysEnum } from '@/constants/key.const'

export const getAccessToken = (): string => {
  const exist = hasCookie(KeysEnum.QUESTX_TOKEN)
  if (exist) {
    const rs = getCookie(KeysEnum.QUESTX_TOKEN)
    return rs!.toString()
  }
  return ''
}

export const getRefreshToken = (): string => {
  const exist = hasCookie(KeysEnum.REFRESH_TOKEN)
  if (exist) {
    const rs = getCookie(KeysEnum.REFRESH_TOKEN)
    return rs!.toString()
  }
  return ''
}

export const delCookies = () => {
  deleteCookie(KeysEnum.AUTH_SESSION)
  deleteCookie(KeysEnum.QUESTX_TOKEN)
  deleteCookie(KeysEnum.REFRESH_TOKEN)
}

export const setAccessToken = (cookie: string) => {
  const dToken: any = jwt(cookie)
  setCookie(KeysEnum.QUESTX_TOKEN, cookie, {
    maxAge: dToken['exp'] - parseInt((Date.now() / 1000).toFixed(0)),
  })
}

export const setRefreshToken = (cookie: string) => {
  const dToken: any = jwt(cookie)
  setCookie(KeysEnum.REFRESH_TOKEN, cookie, {
    maxAge: dToken['exp'] - parseInt((Date.now() / 1000).toFixed(0)),
  })
}
