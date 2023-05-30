import { ReviewBtnEnum } from '@/constants/common.const'
import { RowActionButton } from '@/modules/review-submissions/mini-widget'
import { Vertical } from '@/widgets/orientation'
import { FunctionComponent } from 'react'
import tw from 'twin.macro'

const ButtonsFrame = tw(Vertical)`
  w-32
  gap-2
`

const RowButtons: FunctionComponent<{
  onButtonsAction: (submitType: number) => void
}> = ({ onButtonsAction }) => {
  return (
    <ButtonsFrame>
      <RowActionButton
        onClick={() => onButtonsAction(ReviewBtnEnum.REJECT)}
        btnType={ReviewBtnEnum.REJECT}
      >
        {'Reject'}
      </RowActionButton>
      <RowActionButton
        onClick={() => onButtonsAction(ReviewBtnEnum.ACCEPT)}
        btnType={ReviewBtnEnum.ACCEPT}
      >
        {'Accept'}
      </RowActionButton>
    </ButtonsFrame>
  )
}

export default RowButtons
