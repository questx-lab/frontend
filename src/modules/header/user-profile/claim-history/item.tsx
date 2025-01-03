import { FC, useState } from 'react'

import tw from 'twin.macro'

import { ClaimedQuestMap, ClaimedQuestStatus } from '@/constants/common.const'
import StorageConst from '@/constants/storage.const'
import ClaimHistoryDetail from '@/modules/header/user-profile/claim-history/item-detail'
import { Status } from '@/modules/review-submissions/history/row-item'
import { ClaimQuestType } from '@/types'
import { GrayBorderBox } from '@/widgets/box'
import { CircularImage } from '@/widgets/circular-image'
import { Image } from '@/widgets/image'
import BasicModal from '@/widgets/modal/basic'
import { Horizontal, Vertical } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { TextBase, TextSm } from '@/widgets/text'

const BorderBox = tw(GrayBorderBox)`
  w-full
  rounded-lg
  p-4
  mb-2
  cursor-pointer
  hover:bg-gray-100
 
`

const InfoBox = tw(Vertical)`
  flex-1
`

const GemBox = tw.div`
  rounded-full
  bg-orange-100
`

const ClaimItem: FC<{ claim: ClaimQuestType }> = ({ claim }) => {
  const [showModal, setShowModal] = useState<boolean>(false)

  const onClose = () => {
    setShowModal(false)
  }

  return (
    <BorderBox onClick={() => setShowModal(true)}>
      <Horizontal>
        <CircularImage
          width={64}
          height={64}
          src={claim.quest.community.logo_url || StorageConst.COMMUNITY_DEFAULT.src}
        />
        <Gap width={4} />
        <InfoBox>
          <Status claimStatus={claim.status!}>
            {ClaimedQuestMap.get(claim.status! as ClaimedQuestStatus)}
          </Status>
          <Gap height={2} />
          <TextBase>{claim.quest.title}</TextBase>
        </InfoBox>
        <Horizontal>
          <GemBox>
            <Image width={18} height={18} src={StorageConst.GEM.src} />
          </GemBox>
          <Gap width={1} />
          <TextSm>{claim.quest.points}</TextSm>
        </Horizontal>
      </Horizontal>
      <BasicModal
        title={claim.quest.title}
        isOpen={showModal}
        onClose={onClose}
        styled='!w-[780px]'
      >
        <ClaimHistoryDetail claim={claim} />
      </BasicModal>
    </BorderBox>
  )
}

export default ClaimItem
