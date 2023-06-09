import PortalIndex from '@/admin-portal/routes'
import Root, { RootLoader } from '@/admin-portal/routes/route'
import TemplatesIndex from '@/admin-portal/routes/templates'
import TemplatesRoute from '@/admin-portal/routes/templates/route'

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
        children: [{ index: true, element: <TemplatesIndex /> }],
      },
    ],
  },
]

export default router
