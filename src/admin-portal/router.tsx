import PortalIndex from '@/admin-portal/routes'
import Root, { RootLoader } from '@/admin-portal/routes/route'
import TemplatesIndex from '@/admin-portal/routes/templates'
import TemplatesRoute, { Loader as TemplatesLoader } from '@/admin-portal/routes/templates/route'

const router = [
  {
    path: '/',
    element: <Root />,
    loader: RootLoader,
    children: [
      { index: true, element: <PortalIndex /> },
      {
        path: 'templates',
        element: <TemplatesRoute />,
        loader: TemplatesLoader,
        children: [{ index: true, element: <TemplatesIndex /> }],
      },
    ],
  },
]

export default router
