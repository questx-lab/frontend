import {
  HeaderFullWidth,
  HeaderSortFrame,
  HeaderTitleFrame,
} from '@/modules/review-submissions/mini-widget'
import { NewClaimReviewStore } from '@/store/local/claim-review'
import { CheckBox } from '@/widgets/input'
import { BarsArrowDownIcon } from '@heroicons/react/24/outline'
import { ChangeEvent, FunctionComponent } from 'react'

export const Header: FunctionComponent<{}> = () => {
  // data
  const pendingClaims = NewClaimReviewStore.useStoreState((state) => state.pendingClaims)
  const allPendingChecked = NewClaimReviewStore.useStoreState((state) => state.allPendingChecked)

  // action
  const setCheckAllPending = NewClaimReviewStore.useStoreActions(
    (actions) => actions.setCheckAllPending
  )
  const setChoosePending = NewClaimReviewStore.useStoreActions(
    (actions) => actions.setSelectedPending
  )

  const onCheckAll = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckAllPending(e.target.checked)
    if (e.target.checked) {
      setChoosePending(pendingClaims.map((claim) => claim))
    } else {
      setChoosePending([])
    }
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
        {'Submission History'}
      </HeaderTitleFrame>

      <HeaderSortFrame>
        <BarsArrowDownIcon className='w-4 h-4 mr-1' />
        {'Sort by'}
      </HeaderSortFrame>
    </HeaderFullWidth>
  )
}
