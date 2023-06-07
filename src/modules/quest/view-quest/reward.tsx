import { FunctionComponent } from 'react'

import tw from 'twin.macro'

import { StorageConst } from '@/constants/storage.const'
import { BorderBox, RewardRow } from '@/modules/quest/view-quest/mini-widget'
import SubmitClaim from '@/modules/quest/view-quest/submit-claim'
import { QuestType } from '@/types/quest'
import { Image } from '@/widgets/image'
import { Vertical } from '@/widgets/orientation'
import { Label, RewardText } from '@/widgets/text'

const FrameShape = tw(Vertical)`
  px-4
  w-1/3
  h-full
  justify-start
  items-end
`

const QuestReward: FunctionComponent<{
  quest: QuestType
}> = ({ quest }) => {
  return (
    <FrameShape>
      <BorderBox>
        <Label>{'REWARD'}</Label>
        <RewardRow>
          <Image width={40} height={40} src={StorageConst.GEM.src} alt={StorageConst.GEM.alt} />
          <RewardText>{`${quest.points} Points`}</RewardText>
        </RewardRow>
        <SubmitClaim quest={quest} />
      </BorderBox>
    </FrameShape>
  )
}

export default QuestReward
