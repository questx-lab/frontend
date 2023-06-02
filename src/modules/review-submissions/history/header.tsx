import { ChangeEvent, FunctionComponent } from 'react'

import {
  HeaderFullWidth,
  HeaderSortFrame,
  HeaderTitleFrame,
} from '@/modules/review-submissions/mini-widget'
import { NewClaimReviewStore } from '@/store/local/claim-review'
import { CheckBox } from '@/widgets/input'
import { BarsArrowDownIcon } from '@heroicons/react/24/outline'

const TableHeader: FunctionComponent<{}> = () => {
  // data
  const historyClaims = NewClaimReviewStore.useStoreState((state) => state.historyClaims)
  const selectedHistories = NewClaimReviewStore.useStoreState((state) => state.selectedHistories)
  const allHistoryChecked = NewClaimReviewStore.useStoreState((state) => state.allHistoryChecked)

  // action
  const setCheckAllHistory = NewClaimReviewStore.useStoreActions(
    (actions) => actions.setCheckAllHistory
  )
  const setSelectedHistory = NewClaimReviewStore.useStoreActions(
    (actions) => actions.setSelectedHistory
  )

  const onCheckAllChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckAllHistory(e.target.checked)
    selectedHistories.clear()
    if (e.target.checked) {
      historyClaims.map((claim) => selectedHistories.set(claim.id, claim))
    }
    setSelectedHistory(selectedHistories)
  }

  return (
    <HeaderFullWidth>
      <HeaderTitleFrame>
        <CheckBox
          id='inline-checked-checkbox'
          type='checkbox'
          onChange={onCheckAllChanged}
          checked={allHistoryChecked}
        />
        {'Submission History'}
      </HeaderTitleFrame>

      <HeaderSortFrame>
        <BarsArrowDownIcon className='w-4 h-4 mr-1' />
        {'Sort by'}
      </HeaderSortFrame>
    </HeaderFullWidth>
  )
}

export default TableHeader
