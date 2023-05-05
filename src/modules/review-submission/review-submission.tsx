import SidebarCustom from '@/components/sidebar'
import { SideEnum, TabReviewEnum } from '@/constants/project.const'
import ControlPanel from '@/modules/new-quest/control-panel'
import { NewProjectStore } from '@/store/local/project.store'
import { Gap } from '@/styles/common.style'
import { Head, Main, Tab, TabItem } from '@/styles/quest-review.style'
import { MMain, Wrap } from '@/styles/questboard.style'
import { ArrowPathIcon, ClockIcon } from '@heroicons/react/24/outline'

import DetailSubmission from './detail-submission'
import HistoryTab from './history'
import PendingTab from './pending'

export default function ReviewSubmission({ projectId }: { projectId: string }) {
  // Data
  const tabReviewState = NewProjectStore.useStoreState(
    (state) => state.tabReview
  )

  // Actions
  const onTabReviewChanged = NewProjectStore.useStoreActions(
    (actions) => actions.onTabReviewChanged
  )

  return (
    <Wrap>
      <SidebarCustom />
      <MMain>
        <ControlPanel
          projectId={projectId}
          active={SideEnum.REVIEW_SUBMISSION}
        />
        <Main>
          <Head>{'Review Submission'}</Head>
          <Tab>
            <TabItem
              active={tabReviewState === TabReviewEnum.PENDING}
              onClick={() => onTabReviewChanged(TabReviewEnum.PENDING)}
            >
              <ClockIcon className='w-5 h-5 mr-1' />
              {'PENDING'}
            </TabItem>
            <TabItem
              active={tabReviewState === TabReviewEnum.HISTORY}
              onClick={() => onTabReviewChanged(TabReviewEnum.HISTORY)}
            >
              <ArrowPathIcon className='w-5 h-5 mr-1' />
              {'HISTORY'}
            </TabItem>
          </Tab>
          <Gap height={6} />
          {tabReviewState === TabReviewEnum.PENDING && <PendingTab />}
          {tabReviewState === TabReviewEnum.HISTORY && <HistoryTab />}
          <DetailSubmission />
        </Main>
      </MMain>
    </Wrap>
  )
}
