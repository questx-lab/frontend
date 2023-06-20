import { ChangeEvent, FC } from 'react'

import {
  HeaderFullWidth,
  HeaderSortFrame,
  HeaderTitleFrame,
} from '@/modules/review-submissions/mini-widget'
import ClaimReviewStore from '@/store/local/claim-review'
import { CheckBox } from '@/widgets/input'
import { BarsArrowDownIcon } from '@heroicons/react/24/outline'

const TableHeader: FC<{}> = () => {
  // data
  const selectedClaims = ClaimReviewStore.useStoreState((state) => state.selectedPendings)
  const pendingClaims = ClaimReviewStore.useStoreState((state) => state.pendingClaims)
  const allPendingChecked = ClaimReviewStore.useStoreState((state) => state.allPendingChecked)

  // action
  const setCheckAllPending = ClaimReviewStore.useStoreActions(
    (actions) => actions.setCheckAllPending
  )
  const setSelectedPending = ClaimReviewStore.useStoreActions(
    (actions) => actions.setSelectedPending
  )

  const onCheckAll = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckAllPending(e.target.checked)

    selectedClaims.clear()
    if (e.target.checked) {
      pendingClaims.map((claim) => selectedClaims.set(claim.id, claim))
    }
    setSelectedPending(selectedClaims)
  }

  return (
    <HeaderFullWidth>
      <HeaderTitleFrame>
        <CheckBox
          id='inline-checked-checkbox'
          type='checkbox'
          onChange={onCheckAll}
          checked={allPendingChecked}
        />
        {'Submission Pending'}
      </HeaderTitleFrame>

      <HeaderSortFrame>
        <BarsArrowDownIcon className='w-4 h-4 mr-1' />
        {'Sort by'}
      </HeaderSortFrame>
    </HeaderFullWidth>
  )
}

export default TableHeader
