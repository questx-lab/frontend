import { FunctionComponent } from 'react'

import tw from 'twin.macro'

import { ReviewBtnEnum } from '@/constants/common.const'
import { RowActionButton } from '@/modules/review-submissions/mini-widget'
import { HorizontalBetweenCenterFullWidth, Vertical } from '@/widgets/orientation'

const RowButtonsFrame = tw(HorizontalBetweenCenterFullWidth)`
  gap-2
`

const ColButtonsFrame = tw(Vertical)`
  w-32
  gap-2
`

export const RowButtons: FunctionComponent<{
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

export const ColButtons: FunctionComponent<{
  onButtonsAction: (submitType: number) => void
}> = ({ onButtonsAction }) => {
  return (
    <ColButtonsFrame>
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
    </ColButtonsFrame>
  )
}
