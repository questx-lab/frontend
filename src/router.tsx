import { FunctionComponent } from 'react'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import TwitterCallback from '@/modules/callback/twitter'
import { Index as CommunityIndex } from '@/modules/community'
import { Index as ReviewSubmissionIndex } from '@/modules/review-submissions'
import { Index as AccountSettingIndex } from '@/routes/account-setting/index'
import { AccoutSetting } from '@/routes/account-setting/route'
import { Index as CommunitiesIndex } from '@/routes/communities'
import { Index as CreateQuestIndex } from '@/routes/communities/community/create'
import { CreateQuest } from '@/routes/communities/community/create/route'
import { ReviewSubmissions } from '@/routes/communities/community/review-submissions/route'
import { Community, Loader as CommunityLoader } from '@/routes/communities/community/route'
import { Index as CommunitySettingsIndex } from '@/routes/communities/community/settings'
import { Settings } from '@/routes/communities/community/settings/route'
import { Communities } from '@/routes/communities/route'
import { Index as TrendingCommunitiesIndex } from '@/routes/communities/trending'
import TrendingCommunity from '@/routes/communities/trending/route'
import { HomeOrLanding as HomeIndex } from '@/routes/homepage'
import { Index as QuestercampIndex } from '@/routes/questercamp'
import { Questercamp } from '@/routes/questercamp/route'
import { Index as TrendingQuestsIndex } from '@/routes/questercamp/trending'
import TrendingQuest from '@/routes/questercamp/trending/route'
import { Root, RootLoader } from '@/routes/route'

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
            path: ':communityHandle',
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
                element: <CreateQuest />,
                children: [{ index: true, element: <CreateQuestIndex /> }],
              },
            ],
          },
          {
            path: 'trending',
            element: <TrendingCommunity />,
            children: [{ index: true, element: <TrendingCommunitiesIndex /> }],
          },
        ],
      },
      {
        path: 'questercamp',
        element: <Questercamp />,
        children: [
          { index: true, element: <QuestercampIndex /> },
          {
            path: 'trending',
            element: <TrendingQuest />,
            children: [{ index: true, element: <TrendingQuestsIndex /> }],
          },
        ],
      },
      {
        path: 'account-setting',
        element: <AccoutSetting />,
        children: [{ index: true, element: <AccountSettingIndex /> }],
      },
    ],
  },
  {
    path: 'api/auth/callback/twitter',
    index: true,
    element: <TwitterCallback />,
  },
])

export const RouterComponent: FunctionComponent = () => {
  return <RouterProvider router={router} />
}
