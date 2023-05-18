import { FunctionComponent } from 'react'

import Image from 'next/image'
import toast from 'react-hot-toast'
import tw from 'twin.macro'

import { StorageConst } from '@/constants/storage.const'
import { NegativeButton, PositiveButton } from '@/widgets/button'
import {
  Horizontal,
  HorizontalStartCenter,
  Vertical,
} from '@/widgets/orientation'
import { Label, NormalText, PrimaryText } from '@/widgets/text'
import { CheckIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'

const Wrap = tw(Vertical)`
  gap-6
  p-6
`

const Main = tw(Horizontal)`
  w-full
  h-full
  gap-5
`

const LeftSide = tw(Vertical)`
  p-5
  gap-3
  w-2/3
  border
  border-solid
  border-gray-300
  rounded-lg
`

const RightSide = tw(Vertical)`
  w-1/3
  gap-6
`

const RewardBox = tw(Vertical)`
  p-3
  border
  border-solid
  border-gray-300
  rounded-lg
  w-full
  gap-3
`

const CoinBox = tw(HorizontalStartCenter)`
  gap-3
  text-lg
  font-medium
  text-success
`

const WarningBox = tw(Horizontal)`
  px-6
  py-3
  bg-warning-50
  border
  border-solid
  border-warning-300
  rounded-lg
  w-full
  text-lg
  font-normal
  text-gray-600
  gap-2
  items-center
`

const InviteCommunity: FunctionComponent<{}> = () => {
  const onCopy = () => {
    navigator.clipboard.writeText('dsadsada')
    toast('Copied!', {
      icon: '👏',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    })
  }

  return (
    <Wrap>
      <WarningBox>
        <ExclamationCircleIcon className='text-warning-700 h-7 w-7' />
        {'You must have a wallet address in order to claim this reward.'}
        <PrimaryText size='lg' isHover>
          {'Update your wallet (only Polygon).'}
        </PrimaryText>
      </WarningBox>
      <Main>
        <LeftSide>
          <Label>{'MISSION 🎯'}</Label>
          <NormalText>
            {'Here is the invitation code required to create a new project on XQuest. Please kindly' +
              ' share this code with the project owner in order to proceed with the project setup.' +
              ' By doing so, you will be eligible to claim the corresponding reward.'}
          </NormalText>
          <Label>{'GUIDE 📚'}</Label>
          <NormalText>
            {'Copy code and share with your friend when they create project. '}
          </NormalText>
          <NegativeButton onClick={onCopy}>
            {'aB3dKfG7'}
            <CheckIcon className='w-5 h-5 text-success' />
          </NegativeButton>
          <Label>{'SUBMISSION 📝'}</Label>
          <NormalText>{'Auto validate'}</NormalText>
        </LeftSide>
        <RightSide>
          <RewardBox>
            <Label>{'REWARD'}</Label>
            <CoinBox>
              <Image
                width={30}
                height={30}
                src={StorageConst.COIN.src}
                alt={StorageConst.COIN.alt}
              />
              {'50'}
            </CoinBox>
          </RewardBox>
          <PositiveButton isFull>{'Claim Reward'}</PositiveButton>
        </RightSide>
      </Main>
    </Wrap>
  )
}

export default InviteCommunity
