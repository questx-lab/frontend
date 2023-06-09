import { FunctionComponent } from 'react'

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
  Vertical,
  VerticalFullWidth,
} from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
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

const Index: FunctionComponent = () => {
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

export default Index
