import { Mutex } from 'async-mutex'
import axios, { AxiosError } from 'axios'

import { refreshTokenApi } from '@/api/user'
import { ErrorCodes } from '@/constants/code.const'
import { EnvVariables } from '@/constants/env.const'
import { RouterConst } from '@/constants/router.const'
import {
  clearLocalStorage,
  delCookies,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '@/utils/helper'

const mutex = new Mutex()
const baseURL = EnvVariables.API_SERVER

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
          delCookies()
          clearLocalStorage()
          window.location.href = RouterConst.HOME
          return response
        }

        // 3. If exist refreshToken => renew access token, else logout
        if (!accessToken) {
          // 4. Call api refresh token
          try {
            const data = await refreshTokenApi(refreshToken)
            if (!data.error) {
              // 5. set header and cookies
              originalRequest.headers['Authorization'] = 'Bearer ' + data.data.access_token
              setAccessToken(data.data.access_token)
              setRefreshToken(data.data.refresh_token)

              // 6. Recall request
              return await axios.request(originalRequest)
            }
          } catch (error) {
            Promise.reject(error)
          }
        }

        if (refreshToken && accessToken) {
          // 7. Recall request

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
