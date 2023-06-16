import { FC } from 'react'

import tw from 'twin.macro'

import { ClaimedQuestMap, ClaimedQuestStatus } from '@/constants/common.const'
import StorageConst from '@/constants/storage.const'
import { Status } from '@/modules/review-submissions/history/row-item'
import { ClaimQuestType } from '@/types'
import { GrayBorderBox } from '@/widgets/box'
import { CircularImage } from '@/widgets/circular-image'
import { Horizontal, Vertical } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { TextBase } from '@/widgets/text'

const BorderBox = tw(GrayBorderBox)`
  w-full
  rounded-lg
  p-4
`

const InfoBox = tw(Vertical)`
  flex-1
`

const PointBox = tw.div`
  h-full
  flex
  flex-col
  justify-center
  items-center
`

const ClaimItem: FC<{ claim: ClaimQuestType }> = ({ claim }) => {
  return (
    <BorderBox>
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
        <PointBox>
          <TextBase>AAAA</TextBase>
        </PointBox>
      </Horizontal>
    </BorderBox>
  )
}

export default ClaimItem
