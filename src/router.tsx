import { Index as CommunitiesIndex } from '@/routes/communities'
import { Index as CommunityIndex } from '@/routes/communities/community'
import { Index as CreateCommunityIndex } from '@/routes/communities/community/create'
import { Index as ReviewSubmissionIndex } from '@/routes/communities/community/review-submissions'
import { Index as CommunitySettingsIndex } from '@/routes/communities/community/settings'
import { Home as HomeIndex } from '@/modules/root/homepage'
import { Communities } from '@/routes/communities/route'
import { Community, Loader as CommunityLoader } from '@/routes/communities/community/route'
import { CreateCommunity } from '@/routes/communities/community/create/route'
import { ReviewSubmissions } from '@/routes/communities/community/review-submissions/route'
import { Settings } from '@/routes/communities/community/settings/route'
import { Root, RootLoader } from '@/routes/route'
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
        path: 'communities',
        element: <Communities />,
        children: [
          { index: true, element: <CommunitiesIndex /> },
          {
            loader: CommunityLoader,
            path: ':communityId',
            element: <Community />,
            children: [
              { index: true, element: <CommunityIndex /> },
              {
                path: 'review',
                element: <ReviewSubmissions />,
                children: [{ index: true, element: <ReviewSubmissionIndex /> }],
              },
              {
                path: 'settings',
                element: <Settings />,
                children: [{ index: true, element: <CommunitySettingsIndex /> }],
              },
              {
                path: 'create',
                element: <CreateCommunity />,
                children: [{ index: true, element: <CreateCommunityIndex /> }],
              },
            ],
          },
        ],
      },
    ],
  },
])

export const RouterComponent: FunctionComponent = () => {
  return <RouterProvider router={router} />
}
