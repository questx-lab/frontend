import { FC } from 'react'

import parseHtml from 'html-react-parser'
import tw from 'twin.macro'

import { ClaimedSubmit } from '@/modules/review-submissions/pending/row-item'
import { ClaimQuestType } from '@/types'
import BasicModal from '@/widgets/modal/basic'
import { VerticalFullWidth } from '@/widgets/orientation'
import { MediumTextSm } from '@/widgets/text'

const Frame = tw(VerticalFullWidth)`gap-6 p-6 overflow-y-scroll`

const BorderVertical = tw(VerticalFullWidth)`
  border
  border-solid
  border-gray-200
  rounded-lg
  p-5
`

const ViewDetailModal: FC<{
  isOpen: boolean
  onCloseModal: () => void
  claimQuest: ClaimQuestType
}> = ({ isOpen, onCloseModal, claimQuest }) => {
  return (
    <BasicModal
      styled='!w-[680px]'
      title={claimQuest.quest.title}
      isOpen={isOpen}
      onClose={onCloseModal}
    >
      <Frame>
        <MediumTextSm>{'Description'}</MediumTextSm>
        <BorderVertical>{parseHtml(claimQuest.quest.description)}</BorderVertical>
        <MediumTextSm>{'Submission'}</MediumTextSm>
        <ClaimedSubmit claimQuest={claimQuest} />
      </Frame>
    </BasicModal>
  )
}

export default ViewDetailModal
