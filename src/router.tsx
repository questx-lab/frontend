import { FunctionComponent } from 'react'

import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'

import AdminRouter from '@/admin-portal/router'
import { EnvVariables } from '@/constants/env.const'
import PlatformRouter from '@/platform/router'
import { AppMode } from '@/types/app-mode'

export const RouterComponent: FunctionComponent = () => {
  let routes: RouteObject[]
  if (EnvVariables.MODE === AppMode.ADMIN_PORTAL) {
    routes = AdminRouter
  } else {
    routes = PlatformRouter
  }
  return <RouterProvider router={createBrowserRouter(routes)} />
}
