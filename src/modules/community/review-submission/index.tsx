import { TabReviewEnum } from '@/constants/common.const'
import { HistoryTab } from '@/modules/community/review-submission/history'
import PendingTab from '@/modules/community/review-submission/pending'
import { NewClaimReviewStore } from '@/store/local/claim-review'
import { CommunityStore } from '@/store/local/community'
import { NewQuestSearchStore } from '@/store/local/quest-search.store'
import { Gap } from '@/styles/common.style'
import { ControlPanelTab } from '@/types/community'
import { Vertical } from '@/widgets/orientation'
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

  const setActiveControlPanelTab = CommunityStore.useStoreActions(
    (action) => action.setActiveControlPanelTab
  )

  setActiveControlPanelTab(ControlPanelTab.REVIEW_SUBMISSION)

  if (selectedCommunity === undefined) {
    // TODO: redirect from there.
    return <></>
  }

  return (
    <>
      <Head>{'Review Submission'}</Head>
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
      <Gap height={6} />
      <NewQuestSearchStore.Provider>
        <ContentPadding>
          {tabReviewState === TabReviewEnum.PENDING && (
            <PendingTab communityId={selectedCommunity.id} />
          )}
          {/* {tabReviewState === TabReviewEnum.HISTORY && <HistoryTab communityId={communityId} />} */}
        </ContentPadding>
      </NewQuestSearchStore.Provider>
    </>
  )
}
