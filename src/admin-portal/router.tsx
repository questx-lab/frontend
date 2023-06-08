import PortalIndex from '@/admin-portal/routes'
import Root, { RootLoader } from '@/admin-portal/routes/route'

const router = [
  {
    path: '/',
    element: <Root />,
    loader: RootLoader,
    children: [{ index: true, element: <PortalIndex /> }],
  },
]

export default router
