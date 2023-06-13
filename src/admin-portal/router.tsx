import PortalIndex from '@/admin-portal/routes'
import BadgesIndex from '@/admin-portal/routes/badges/'
import BadgesRoute from '@/admin-portal/routes/badges/route'
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
        path: 'badges',
        element: <BadgesRoute />,
        children: [{ index: true, element: <BadgesIndex /> }],
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
