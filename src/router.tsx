import { Index as CommunitiesIndex } from '@/modules/communities'
import { Index as CommunityIndex } from '@/modules/community'
import { Index as ReviewSubmissionIndex } from '@/modules/review-submission'
import { Home as HomeIndex } from '@/modules/root/homepage'
import { Communities } from '@/routes/communities/base'
import { Community, Loader as CommunityLoader } from '@/routes/communities/community/base'
import { ReviewSubmissions } from '@/routes/communities/community/review-submissions/base'
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
