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
  const historyClaims = NewClaimReviewStore.useStoreState((state) => state.historyClaims)
  const allHistoryChecked = NewClaimReviewStore.useStoreState((state) => state.allHistoryChecked)

  // action
  const setCheckAllHistory = NewClaimReviewStore.useStoreActions(
    (actions) => actions.setCheckAllHistory
  )
  const setSelectedHistory = NewClaimReviewStore.useStoreActions(
    (actions) => actions.setSelectedHistory
  )

  const onCheckAll = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckAllHistory(e.target.checked)
    if (e.target.checked) {
      setSelectedHistory(historyClaims.map((claim) => claim))
    } else {
      setSelectedHistory([])
    }
  }

  return (
    <HeaderFullWidth>
      <HeaderTitleFrame>
        <CheckBox
          id='inline-checked-checkbox'
          type='checkbox'
          onChange={onCheckAll}
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
