import { FC } from 'react'

import en from 'date-fns/locale/en-US'
import { useStoreState } from 'easy-peasy'
import moment from 'moment'
import DatePicker, { registerLocale } from 'react-datepicker'
import { isMobile } from 'react-device-detect'
import { toast } from 'react-hot-toast'
import styled from 'styled-components'
import tw from 'twin.macro'

import { createLuckyBoxApi } from '@/api/townhall'
import { ErrorCodes } from '@/constants/code.const'
import { GlobalStoreModel } from '@/store/store'
import LuckyBoxStore from '@/store/townhall/lucky-box'
import RoomStore, { ActiveSidebarTab } from '@/store/townhall/room'
import { UserType } from '@/types'
import { LuckyBoxReq } from '@/types/townhall'
import { ButtonTypeEnum, PositiveButton } from '@/widgets/buttons'
import {
  HorizontalBetweenCenterFullWidth,
  HorizontalFullWidth,
  Vertical,
} from '@/widgets/orientation'
import { TextBase, TextXl } from '@/widgets/text'
import { GiftIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Slider, Tooltip } from '@material-tailwind/react'

const Frame = styled.div<{ isMobile: boolean }>(({ isMobile }) => {
  const styles = [
    tw`
      absolute
      bg-white
      rounded-lg
      overflow-y-scroll
    `,
  ]

  if (!isMobile) {
    styles.push(tw`
      right-[80px]
      w-96
    `)
  } else {
    styles.push(tw`
      bottom-[160px]
      w-5/6
    `)
  }

  return styles
})

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

const Picker = tw(DatePicker)`
  p-2
  rounded-lg
  outline-none
  border
  border-solid
  border-gray-300
  w-full
  cursor-pointer
`

const LuckyBoxFrame: FC<{ isShow: boolean }> = ({ isShow }) => {
  // data
  const numberOfBox = LuckyBoxStore.useStoreState((state) => state.numberOfBox)
  const point = LuckyBoxStore.useStoreState((state) => state.point)
  const gameRooms = RoomStore.useStoreState((state) => state.gameRooms)
  const startDate = LuckyBoxStore.useStoreState((state) => state.startDate)
  const duration = LuckyBoxStore.useStoreState((state) => state.duration)

  // action
  const setNumberOfBox = LuckyBoxStore.useStoreActions((action) => action.setNumberOfBox)
  const setPoint = LuckyBoxStore.useStoreActions((action) => action.setPoint)
  const toggleTab = RoomStore.useStoreActions((action) => action.toggleTab)
  const setStartDate = LuckyBoxStore.useStoreActions((action) => action.setStartDate)
  const setDuration = LuckyBoxStore.useStoreActions((action) => action.setDuration)

  registerLocale('en', en)

  if (!isShow) {
    return <></>
  }

  const onClose = () => {
    toggleTab(ActiveSidebarTab.NONE)
  }

  const onSubmit = async () => {
    try {
      if (gameRooms.length > 0) {
        const payload: LuckyBoxReq = {
          // TODO: hardcode get first room id
          room_id: gameRooms[0].id,
          number_of_boxes: numberOfBox,
          point_per_box: point,
          start_time: moment(startDate).format('YYYY-MM-DDTHH:mm:ssZ'),
          // Duration = s * 1000000000
          duration: duration * 60 * 1000000000,
        }
        const result = await createLuckyBoxApi(payload)
        if (result.error) {
          toast.error(result.error, {
            className: 'z-100',
          })
        }
        if (result.code === ErrorCodes.NOT_ERROR) {
          toast.success('Set lucky box successful')
        }
      }
    } catch (error) {}
  }

  return (
    <Frame isMobile={isMobile}>
      <GapFullVertical>
        <HorizontalBetweenCenterFullWidth>
          <TextXl>{'Lucky Box'}</TextXl>
          <XMarkIcon onClick={onClose} className='w-5 h-5 text-gray-900 cursor-pointer' />
        </HorizontalBetweenCenterFullWidth>
        <GapVertical>
          <TextBold>{'Start Time'}</TextBold>
          <Picker
            locale='en'
            selected={startDate}
            onChange={(date) => {
              if (date) {
                setStartDate(date)
              }
            }}
            minDate={new Date()}
            showTimeSelect
            timeFormat='HH:mm'
            timeIntervals={5}
            timeCaption='time'
            dateFormat='MMMM d, yyyy h:mm aa'
          />
        </GapVertical>
        <GapVertical>
          <HorizontalBetweenCenterFullWidth>
            <TextBold>{'Duration'}</TextBold>
            <TextBase>{duration}m</TextBase>
          </HorizontalBetweenCenterFullWidth>
          <Slider
            max={360}
            defaultValue={10}
            onChange={(value) => setDuration(parseInt(value.target.value))}
          />
        </GapVertical>
        <GapVertical>
          <TextBold>{'Number of box'}</TextBold>
          <TextInput
            value={numberOfBox}
            type='number'
            min={1}
            max={200}
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
          <PositiveButton onClick={onClose} type={ButtonTypeEnum.NEGATIVE}>
            {'Cancel'}
          </PositiveButton>
          <PositiveButton onClick={onSubmit}>{'Save'}</PositiveButton>
        </ButtonFrame>
      </GapFullVertical>
    </Frame>
  )
}

const TabLuckyBox: FC = () => {
  const activeTab = RoomStore.useStoreState((state) => state.activeTab)
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)
  const community = RoomStore.useStoreState((state) => state.community)
  const toggleTab = RoomStore.useStoreActions((action) => action.toggleTab)
  // const game = phaserGame.scene.keys.game as Game

  if (user && community && user.id !== community.created_by) {
    return <></>
  }

  const onClick = () => {
    toggleTab(ActiveSidebarTab.LUCKY_BOX_SETTING)
    // switch (activeTab) {
    //   case ActiveSidebarTab.NONE:
    //     game.deregisterKeys()
    //     break
    //   case ActiveSidebarTab.LUCKY_BOX_SETTING:
    //     game.registerKeys()
    //     break
    // }
  }

  return (
    <>
      <Tooltip content={'Lucky Box Setting'} placement='right'>
        <Vertical>
          <GiftIcon onClick={onClick} className='cursor-pointer w-7 h-7 text-gray-900' />
        </Vertical>
      </Tooltip>
      <LuckyBoxStore.Provider>
        <LuckyBoxFrame isShow={activeTab === ActiveSidebarTab.LUCKY_BOX_SETTING} />
      </LuckyBoxStore.Provider>
    </>
  )
}

export default TabLuckyBox
