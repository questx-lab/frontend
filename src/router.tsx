import { FC } from 'react'

import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'

import AdminRouter from '@/admin-portal/router'
import { EnvVariables } from '@/constants/env.const'
import PlatformRouter from '@/platform/router'
import { AppMode } from '@/types/app-mode'
import { GoogleOAuthProvider } from '@react-oauth/google'

export const RouterComponent: FC = () => {
  let routes: RouteObject[]
  if (EnvVariables.MODE === AppMode.ADMIN_PORTAL) {
    routes = AdminRouter
  } else {
    routes = PlatformRouter
  }
  return (
    <GoogleOAuthProvider clientId={EnvVariables.GOOGLE_ID}>
      <RouterProvider router={createBrowserRouter(routes)} />
    </GoogleOAuthProvider>
  )
}
