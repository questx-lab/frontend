import axios, { AxiosError } from 'axios'
import { GetServerSidePropsContext } from 'next'

import { RouterConst } from '@/constants/router.const'
import { delCookies, getAccessToken } from '@/utils/helper'

const isServer = () => {
  return typeof window === 'undefined'
}

let context = <GetServerSidePropsContext>{}
const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL!

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Origin: '*',
  },
  withCredentials: true, // to send cookie
})

api.interceptors.request.use((config) => {
  const accessToken = getAccessToken()
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  if (isServer() && context?.req?.cookies) {
    config.headers.Cookie = `gid=${context.req.cookies.gid};`
  }
  return config
})

api.interceptors.response.use(
  (response: any) => {
    return response
  },
  (error: AxiosError) => {
    // check conditions to refresh token
    if (error.response?.status === 401) {
      delCookies()
      window.location.href = RouterConst.LOGIN
      return
    }
    return Promise.reject(error)
  }
)
