import { lazy, Suspense } from 'react'

import { RouteObject } from 'react-router-dom'

import { TownhallStatus } from '@/constants/common.const'
import { EnvVariables } from '@/constants/env.const'
import DiscordCallback from '@/modules/callback/discord'
import TwitterCallback from '@/modules/callback/twitter'
import CommunityIndex from '@/modules/community'
import ReviewSubmissionIndex from '@/modules/review-submissions'
import AccountSettingIndex from '@/platform/routes/account-setting/index'
import AccoutSettings from '@/platform/routes/account-setting/route'
import CommunitiesIndex from '@/platform/routes/communities'
import CreateQuestIndex from '@/platform/routes/communities/community/create'
import CreateQuest from '@/platform/routes/communities/community/create/route'
import EditQuestIndex from '@/platform/routes/communities/community/edit-quest'
import EditQuest from '@/platform/routes/communities/community/edit-quest/route'
import ReviewSubmissions from '@/platform/routes/communities/community/review-submissions/route'
import Community, { Loader as CommunityLoader } from '@/platform/routes/communities/community/route'
import CommunitySettingsIndex from '@/platform/routes/communities/community/settings'
import Settings from '@/platform/routes/communities/community/settings/route'
import Communities from '@/platform/routes/communities/route'
import TrendingCommunitiesIndex from '@/platform/routes/communities/trending'
import TrendingCommunity from '@/platform/routes/communities/trending/route'
import HomeIndex from '@/platform/routes/homepage'
import MessageCommunityIndex from '@/platform/routes/messages/community/index'
import MessageCommunity, {
  Loader as MessageCommunityLoader,
} from '@/platform/routes/messages/community/route'
import MessageIndex from '@/platform/routes/messages/index'
import Messages from '@/platform/routes/messages/routes'
import QuestercampIndex from '@/platform/routes/questercamp'
import Questercamp from '@/platform/routes/questercamp/route'
import TrendingQuestsIndex from '@/platform/routes/questercamp/trending'
import TrendingQuest from '@/platform/routes/questercamp/trending/route'
import Root, { RootLoader } from '@/platform/routes/route'
import TownhallCommunity, {
  Loader as TownhallCommunityLoader,
} from '@/townhall/routes/community/route'
import Townhall from '@/townhall/routes/route'
import ErrorPage from '@/widgets/error'
import { SmallSpinner } from '@/widgets/spinner'

const RoomIndex = lazy(() => import('@/townhall/modules/room'))

const PlatformRouter = (): RouteObject[] => {
  const router: RouteObject[] = [
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
                  path: 'create-quest',
                  element: <CreateQuest />,
                  children: [{ index: true, element: <CreateQuestIndex /> }],
                },
                {
                  path: 'edit-quest',
                  element: <EditQuest />,
                  children: [{ index: true, element: <EditQuestIndex /> }],
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
          path: 'account-settings',
          element: <AccoutSettings />,
          children: [{ index: true, element: <AccountSettingIndex /> }],
        },
        {
          path: 'messages',
          element: <Messages />,
          children: [
            { index: true, element: <MessageIndex /> },
            {
              loader: MessageCommunityLoader,
              path: ':communityHandle',
              element: <MessageCommunity />,
              children: [{ index: true, element: <MessageCommunityIndex /> }],
            },
          ],
        },
      ],
    },

    {
      path: 'api/auth/callback/twitter',
      index: true,
      element: <TwitterCallback />,
    },
    {
      path: 'api/auth/callback/discord',
      index: true,
      element: <DiscordCallback />,
    },
  ]

  if (EnvVariables.TOWNHALL_STATUS === TownhallStatus.ENABLE) {
    router.push({
      path: '/townhall',
      element: <Townhall />,
      children: [
        {
          path: ':communityHandle',
          loader: TownhallCommunityLoader,
          errorElement: <ErrorPage />,
          element: <TownhallCommunity />,
          children: [
            {
              index: true,
              element: (
                <Suspense fallback={<SmallSpinner />}>
                  <RoomIndex />
                </Suspense>
              ),
            },
          ],
        },
      ],
    })
  }

  return router
}

export default PlatformRouter
