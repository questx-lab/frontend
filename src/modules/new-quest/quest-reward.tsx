import Image from 'next/image'

import { QuestRewards } from '@/constants/project.const'
import { StorageConst } from '@/constants/storage.const'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { Gap } from '@/styles/common.style'
import { LabelInput } from '@/styles/myProjects.style'
import {
  BtnUseT,
  CSideCard,
  ICard,
  ITypeBox,
  PICard,
  PointBox,
  PointInput,
  TypeBox,
  UnderText,
} from '@/styles/questboard.style'

export default function QuestReward() {
  // Data
  const activeReward = NewQuestStore.useStoreState(
    (state) => state.activeReward
  )

  // Actions
  const onActiveRewardChanged = NewQuestStore.useStoreActions(
    (actions) => actions.onActiveRewardChanged
  )
  const onPointRewardChanged = NewQuestStore.useStoreActions(
    (actions) => actions.onPointRewardChanged
  )

  const listRewards = QuestRewards.map((e, i) => (
    <TypeBox
      active={activeReward === i}
      key={i}
      onClick={() => {
        onActiveRewardChanged(i)
      }}
    >
      {e}
    </TypeBox>
  ))

  return (
    <CSideCard>
      <BtnUseT>{'Use Template'}</BtnUseT>
      <Gap height={5} />
      <ICard>
        <PICard>
          <LabelInput>{'REWARD'}</LabelInput>
          <Gap height={2} />
          <ITypeBox>{listRewards}</ITypeBox>
          <Gap height={6} />
          <PointBox>
            <Image
              width={30}
              height={30}
              src={StorageConst.POINT_ICON.src}
              alt={StorageConst.POINT_ICON.alt}
            />
            <Gap width={2} />
            <PointInput
              onChange={(e) =>
                onPointRewardChanged(parseFloat(e.target.value ?? '0'))
              }
              type='number'
              min={1}
              defaultValue={100}
            />
          </PointBox>

          <Gap height={6} />
          <UnderText>
            {'Learn more here about how the levels are calculated.'}
          </UnderText>
        </PICard>
      </ICard>
    </CSideCard>
  )
}
