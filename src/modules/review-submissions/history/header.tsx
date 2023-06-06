import { ChangeEvent, FunctionComponent } from 'react'

import {
  HeaderFullWidth,
  HeaderSortFrame,
  HeaderTitleFrame,
} from '@/modules/review-submissions/mini-widget'
import ClaimReviewStore from '@/store/local/claim-review'
import { CheckBox } from '@/widgets/input'
import { BarsArrowDownIcon } from '@heroicons/react/24/outline'

const TableHeader: FunctionComponent<{}> = () => {
  // data
  const historyClaims = ClaimReviewStore.useStoreState((state) => state.historyClaims)
  const selectedHistories = ClaimReviewStore.useStoreState((state) => state.selectedHistories)
  const allHistoryChecked = ClaimReviewStore.useStoreState((state) => state.allHistoryChecked)

  // action
  const setCheckAllHistory = ClaimReviewStore.useStoreActions(
    (actions) => actions.setCheckAllHistory
  )
  const setSelectedHistory = ClaimReviewStore.useStoreActions(
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
