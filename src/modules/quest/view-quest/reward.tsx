import { StorageConst } from '@/constants/storage.const'
import { Gap } from '@/styles/common.style'
import { QuestType } from '@/utils/type'
import { ThinBorderBox } from '@/widgets/box'
import { Image } from '@/widgets/image'
import { Horizontal, Vertical } from '@/widgets/orientation'
import { Label, RewardText } from '@/widgets/text'
import { FunctionComponent } from 'react'
import tw from 'twin.macro'

const FrameShape = tw(Vertical)`
  px-4
  w-1/3
  h-full
  justify-start
  items-end
`

const BorderBox = tw(ThinBorderBox)`
  w-full
  px-6
  gap-4
`

const RewardRow = tw(Horizontal)`
  items-center
`

const QuestReward: FunctionComponent<{
  quest: QuestType
}> = ({ quest }) => {
  return (
    <FrameShape>
      <BorderBox>
        <Label>{'REWARD'}</Label>
        <Gap height={2} />

        <RewardRow>
          <Image width={40} height={40} src={StorageConst.GEM.src} alt={StorageConst.GEM.alt} />
          <RewardText>
            {`${quest.rewards?.length && quest.rewards[0].data.points} Points`}
          </RewardText>
        </RewardRow>
      </BorderBox>
    </FrameShape>
  )
}

export default QuestReward
