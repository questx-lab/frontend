import { FunctionComponent, useState } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import Image from 'next/image'
import toast from 'react-hot-toast'
import tw from 'twin.macro'

import { claimReferralApi, getMyReferralInfoApi } from '@/app/api/client/reward'
import { getUserApi } from '@/app/api/client/user'
import { StorageConst } from '@/constants/storage.const'
import { signWallet } from '@/handler/auth/metamask'
import { GlobalStoreModel } from '@/store/store'
import { InputBox } from '@/styles/input.style'
import { setUserLocal } from '@/utils/helper'
import { RefferalType, UserType } from '@/utils/type'
import { NegativeButton, PositiveButton } from '@/widgets/button'
import {
  Horizontal,
  HorizontalStartCenter,
  Vertical,
  VerticalCenter,
} from '@/widgets/orientation'
import { Label, NormalText, PrimaryText } from '@/widgets/text'
import { CheckIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'

const Wrap = tw(VerticalCenter)`
  gap-6
  p-6
  w-full
`

const Main = tw(Horizontal)`
  w-full
  h-full
  gap-5
`

const WalletMain = tw(VerticalCenter)`
  w-2/3
  gap-4
  items-start
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

enum Screen {
  INFO_REWARD,
  ADDRESS_WALLET,
}

const AddressWallet: FunctionComponent = () => {
  // data
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)
  const [address, setAddress] = useState<string>('')

  // action
  const setReferral = useStoreActions<GlobalStoreModel>(
    (action) => action.setReferral
  )

  // handler
  const onClaim = () => {
    if (address !== '') {
      summitClaim(address)
    } else {
      summitClaim(user.address!)
    }
  }

  const summitClaim = async (address: string) => {
    try {
      await claimReferralApi(address)
      toast.success('Successful')
      getMyReferralInfo()
    } catch (error) {
      toast.error('Network error')
    }
  }

  const getMyReferralInfo = async () => {
    try {
      const referral = await getMyReferralInfoApi()
      if (!referral.error) {
        setReferral(referral.data)
      }
    } catch (error) {}
  }

  return (
    <WalletMain>
      <Label>{'DEFAULT WALLET ADDRESS'}</Label>
      <InputBox disabled block defaultValue={user.address} />
      <Label>{'ENTER THE OTHER WALLET ADDRESS THAT YOU WANT TO CLAIM'}</Label>
      <InputBox onChange={(e) => setAddress(e.target.value)} />
      <PositiveButton isFull onClick={onClaim}>
        {'Claim Reward'}
      </PositiveButton>
    </WalletMain>
  )
}

const InfoReward: FunctionComponent<{ setScreen: (e: number) => void }> = ({
  setScreen,
}) => {
  // data
  const user: UserType | undefined = useStoreState<GlobalStoreModel>(
    (state) => state.user
  )
  const referral: RefferalType = useStoreState<GlobalStoreModel>(
    (state) => state.referral
  )
  let block = true

  // handler
  const onCopy = () => {
    if (user && user.referral_code) {
      navigator.clipboard.writeText(user.referral_code)
      toast('Copied!', {
        icon: '👏',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      })
    }
  }

  if (
    user &&
    user.address !== '' &&
    referral.total_claimable_communities &&
    referral.total_claimable_communities !== 0
  ) {
    block = false
  }

  return (
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
          {user && user.referral_code}
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
            {(referral.total_claimable_communities ?? 0) *
              (referral.reward_amount ?? 0)}
          </CoinBox>
        </RewardBox>
        <PositiveButton
          isFull
          block={block}
          onClick={() => setScreen(Screen.ADDRESS_WALLET)}
        >
          {'Claim Reward'}
        </PositiveButton>
      </RightSide>
    </Main>
  )
}

const InviteCommunity: FunctionComponent<{}> = () => {
  // data
  const [screen, setScreen] = useState<number>(Screen.INFO_REWARD)
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)

  // action
  const setUser = useStoreActions<GlobalStoreModel>((action) => action.setUser)

  // handler
  const RenderScreen: FunctionComponent = () => {
    if (screen === Screen.ADDRESS_WALLET) {
      return <AddressWallet />
    }

    return <InfoReward setScreen={setScreen} />
  }

  const onLinkWallet = async () => {
    try {
      await signWallet()
      await getUserData()
    } catch (err) {
      // Do nothing here.
    }
  }

  const getUserData = async () => {
    try {
      const user = await getUserApi()
      if (user.error) {
        toast.error(user.error)
      } else {
        if (user.data) {
          setUser(user.data)
          setUserLocal(user.data)
        }
      }
    } catch (error) {}
  }

  const WarningWallet: FunctionComponent = () => {
    if (user && user.address !== '') {
      return <></>
    }

    return (
      <WarningBox>
        <ExclamationCircleIcon className='text-warning-700 h-7 w-7' />
        {'You must have a wallet address in order to claim this reward.'}
        <PrimaryText size='lg' isHover onClick={onLinkWallet}>
          {'Update your wallet.'}
        </PrimaryText>
      </WarningBox>
    )
  }

  return (
    <Wrap>
      <WarningWallet />
      <RenderScreen />
    </Wrap>
  )
}

export default InviteCommunity
