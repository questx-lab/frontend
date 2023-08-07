import { FC } from 'react'

import tw from 'twin.macro'

import { TabReviewEnum } from '@/constants/common.const'
import ClaimReview from '@/modules/review-submissions/claim-review'
import HistoryTab from '@/modules/review-submissions/history'
import PendingTab from '@/modules/review-submissions/pending'
import ClaimReviewStore from '@/store/local/claim-review'
import CommunityStore from '@/store/local/community'
import NewQuestSearchStore from '@/store/local/quest-search'
import BasicModal from '@/widgets/modal/basic'
import {
  HorizontalBetweenCenterFullWidth,
  HorizontalCenter,
  Vertical,
  VerticalFullWidthCenter,
} from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { Tab, TabItem } from '@/widgets/tab-group/focus-white-background'
import { Text2xl } from '@/widgets/text'
import { ArrowPathIcon, ClockIcon } from '@heroicons/react/24/outline'

const Head = tw(Text2xl)`
  w-full
  py-5
  font-medium
`

const ContentPadding = tw(Vertical)`
  gap-6
  w-full
`

const FixedWidth = tw(Vertical)`w-[980px]`
const FixedWidthHorizontal = tw(HorizontalCenter)`w-[980px]`

const Index: FC = () => {
  // data
  const submissionModal = ClaimReviewStore.useStoreState((state) => state.showClaimDetails)
  const tabReviewState = ClaimReviewStore.useStoreState((state) => state.selectedTab)
  const selectedCommunity = CommunityStore.useStoreState((state) => state.selectedCommunity)
  const claimQuestActive = ClaimReviewStore.useStoreState((state) => state.claimQuestActive)
  // action
  const setTabReview = ClaimReviewStore.useStoreActions((actions) => actions.setSelectedTab)
  const setShowClaimDetails = ClaimReviewStore.useStoreActions(
    (actions) => actions.setShowClaimDetails
  )

  if (selectedCommunity === undefined) {
    // TODO: redirect from there.
    return <></>
  }

  return (
    <VerticalFullWidthCenter>
      <FixedWidth>
        <Head>{'Review Submission'}</Head>
      </FixedWidth>
      <HorizontalBetweenCenterFullWidth>
        <Tab>
          <FixedWidthHorizontal>
            <TabItem
              tabCount={1}
              active={tabReviewState === TabReviewEnum.PENDING}
              onClick={() => setTabReview(TabReviewEnum.PENDING)}
            >
              <ClockIcon className='w-5 h-5 mr-1' />
              {'PENDING'}
            </TabItem>
            <TabItem
              tabCount={1}
              active={tabReviewState === TabReviewEnum.HISTORY}
              onClick={() => setTabReview(TabReviewEnum.HISTORY)}
            >
              <ArrowPathIcon className='w-5 h-5 mr-1' />
              {'HISTORY'}
            </TabItem>
          </FixedWidthHorizontal>
        </Tab>
      </HorizontalBetweenCenterFullWidth>
      <Gap height={6} />
      <FixedWidth>
        <ContentPadding>
          <NewQuestSearchStore.Provider>
            {tabReviewState === TabReviewEnum.PENDING && (
              <PendingTab communityHandle={selectedCommunity.handle} />
            )}
          </NewQuestSearchStore.Provider>
          <NewQuestSearchStore.Provider>
            {tabReviewState === TabReviewEnum.HISTORY && (
              <HistoryTab communityHandle={selectedCommunity.handle} />
            )}
          </NewQuestSearchStore.Provider>
        </ContentPadding>

        <BasicModal
          title={claimQuestActive.quest.title}
          isOpen={submissionModal}
          onClose={() => setShowClaimDetails(false)}
          styled='!w-[780px]'
        >
          <ClaimReview />
        </BasicModal>
      </FixedWidth>
    </VerticalFullWidthCenter>
  )
}

export default Index
