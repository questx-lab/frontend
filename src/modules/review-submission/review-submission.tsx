import toast from 'react-hot-toast'

import { listClaimedQuestsApi } from '@/app/api/client/quest'
import ProjectSide from '@/components/sidebar'
import { SideEnum, TabReviewEnum } from '@/constants/project.const'
import ControlPanel from '@/modules/new-quest/control-panel'
import { NewClaimReviewStore } from '@/store/local/claim-review'
import { NewQuestSearchStore } from '@/store/local/quest-search.store'
import { Gap } from '@/styles/common.style'
import { Head, Main, Tab, TabItem } from '@/styles/quest-review.style'
import { MMain, Wrap } from '@/styles/questboard.style'
import { ClaimQuestType } from '@/types/project.type'
import { LoadingModal } from '@/widgets/modal'
import { ArrowPathIcon, ClockIcon } from '@heroicons/react/24/outline'

import DetailSubmission from './detail-submission'
import HistoryTab from './history'
import PendingTab from './pending'

// Handler
export const getListClaimQuest = async (
  projectId: string,
  filterQuest: string = 'rejected,accepted',
  onAction: (action: ClaimQuestType[]) => void,
  filterQuestIds?: string[]
) => {
  try {
    const data = await listClaimedQuestsApi(
      projectId,
      filterQuest,
      filterQuestIds ?? []
    )
    if (data.error) {
      toast.error(data.error)
    } else {
      onAction(data.data?.claimed_quests!)
    }
  } catch (error) {
    toast.error('Error network')
  }
}

export default function ReviewSubmission({ projectId }: { projectId: string }) {
  // Data
  const tabReviewState = NewClaimReviewStore.useStoreState(
    (state) => state.tabReview
  )

  const loadingModal = NewClaimReviewStore.useStoreState(
    (state) => state.loadingModal
  )

  // Actions
  const setTabReview = NewClaimReviewStore.useStoreActions(
    (actions) => actions.setTabReview
  )

  return (
    <Wrap>
      <ProjectSide projectId={projectId} />
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
            {tabReviewState === TabReviewEnum.PENDING && (
              <PendingTab projectId={projectId} />
            )}
            {tabReviewState === TabReviewEnum.HISTORY && (
              <HistoryTab projectId={projectId} />
            )}
          </NewQuestSearchStore.Provider>

          <DetailSubmission />
        </Main>
      </MMain>
      <LoadingModal isOpen={loadingModal} />
    </Wrap>
  )
}
