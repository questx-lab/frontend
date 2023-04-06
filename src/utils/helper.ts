import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next'

import { KeysEnum } from '@/constants/key.const'

export const getAccessToken = (): string => {
  const exist = hasCookie(KeysEnum.QUESTX_TOKEN)
  if (exist) {
    const rs = getCookie(KeysEnum.QUESTX_TOKEN)
    return rs!.toString()
  }
  return ''
}

export const delCookies = () => {
  deleteCookie(KeysEnum.AUTH_SESSION)
  deleteCookie(KeysEnum.QUESTX_TOKEN)
}

export const setAccessToken = (cookie: string) => {
  setCookie(KeysEnum.QUESTX_TOKEN, cookie, {
    maxAge: 600,
  })
}
