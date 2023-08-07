import { FC } from 'react'

import tw from 'twin.macro'

import { QuestDetail } from '@/modules/review-submissions/claim-review'
import { ClaimedSubmit } from '@/modules/review-submissions/pending/row-item'
import { ClaimQuestType } from '@/types'
import { Horizontal, Vertical } from '@/widgets/orientation'
import { MediumTextSm } from '@/widgets/text'

const Frame = tw(Horizontal)`
  w-full
  h-full
  gap-6
  pl-6
  pb-6
  max-h-[calc(100vh_-_160px)]
  overflow-y-scroll
  max-sm:flex-col
`

const Width66 = tw(Vertical)`
  w-2/3
  h-full
  mt-8
  gap-4
  overflow-y-scroll
  p-5
  gap-3
  rounded-lg
  border
  border-solid
  border-gray-200
  max-sm:w-full
`

const ClaimDetail: FC<{ claim: ClaimQuestType }> = ({ claim }) => {
  return (
    <Width66>
      <MediumTextSm>SUBMISSION</MediumTextSm>
      <ClaimedSubmit claimQuest={claim} />
    </Width66>
  )
}

const ClaimHistoryDetail: FC<{ claim: ClaimQuestType }> = ({ claim }) => {
  return (
    <Frame>
      <ClaimDetail claim={claim} />
      <QuestDetail quest={claim.quest} />
    </Frame>
  )
}

export default ClaimHistoryDetail
