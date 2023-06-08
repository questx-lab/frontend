import DiscordCallback from '@/modules/callback/discord'
import TwitterCallback from '@/modules/callback/twitter'
import { Index as CommunityIndex } from '@/modules/community'
import { Index as ReviewSubmissionIndex } from '@/modules/review-submissions'
import { Index as AccountSettingIndex } from '@/platform/routes/account-setting/index'
import { AccoutSetting } from '@/platform/routes/account-setting/route'
import { Index as CommunitiesIndex } from '@/platform/routes/communities'
import { Index as CreateQuestIndex } from '@/platform/routes/communities/community/create'
import { CreateQuest } from '@/platform/routes/communities/community/create/route'
import EditQuestIndex from '@/platform/routes/communities/community/edit-quest'
import EditQuest from '@/platform/routes/communities/community/edit-quest/route'
import { ReviewSubmissions } from '@/platform/routes/communities/community/review-submissions/route'
import { Community, Loader as CommunityLoader } from '@/platform/routes/communities/community/route'
import { Index as CommunitySettingsIndex } from '@/platform/routes/communities/community/settings'
import { Settings } from '@/platform/routes/communities/community/settings/route'
import { Communities } from '@/platform/routes/communities/route'
import { Index as TrendingCommunitiesIndex } from '@/platform/routes/communities/trending'
import TrendingCommunity from '@/platform/routes/communities/trending/route'
import { HomeOrLanding as HomeIndex } from '@/platform/routes/homepage'
import { Index as QuestercampIndex } from '@/platform/routes/questercamp'
import { Questercamp } from '@/platform/routes/questercamp/route'
import { Index as TrendingQuestsIndex } from '@/platform/routes/questercamp/trending'
import TrendingQuest from '@/platform/routes/questercamp/trending/route'
import { Root, RootLoader } from '@/platform/routes/route'

const router = [
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
  {
    path: 'api/auth/callback/discord',
    index: true,
    element: <DiscordCallback />,
  },
]

export default router