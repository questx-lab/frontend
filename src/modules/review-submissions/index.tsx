import { FunctionComponent } from 'react'

import tw from 'twin.macro'

import { TabReviewEnum } from '@/constants/common.const'
import ClaimReview from '@/modules/review-submissions/claim-review'
import HistoryTab from '@/modules/review-submissions/history'
import PendingTab from '@/modules/review-submissions/pending'
import { NewClaimReviewStore } from '@/store/local/claim-review'
import { CommunityStore } from '@/store/local/community'
import { NewQuestSearchStore } from '@/store/local/quest-search.store'
import { Gap } from '@/styles/common.style'
import BasicModal from '@/widgets/modal/basic'
import {
  HorizontalBetweenCenterFullWidth,
  Vertical,
  VerticalFullWidth,
} from '@/widgets/orientation'
import { Tab, TabItem } from '@/widgets/tab-group'
import { HeaderText3 } from '@/widgets/text'
import { ArrowPathIcon, ClockIcon } from '@heroicons/react/24/outline'

const Head = tw(HeaderText3)`
  w-full
  max-2xl:px-12
  max-lg:px-6
  py-4
  px-36
`

const ContentPadding = tw(Vertical)`
  gap-6
  px-36
  max-2xl:px-12
  max-lg:px-6
  w-full
`

export const Index: FunctionComponent = () => {
  // data
  const submissionModal = NewClaimReviewStore.useStoreState((state) => state.showClaimDetails)
  const tabReviewState = NewClaimReviewStore.useStoreState((state) => state.selectedTab)
  const selectedCommunity = CommunityStore.useStoreState((state) => state.selectedCommunity)
  const claimQuestActive = NewClaimReviewStore.useStoreState((state) => state.claimQuestActive)
  // action
  const setTabReview = NewClaimReviewStore.useStoreActions((actions) => actions.setSelectedTab)
  const setShowClaimDetails = NewClaimReviewStore.useStoreActions(
    (actions) => actions.setShowClaimDetails
  )

  if (selectedCommunity === undefined) {
    // TODO: redirect from there.
    return <></>
  }

  return (
    <VerticalFullWidth>
      <Head>{'Review Submission'}</Head>
      <HorizontalBetweenCenterFullWidth>
        <Tab>
          <TabItem
            active={tabReviewState === TabReviewEnum.PENDING}
            onClick={() => setTabReview(TabReviewEnum.PENDING)}
          >
            <ClockIcon className='w-5 h-5 mr-1' />
            {'PENDING'}
          </TabItem>
          <TabItem
            active={tabReviewState === TabReviewEnum.HISTORY}
            onClick={() => setTabReview(TabReviewEnum.HISTORY)}
          >
            <ArrowPathIcon className='w-5 h-5 mr-1' />
            {'HISTORY'}
          </TabItem>
        </Tab>
      </HorizontalBetweenCenterFullWidth>
      <Gap height={6} />

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
      >
        <ClaimReview />
      </BasicModal>
    </VerticalFullWidth>
  )
}
