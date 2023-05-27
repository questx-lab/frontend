import { Index as HomeIndex } from '@/modules/home'
import { Communities } from '@/routes/communities'
import { Root, RootLoader } from '@/routes/root'
import { FunctionComponent } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: RootLoader,
    children: [
      { index: true, element: <HomeIndex /> },
      {
        path: '/communities',
        element: <Communities />,
      },
    ],
  },
])

export const RouterComponent: FunctionComponent = () => {
  return <RouterProvider router={router} />
}
