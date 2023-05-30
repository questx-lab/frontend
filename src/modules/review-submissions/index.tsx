import { TabReviewEnum } from '@/constants/common.const'
import PendingTab from '@/modules/review-submissions/pending'
import { NewClaimReviewStore } from '@/store/local/claim-review'
import { CommunityStore } from '@/store/local/community'
import { NewQuestSearchStore } from '@/store/local/quest-search.store'
import { Gap } from '@/styles/common.style'
import {
  HorizontalBetweenCenterFullWidth,
  Vertical,
  VerticalFullWidth,
} from '@/widgets/orientation'
import { Tab, TabItem } from '@/widgets/tab-group'
import { ArrowPathIcon, ClockIcon } from '@heroicons/react/24/outline'
import { FunctionComponent } from 'react'
import tw from 'twin.macro'

const Head = tw.div`
  w-full
  py-4
  px-36
  max-2xl:px-12
  max-lg:px-6
  text-lg
  font-medium
  text-black
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
  const tabReviewState = NewClaimReviewStore.useStoreState((state) => state.tabReview)
  const loadingModal = NewClaimReviewStore.useStoreState((state) => state.loadingModal)
  const selectedCommunity = CommunityStore.useStoreState((state) => state.selectedCommunity)

  // action
  const setTabReview = NewClaimReviewStore.useStoreActions((actions) => actions.setTabReview)

  if (selectedCommunity === undefined) {
    // TODO: redirect from there.
    return <></>
  }

  console.log('tabReviewState = ', tabReviewState)

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

      <NewQuestSearchStore.Provider>
        <ContentPadding>
          {tabReviewState === TabReviewEnum.PENDING && (
            <PendingTab communityHandle={selectedCommunity.handle} />
          )}
          {/* {tabReviewState === TabReviewEnum.HISTORY && <HistoryTab communityId={communityId} />} */}
        </ContentPadding>
      </NewQuestSearchStore.Provider>
    </VerticalFullWidth>
  )
}
