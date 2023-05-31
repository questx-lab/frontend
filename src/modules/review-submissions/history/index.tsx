import { listClaimedQuestsApi } from '@/app/api/client/claim'
import RowItem from '@/modules/review-submissions/history/row-item'
import { SubmissionBorder } from '@/modules/review-submissions/mini-widget'
import { Header } from '@/modules/review-submissions/pending/header'
import { SubmissionsList } from '@/modules/review-submissions/submissions-list'
import { NewClaimReviewStore } from '@/store/local/claim-review'
import { NewQuestSearchStore } from '@/store/local/quest-search.store'
import { ClaimQuestType, ListClaimQuestType, Rsp } from '@/utils/type'
import { FullWidthHeight } from '@/widgets/orientation'
import { FunctionComponent, useEffect } from 'react'

const HistoryTab: FunctionComponent<{ communityHandle: string }> = ({ communityHandle }) => {
  // data
  const selectedQuest = NewQuestSearchStore.useStoreState((state) => state.selectedQuest)
  const historyClaims = NewClaimReviewStore.useStoreState((state) => state.historyClaims)

  // actions
  const setLoading = NewClaimReviewStore.useStoreActions((state) => state.setLoading)
  const setHistoryClaims = NewClaimReviewStore.useStoreActions((state) => state.setHistoryClaims)

  // Hook
  useEffect(() => {
    getClaimsQuest()
  }, [])

  const getClaimsQuest = async () => {
    setLoading(true)
    const result: Rsp<ListClaimQuestType> = await listClaimedQuestsApi(
      communityHandle,
      'rejected,accepted',
      selectedQuest.map((claim) => claim.id!)
    )

    if (result.code === 0) {
      setHistoryClaims(result.data?.claimed_quests || [])
    } else {
      // TODO: show error here.
    }

    setTimeout(() => setLoading(false), 200)
  }

  console.log('historyClaims length = ', historyClaims.length)

  return (
    <>
      <FullWidthHeight>
        <SubmissionBorder>
          <Header />

          <SubmissionsList
            list={historyClaims}
            itemView={(item: ClaimQuestType, index: number) => {
              return <RowItem active={false} claimQuest={item} onChange={() => {}} />
            }}
          />
        </SubmissionBorder>
      </FullWidthHeight>
    </>
  )
}

export default HistoryTab
