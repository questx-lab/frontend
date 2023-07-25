import { FC, Fragment, useState } from 'react'

import tw from 'twin.macro'

import { RewardEnum } from '@/constants/common.const'
import CreateLotteryStore from '@/store/local/create-lottery'
import { InputBox } from '@/widgets/form'
import { HorizontalFullWidth, VerticalFullWidth } from '@/widgets/orientation'
import { CheckIconBox, ListOption, TitleOption, UpDown } from '@/widgets/simple-popup'
import { MediumTextSm, TextSm } from '@/widgets/text'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon, XMarkIcon } from '@heroicons/react/24/outline'

const Border = tw(VerticalFullWidth)`
  border
  border-solid
  border-gray-200
  p-5
  rounded-lg
  gap-5
`

const FullWidth = tw.div`
  w-full
`

const ListButton = tw(Listbox.Button)`
  relative
  w-full
  cursor-pointer
  rounded-lg
  bg-white
  py-4
  pl-3
  pr-10
  text-left
  focus:outline-none
  sm:text-sm
  border
  border-solid
  border-primary
`

const GapVertical = tw(VerticalFullWidth)`gap-2`

const EndHorizontal = tw(HorizontalFullWidth)`justify-end`

const Relative = tw.div`
  relative mt-1
`

const activeOption = ({ active }: { active: boolean }) =>
  `relative cursor-default select-none py-2 pl-10 pr-4 cursor-pointer ${
    active ? 'bg-gray-100 text-gray-900' : 'text-gray-900'
  }`

const ListOptionRender: FC<{ rewards: RewardEnum[] }> = ({ rewards }) => {
  return (
    <Transition
      as={Fragment}
      leave='transition ease-in duration-100'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <ListOption>
        {rewards &&
          rewards.map((reward, index) => (
            <Listbox.Option key={index} className={activeOption} value={reward}>
              {({ selected }) => (
                <>
                  <TitleOption selected={selected}>{reward}</TitleOption>
                  {selected ? (
                    <CheckIconBox>
                      <CheckIcon className='h-5 w-5' aria-hidden='true' />
                    </CheckIconBox>
                  ) : null}
                </>
              )}
            </Listbox.Option>
          ))}
      </ListOption>
    </Transition>
  )
}

const PrizeItem: FC<{ index: number }> = ({ index }) => {
  const prizes = CreateLotteryStore.useStoreState((state) => state.prizes)
  const setPrizes = CreateLotteryStore.useStoreActions((action) => action.setPrizes)

  const [reward, setReward] = useState<RewardEnum>(RewardEnum.COIN)

  const onRemove = () => {
    const newPrizes = [...prizes.slice(0, index), ...prizes.slice(index + 1)]
    setPrizes(newPrizes)
  }

  const onChangeAmount = (amount: number) => {
    const cpyPrizes = JSON.parse(JSON.stringify(prizes))
    cpyPrizes[index].available_rewards = amount
    setPrizes([...cpyPrizes])
  }

  const onChangeAmountPerReward = (amount: number) => {
    const cpyPrizes = JSON.parse(JSON.stringify(prizes))
    cpyPrizes[index].rewards[0].data.amount = amount
    setPrizes([...cpyPrizes])
  }

  return (
    <Border>
      <EndHorizontal>
        <XMarkIcon onClick={onRemove} className='w-5 h-5 text-gray-900 cursor-pointer' />
      </EndHorizontal>
      <GapVertical>
        <MediumTextSm>{'Rewards'}</MediumTextSm>
        <FullWidth>
          <Listbox
            value={reward}
            onChange={(e) => {
              setReward(e as RewardEnum)
            }}
          >
            <Relative>
              <ListButton>
                <TextSm>{reward}</TextSm>
                <UpDown>
                  <ChevronUpDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                </UpDown>
              </ListButton>
              <ListOptionRender rewards={[RewardEnum.COIN]} />
            </Relative>
          </Listbox>
        </FullWidth>
      </GapVertical>
      <GapVertical>
        <MediumTextSm>{'Amount Per Reward'}</MediumTextSm>
        <InputBox
          value={prizes[index].rewards[0].data.amount}
          onChange={(e) => {
            onChangeAmountPerReward(parseInt(e.target.value || '0', 10))
          }}
        />
      </GapVertical>
      <GapVertical>
        <MediumTextSm>{'Amount Rewards'}</MediumTextSm>
        <InputBox
          value={prizes[index].available_rewards}
          onChange={(e) => {
            onChangeAmount(parseInt(e.target.value || '0', 10))
          }}
        />
      </GapVertical>
    </Border>
  )
}

export default PrizeItem
