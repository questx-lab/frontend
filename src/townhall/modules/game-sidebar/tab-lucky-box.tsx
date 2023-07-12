import { FC, useEffect, useState } from 'react'

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
import phaserGame from '@/townhall/engine/services/game-controller'
import { UserType } from '@/types'
import { RewardTypeEnum, TokenCoinTypeEnum } from '@/types/quest'
import { LuckyBoxReq } from '@/types/townhall'
import { ButtonTypeEnum, PositiveButton } from '@/widgets/buttons'
import { CheckBox, CheckBoxSize } from '@/widgets/input'
import {
  HorizontalBetweenCenterFullWidth,
  HorizontalCenter,
  HorizontalFullWidth,
  Vertical,
  VerticalFullWidth,
} from '@/widgets/orientation'
import { TextBase, TextSm, TextXl } from '@/widgets/text'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Slider } from '@material-tailwind/react'

const Frame = styled.div<{ isMobile: boolean }>(({ isMobile }) => {
  const styles = [
    tw`
      bg-white
      rounded-lg
      overflow-y-scroll
    `,
  ]

  if (!isMobile) {
    styles.push(tw`
      right-[80px]
      w-[480px]
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

const BorderBox = tw(VerticalFullWidth)`
  gap-3
  p-5
  border
  border-solid
  border-gray-200
  rounded-lg
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

const LightTextSm = tw(TextSm)`
  text-gray-700
`

const MediumTextSm = tw(TextSm)`
  font-medium
`

const LuckyBoxFrame: FC<{ isShow: boolean }> = ({ isShow }) => {
  // data
  const numberOfBox = LuckyBoxStore.useStoreState((state) => state.numberOfBox)
  const point = LuckyBoxStore.useStoreState((state) => state.point)
  const usdt = LuckyBoxStore.useStoreState((state) => state.usdt)
  const gameRooms = RoomStore.useStoreState((state) => state.gameRooms)
  const startDate = LuckyBoxStore.useStoreState((state) => state.startDate)
  const duration = LuckyBoxStore.useStoreState((state) => state.duration)

  // action
  const setNumberOfBox = LuckyBoxStore.useStoreActions((action) => action.setNumberOfBox)
  const setPoint = LuckyBoxStore.useStoreActions((action) => action.setPoint)
  const setUsdt = LuckyBoxStore.useStoreActions((action) => action.setUsdt)
  const toggleTab = RoomStore.useStoreActions((action) => action.toggleTab)
  const setStartDate = LuckyBoxStore.useStoreActions((action) => action.setStartDate)
  const setDuration = LuckyBoxStore.useStoreActions((action) => action.setDuration)

  const [isNow, setIsNow] = useState<boolean>(true)
  // If user not selected, time are going to update every second
  const [intervalId, setIntervalId] = useState<any>(null)
  useEffect(() => {
    onUpdateTime()
  }, [])

  const onUpdateTime = () => {
    const id = setInterval(() => {
      setStartDate(new Date())
    }, 1000) // update every second
    setIntervalId(id)
    return () => clearInterval(id)
  }

  registerLocale('en', en)

  if (!isShow) {
    return <></>
  }

  const onClose = () => {
    phaserGame.deRegisterKey()
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
          start_time: moment(startDate).add(1, 'minutes').format('YYYY-MM-DDTHH:mm:ssZ'),
          // Duration = s * 1000000000
          duration: duration * 60 * 1000000000,
          rewards: [
            {
              type: RewardTypeEnum.COIN,
              data: {
                token: TokenCoinTypeEnum.USDT,
                amount: usdt,
              },
            },
          ],
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

  // TODO:
  // Currently, create box including both of point and usdt rewards
  return (
    <Frame isMobile={isMobile}>
      <GapFullVertical>
        <HorizontalBetweenCenterFullWidth>
          <TextXl>{'Lucky Box Setting'}</TextXl>
          <XMarkIcon onClick={onClose} className='w-6 h-6 text-gray-900 cursor-pointer' />
        </HorizontalBetweenCenterFullWidth>
        <LightTextSm>
          {
            'The setting for lucky boxes to appear randomly on the map, where users receive random rewards when opening the box.'
          }
        </LightTextSm>
        <GapVertical>
          <HorizontalBetweenCenterFullWidth>
            <MediumTextSm>{'Lucky Time'}</MediumTextSm>
            <HorizontalCenter>
              <CheckBox
                size={CheckBoxSize.MEDIUM}
                id='inline-checked-checkbox'
                type='checkbox'
                checked={isNow}
                onChange={(e) => {
                  if (e.target.checked) {
                    setStartDate(new Date())
                    setIsNow(true)
                    onUpdateTime()
                  } else {
                    setIsNow(false)
                    if (intervalId) {
                      clearInterval(intervalId)
                    }
                  }
                }}
              />
              <TextSm>{'Now'}</TextSm>
            </HorizontalCenter>
          </HorizontalBetweenCenterFullWidth>
          <Picker
            locale='en'
            selected={startDate ? startDate : new Date()}
            onChange={(date) => {
              if (date) {
                clearInterval(intervalId)
                setStartDate(date)
                setIsNow(false)
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
        <BorderBox>
          <GapVertical>
            <HorizontalBetweenCenterFullWidth>
              <MediumTextSm>{'Duration'}</MediumTextSm>
              <TextBase>{duration}m</TextBase>
            </HorizontalBetweenCenterFullWidth>
            <Slider
              max={360}
              defaultValue={10}
              onChange={(value) => setDuration(parseInt(value.target.value))}
            />
          </GapVertical>
        </BorderBox>
        <BorderBox>
          <GapVertical>
            <MediumTextSm>{'Number of box'}</MediumTextSm>
            <TextInput
              value={numberOfBox}
              type='number'
              min={1}
              max={200}
              onChange={(e) => setNumberOfBox(parseInt(e.target.value ?? '0'))}
            />
          </GapVertical>
        </BorderBox>
        <BorderBox>
          <GapVertical>
            <MediumTextSm>{'POINT REWARD'}</MediumTextSm>
            <TextInput
              value={point}
              type='number'
              onChange={(e) => setPoint(parseInt(e.target.value ?? '0'))}
            />
          </GapVertical>
        </BorderBox>
        <BorderBox>
          <GapVertical>
            <MediumTextSm>{'USDT REWARD'}</MediumTextSm>
            <TextInput
              value={usdt}
              type='number'
              onChange={(e) => setUsdt(parseFloat(e.target.value ?? '0'))}
            />
          </GapVertical>
        </BorderBox>
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

  if (user && community && user.id !== community.created_by) {
    return <></>
  }

  return (
    <>
      <LuckyBoxStore.Provider>
        <LuckyBoxFrame isShow={activeTab === ActiveSidebarTab.LUCKY_BOX_SETTING} />
      </LuckyBoxStore.Provider>
    </>
  )
}

export default TabLuckyBox
