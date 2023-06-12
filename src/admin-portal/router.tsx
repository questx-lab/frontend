import PortalIndex from '@/admin-portal/routes'
import CommunitiesIndex from '@/admin-portal/routes/communities/'
import CommunitiesRoute from '@/admin-portal/routes/communities/route'
import ReferralsIndex from '@/admin-portal/routes/referrals/'
import ReferralsRoute from '@/admin-portal/routes/referrals/route'
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
        path: 'communities',
        element: <CommunitiesRoute />,
        children: [{ index: true, element: <CommunitiesIndex /> }],
      },
      {
        path: 'templates',
        element: <TemplatesRoute />,
        loader: TemplatesLoader,
        children: [{ index: true, element: <TemplatesIndex /> }],
      },
      {
        path: 'referrals',
        element: <ReferralsRoute />,
        children: [{ index: true, element: <ReferralsIndex /> }],
      },
    ],
  },
]

export default router
