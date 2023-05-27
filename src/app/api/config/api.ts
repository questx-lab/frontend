import { Mutex } from 'async-mutex'
import axios, { AxiosError } from 'axios'
import { GetServerSidePropsContext } from 'next'

import { ErrorCodes } from '@/constants/code.const'
import {
  delCookies,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  setUserCookie,
} from '@/utils/helper'

import { getUserApi, refreshTokenApi } from '../client/user'

export const isServer = () => {
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
      try {
        // 2. Lock request api
        await mutex.acquire()
        const refreshToken = getRefreshToken()
        const accessToken = getAccessToken()

        if (!refreshToken) {
          return response
        }

        // 3. If exist refreshToken => renew access token, else logout
        if (!accessToken) {
          // 4. Call api refresh token
          try {
            const data = await refreshTokenApi(refreshToken)

            if (!data.error) {
              // 5. set header and cookies
              originalRequest.headers['Authorization'] =
                'Bearer ' + data.data.access_token
              setAccessToken(data.data.access_token)
              setRefreshToken(data.data.refresh_token)
              // 6. get User data
              const user = await getUserApi()
              if (user.error) {
                return response
              }
              if (user.data) {
                setUserCookie(user.data, data.data.access_token)
              }
              // 7. Recall request
              return await axios.request(originalRequest)
            }
          } catch (error) {
            Promise.reject(error)
          }
        }

        if (refreshToken && accessToken) {
          // 8. Recall request

          return await axios.request(originalRequest)
        }
      } finally {
        // finally of mutex
        mutex.release()
      }
    }

    return response
  },
  (error: AxiosError) => {
    // check conditions to refresh token
    if (error.response?.status === 401) {
      delCookies()
      return
    }
    return Promise.reject(error)
  }
)
