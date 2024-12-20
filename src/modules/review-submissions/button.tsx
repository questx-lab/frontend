import { FC } from 'react'

import tw from 'twin.macro'

import { ReviewBtnEnum } from '@/constants/common.const'
import { RowActionButton } from '@/modules/review-submissions/mini-widget'
import { HorizontalBetweenCenterFullWidth, Vertical } from '@/widgets/orientation'

const RowButtonsFrame = tw(HorizontalBetweenCenterFullWidth)`
  gap-2
`

const ColumnButtonsFrame = tw(Vertical)`
  w-32
  gap-2
`

// For action in item pending quest
export const RowButtons: FC<{
  onButtonsAction: (submitType: number) => void
}> = ({ onButtonsAction }) => {
  return (
    <RowButtonsFrame>
      <RowActionButton
        onClick={() => onButtonsAction(ReviewBtnEnum.ACCEPT)}
        btnType={ReviewBtnEnum.ACCEPT}
      >
        {'Accept'}
      </RowActionButton>
      <RowActionButton
        onClick={() => onButtonsAction(ReviewBtnEnum.REJECT)}
        btnType={ReviewBtnEnum.REJECT}
      >
        {'Reject'}
      </RowActionButton>
    </RowButtonsFrame>
  )
}

// For action when open detail quest claim
export const ColumnButtons: FC<{
  onButtonsAction: (submitType: number) => void
}> = ({ onButtonsAction }) => {
  return (
    <ColumnButtonsFrame>
      <RowActionButton
        onClick={() => onButtonsAction(ReviewBtnEnum.ACCEPT)}
        btnType={ReviewBtnEnum.ACCEPT}
      >
        {'Accept'}
      </RowActionButton>
      <RowActionButton
        onClick={() => onButtonsAction(ReviewBtnEnum.REJECT)}
        btnType={ReviewBtnEnum.REJECT}
      >
        {'Reject'}
      </RowActionButton>
      <RowActionButton
        onClick={() => onButtonsAction(ReviewBtnEnum.VIEW_DETAIL)}
        btnType={ReviewBtnEnum.PENDING}
      >
        {'View Detail'}
      </RowActionButton>
    </ColumnButtonsFrame>
  )
}
