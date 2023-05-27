import { TabReviewEnum } from '@/constants/common.const'
import { NewClaimReviewStore } from '@/store/local/claim-review'
import { CommunityStore } from '@/store/local/community'
import { Gap } from '@/styles/common.style'
import { ControlPanelTab } from '@/types/community'
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

export const Index: FunctionComponent = () => {
  // data
  const tabReviewState = NewClaimReviewStore.useStoreState((state) => state.tabReview)
  const loadingModal = NewClaimReviewStore.useStoreState((state) => state.loadingModal)

  // action
  const setTabReview = NewClaimReviewStore.useStoreActions((actions) => actions.setTabReview)

  const setActiveControlPanelTab = CommunityStore.useStoreActions(
    (action) => action.setActiveControlPanelTab
  )

  setActiveControlPanelTab(ControlPanelTab.REVIEW_SUBMISSION)

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
    </>
  )
}
