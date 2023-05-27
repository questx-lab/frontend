import { Index as CommunitiesIndex } from '@/modules/community/communities'
import { Home as HomeIndex } from '@/modules/root/homepage'
import { Communities } from '@/routes/communities/base'
import { Community } from '@/routes/communities/community/base'
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
        children: [
          { index: true, element: <CommunitiesIndex /> },
          {
            path: ':community_id',
            element: <Community />,
          },
        ],
      },
    ],
  },
])

export const RouterComponent: FunctionComponent = () => {
  return <RouterProvider router={router} />
}
