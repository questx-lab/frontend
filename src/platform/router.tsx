import { RouteObject } from 'react-router-dom'

import DiscordCallback from '@/modules/callback/discord'
import TwitterCallback from '@/modules/callback/twitter'
import CommunityIndex from '@/modules/community'
import QuestDetailIndex from '@/modules/community/quests/quest'
import NotFound from '@/modules/not-found'
import ReviewSubmissionIndex from '@/modules/review-submissions'
import AccountSettingIndex from '@/platform/routes/account-setting/index'
import AccoutSettings from '@/platform/routes/account-setting/route'
import CommunitiesIndex from '@/platform/routes/communities'
import CreateQuestIndex from '@/platform/routes/communities/community/create'
import CreateQuest from '@/platform/routes/communities/community/create/route'
import EditQuestIndex from '@/platform/routes/communities/community/edit-quest'
import EditQuest from '@/platform/routes/communities/community/edit-quest/route'
import CommunityLeaderboardIndex from '@/platform/routes/communities/community/leaderboard'
import Leaderboard from '@/platform/routes/communities/community/leaderboard/route'
import LotteryIndex from '@/platform/routes/communities/community/lottery'
import Lottery from '@/platform/routes/communities/community/lottery/route'
import ReviewSubmissions from '@/platform/routes/communities/community/review-submissions/route'
import Community, { Loader as CommunityLoader } from '@/platform/routes/communities/community/route'
import CommunitySettingsIndex from '@/platform/routes/communities/community/settings'
import Settings from '@/platform/routes/communities/community/settings/route'
import Communities from '@/platform/routes/communities/route'
import TrendingCommunitiesIndex from '@/platform/routes/communities/trending'
import TrendingCommunity from '@/platform/routes/communities/trending/route'
import HomeIndex from '@/platform/routes/homepage'
import ChannelIndex from '@/platform/routes/messages/community/channel'
import MessagesCommunityChannel from '@/platform/routes/messages/community/channel/route'
import MessageCommunityIndex from '@/platform/routes/messages/community/index'
import MessagesCommunity, {
  Loader as MessageCommunityLoader,
} from '@/platform/routes/messages/community/route'
import Messages from '@/platform/routes/messages/route'
import QuestercampIndex from '@/platform/routes/questercamp'
import Questercamp from '@/platform/routes/questercamp/route'
import TrendingQuestsIndex from '@/platform/routes/questercamp/trending'
import TrendingQuest from '@/platform/routes/questercamp/trending/route'
import Root, { RootLoader } from '@/platform/routes/route'

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
                  path: 'quests/:questId',
                  element: <CommunityIndex />,
                  children: [{ index: true, element: <QuestDetailIndex /> }],
                },
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
                  path: 'leaderboard',
                  element: <Leaderboard />,
                  children: [{ index: true, element: <CommunityLeaderboardIndex /> }],
                },
                {
                  path: 'lottery',
                  element: <Lottery />,
                  children: [{ index: true, element: <LotteryIndex /> }],
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
            {
              loader: MessageCommunityLoader,
              path: ':communityHandle',
              element: <MessagesCommunity />,
              children: [
                { index: true, element: <MessageCommunityIndex /> },
                {
                  path: ':channelId',
                  element: <MessagesCommunityChannel />,
                  children: [{ index: true, element: <ChannelIndex /> }],
                },
              ],
            },
          ],
        },
        {
          path: '*',
          element: <NotFound />,
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

  return router
}

export default PlatformRouter
