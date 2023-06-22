import { FC } from 'react'

import { useStoreState } from 'easy-peasy'
import tw from 'twin.macro'

import { GlobalStoreModel } from '@/store/store'
import LuckyBoxStore from '@/store/townhall/lucky-box'
import RoomStore, { ActiveSidebarTab } from '@/store/townhall/room'
import { UserType } from '@/types'
import { ButtonTypeEnum, PositiveButton } from '@/widgets/buttons'
import {
  HorizontalBetweenCenterFullWidth,
  HorizontalFullWidth,
  Vertical,
} from '@/widgets/orientation'
import { TextBase, TextXl } from '@/widgets/text'
import { GiftIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Tooltip } from '@material-tailwind/react'

const Frame = tw.div`
  absolute
  right-[80px]
  w-96
  bg-white
  rounded-lg
  overflow-y-scroll
`

const TextInput = tw.input`
  w-full
  border
  border-[1px]
  border-solid
  border-gray-300
  p-2
  rounded-lg
`

const GapFullVertical = tw(Vertical)`
  gap-4
  w-full
  h-full
  p-3
`

const GapVertical = tw(Vertical)`
  gap-2
  w-full
`

const TextBold = tw(TextBase)`
  font-medium
`

const ButtonFrame = tw(HorizontalFullWidth)`
  justify-end
  items-center
  gap-2
`

const LuckyBoxFrame: FC<{ isShow: boolean }> = ({ isShow }) => {
  // data
  const numberOfBox = LuckyBoxStore.useStoreState((state) => state.numberOfBox)
  const point = LuckyBoxStore.useStoreState((state) => state.point)

  // action
  const setNumberOfBox = LuckyBoxStore.useStoreActions((action) => action.setNumberOfBox)
  const setPoint = LuckyBoxStore.useStoreActions((action) => action.setPoint)
  const setActiveTab = RoomStore.useStoreActions((action) => action.setActiveTab)

  if (!isShow) {
    return <></>
  }

  const onClose = () => {
    setActiveTab(ActiveSidebarTab.NONE)
  }

  return (
    <Frame>
      <GapFullVertical>
        <HorizontalBetweenCenterFullWidth>
          <TextXl>{'Lucky Box'}</TextXl>
          <XMarkIcon onClick={onClose} className='w-5 h-5 text-gray-900 cursor-pointer' />
        </HorizontalBetweenCenterFullWidth>
        <GapVertical>
          <TextBold>{'Number of box'}</TextBold>
          <TextInput
            value={numberOfBox}
            type='number'
            onChange={(e) => setNumberOfBox(parseInt(e.target.value ?? '0'))}
          />
        </GapVertical>
        <GapVertical>
          <TextBold>{'Point'}</TextBold>
          <TextInput
            value={point}
            type='number'
            onChange={(e) => setPoint(parseInt(e.target.value ?? '0'))}
          />
        </GapVertical>
        <ButtonFrame>
          <PositiveButton type={ButtonTypeEnum.NEGATIVE}>{'Cancel'}</PositiveButton>
          <PositiveButton>{'Save'}</PositiveButton>
        </ButtonFrame>
      </GapFullVertical>
    </Frame>
  )
}

const LuckyBoxSetting: FC<{ onTabClicked: () => void }> = ({ onTabClicked }) => {
  const activeTab = RoomStore.useStoreState((state) => state.activeTab)
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)
  const community = RoomStore.useStoreState((state) => state.community)

  if (user && community && user.id !== community.created_by) {
    return <></>
  }

  return (
    <>
      <Tooltip content={'Lucky Box Setting'} placement='right'>
        <Vertical>
          <GiftIcon onClick={onTabClicked} className='cursor-pointer w-7 h-7 text-gray-900' />
        </Vertical>
      </Tooltip>
      <LuckyBoxStore.Provider>
        <LuckyBoxFrame isShow={activeTab === ActiveSidebarTab.LUCKY_BOX_SETTING} />
      </LuckyBoxStore.Provider>
    </>
  )
}

export default LuckyBoxSetting
