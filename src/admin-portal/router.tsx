import Root, { RootLoader } from '@/admin-portal/routes/route'

const router = [
  {
    path: '/',
    element: <Root />,
    loader: RootLoader,
  },
]

export default router
