import { Mutex } from 'async-mutex'
import axios, { AxiosError } from 'axios'
import { GetServerSidePropsContext } from 'next'

import { ErrorCodes } from '@/constants/code.const'
import { RouterConst } from '@/constants/router.const'
import {
  delCookies,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '@/utils/helper'

const isServer = () => {
  return typeof window === 'undefined'
}
const mutex = new Mutex()
let context = <GetServerSidePropsContext>{}
const baseURL = process.env.NEXT_PUBLIC_API_URL!

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
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
  async (response) => {
    // 1. Check code response
    if (response.data.code === ErrorCodes.UNAUTHOR) {
      const originalRequest = response.config

      // 2. Lock request api
      await mutex.acquire()
      const refreshToken = getRefreshToken()
      const accessToken = getAccessToken()

      if (!refreshToken) {
        window.location.href = RouterConst.LOGIN
        mutex.release()
        return response
      }

      // 3. If exist refreshToken => renew access token, else logout
      if (!accessToken) {
        // 4. Call api refresh token
        try {
          const { data } = await api.post('/refresh', {
            refresh_token: refreshToken,
          })

          if (!data.data.error) {
            // 5. set header and cookies
            originalRequest.headers['Authorization'] =
              'Bearer ' + data.data.access_token
            setAccessToken(data.data.access_token)
            setRefreshToken(data.data.refresh_token)

            // 6. Recall request
            axios.request(originalRequest).then((data) => {
              mutex.release()
              return data
            })
          } else {
            mutex.release()
          }
        } catch (error) {
          mutex.release()
          Promise.reject(error)
        }
      }

      if (refreshToken && accessToken) {
        // 7. Recall request
        axios.request(originalRequest).then((data) => {
          mutex.release()
          return data
        })
      }
    }

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
