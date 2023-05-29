import { QuestRewards } from '@/constants/common.const'
import { StorageConst } from '@/constants/storage.const'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { Gap } from '@/styles/common.style'
import { ThinBorderBox } from '@/widgets/box'
import { Image } from '@/widgets/image'
import { InputBox } from '@/widgets/input'
import { Vertical } from '@/widgets/orientation'
import { Label, UnderlinedText } from '@/widgets/text'
import TypesSelection from '@/widgets/types-selection'
import { FunctionComponent } from 'react'
import tw from 'twin.macro'

const FrameShape = tw(Vertical)`
  py-8
  px-8
  w-1/3
  h-full
  justify-start
  items-end
`

const FullWidthInput = tw(InputBox)`
  w-full
`

const BorderBox = tw(ThinBorderBox)`
  w-full
  px-6
  gap-4
`

const QuestReward: FunctionComponent = () => {
  // Data
  const activeReward = NewQuestStore.useStoreState((state) => state.activeReward)

  // Actions
  const onActiveRewardChanged = NewQuestStore.useStoreActions((actions) => actions.setActiveReward)
  const onPointRewardChanged = NewQuestStore.useStoreActions((actions) => actions.setPointReward)

  return (
    <FrameShape>
      <BorderBox>
        <Label>{'REWARD'}</Label>
        <Gap height={2} />

        <TypesSelection
          list={QuestRewards}
          activeFunc={(item, index) => index === activeReward}
          onClick={(item, index) => onActiveRewardChanged(index)}
          itemView={(item: string) => item}
        />
        <Gap height={6} />

        <FullWidthInput
          full
          onChange={(e) => onPointRewardChanged(parseFloat(e.target.value ?? '0'))}
          leftChild={
            <>
              <Image width={30} height={30} src={StorageConst.GEM.src} alt={StorageConst.GEM.alt} />
              <Gap width={2} />
            </>
          }
          type='number'
          min={0}
          defaultValue={'100'}
        />
        <Gap height={6} />

        <UnderlinedText>{'Learn more here about how the levels are calculated.'}</UnderlinedText>
      </BorderBox>
    </FrameShape>
  )
}

export default QuestReward
