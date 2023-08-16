import { FC, useState } from 'react'

import DatePicker from 'react-datepicker'
import { toast } from 'react-hot-toast'
import tw from 'twin.macro'

import { createLotteryEventApi } from '@/api/loterry'
import PrizeItem from '@/modules/lottery/owner/prize-item'
import CommunityStore from '@/store/local/community'
import CreateLotteryStore, { initPrize } from '@/store/local/create-lottery'
import { CreateLotteryReq } from '@/types/lottery'
import { FormatTime } from '@/utils/time'
import { PositiveButton } from '@/widgets/buttons'
import { InputBox } from '@/widgets/form'
import {
  HorizontalBetween,
  HorizontalBetweenCenterFullWidth,
  HorizontalFullWidth,
  VerticalFullWidth,
} from '@/widgets/orientation'
import { MediumTextSm, MediumTextXl, TextSm } from '@/widgets/text'
import { PlusIcon } from '@heroicons/react/24/outline'
import { Tooltip } from '@material-tailwind/react'
import { Gap } from '@/widgets/separator'

const Border = tw(VerticalFullWidth)`
  border
  border-solid
  border-gray-200
  p-5
  rounded-lg
  gap-5
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

const GapVertical = tw(VerticalFullWidth)`gap-2`

const Gap6Vertical = tw(VerticalFullWidth)`gap-6`

const AddReward = tw(TextSm)`
  text-info-500
  font-bold
  cursor-pointer
`

const EndHorizontal = tw(HorizontalFullWidth)`justify-end`

const FormLottery: FC = () => {
  const [loading, setLoading] = useState<boolean>(false)

  // data
  const prizes = CreateLotteryStore.useStoreState((state) => state.prizes)
  const community = CommunityStore.useStoreState((state) => state.selectedCommunity)
  const startTime = CreateLotteryStore.useStoreState((state) => state.startTime)
  const endTime = CreateLotteryStore.useStoreState((state) => state.endTime)
  const maxTickets = CreateLotteryStore.useStoreState((state) => state.maxTickets)
  const poinPerTicket = CreateLotteryStore.useStoreState((state) => state.poinPerTicket)

  // action
  const setPrizes = CreateLotteryStore.useStoreActions((action) => action.setPrizes)
  const setStartTime = CreateLotteryStore.useStoreActions((action) => action.setStartTime)
  const setEndTime = CreateLotteryStore.useStoreActions((action) => action.setEndTime)
  const setMaxTickets = CreateLotteryStore.useStoreActions((action) => action.setMaxTickets)
  const setPointPerTicket = CreateLotteryStore.useStoreActions((action) => action.setPointPerTicket)

  const addPrize = () => {
    setPrizes([...prizes, initPrize])
  }

  const renderPrizes = prizes.map((_, index) => <PrizeItem key={index} index={index} />)

  const onCreateLottery = async () => {
    setLoading(true)
    try {
      const payload: CreateLotteryReq = {
        community_handle: community.handle,
        start_time: FormatTime(startTime),
        end_time: FormatTime(endTime),
        max_tickets: maxTickets,
        point_per_ticket: poinPerTicket,
        prizes: prizes,
      }

      const { error } = await createLotteryEventApi(payload)

      if (error) {
        toast.error(error)
      } else {
        toast.success('Create lottery event successfully')
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <Gap6Vertical>
      <Border>
        <MediumTextXl>{'Ticket'}</MediumTextXl>
        <Border>
          <GapVertical>
            <MediumTextSm>{'Max Ticket'}</MediumTextSm>
            <InputBox
              value={maxTickets}
              onChange={(e) => setMaxTickets(parseInt(e.target.value || '0', 10))}
            />
          </GapVertical>
          <GapVertical>
            <MediumTextSm>{'Point Per Ticket'}</MediumTextSm>
            <InputBox
              value={poinPerTicket}
              onChange={(e) => setPointPerTicket(parseInt(e.target.value || '0', 10))}
            />
          </GapVertical>
          <HorizontalBetween>
            <GapVertical>
              <MediumTextSm>{'Start Time'}</MediumTextSm>
              <Picker
                locale='en'
                selected={startTime}
                onChange={(date) => {
                  if (date) {
                    setStartTime(date)
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
            <Gap width={10} />
            <GapVertical>
              <MediumTextSm>{'End Time'}</MediumTextSm>
              <Picker
                locale='en'
                selected={endTime}
                onChange={(date) => {
                  if (date) {
                    setEndTime(date)
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
          </HorizontalBetween>
        </Border>
      </Border>
      <GapVertical>
        <Border>
          <HorizontalBetweenCenterFullWidth>
            <MediumTextXl>{'Reward'}</MediumTextXl>
          </HorizontalBetweenCenterFullWidth>
          {renderPrizes}
        </Border>
      </GapVertical>
      <AddReward onClick={addPrize}> Add Rewards + </AddReward>
      <EndHorizontal>
        <PositiveButton onClick={onCreateLottery} loading={loading}>
          {'Create Lottery'}
        </PositiveButton>
      </EndHorizontal>
    </Gap6Vertical>
  )
}

export default FormLottery
