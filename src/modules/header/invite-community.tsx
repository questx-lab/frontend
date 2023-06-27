import { FC, useState } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import toast from 'react-hot-toast'
import tw from 'twin.macro'

import { claimReferralApi, getMyReferralInfoApi } from '@/api/reward'
import { ErrorCodes } from '@/constants/code.const'
import StorageConst from '@/constants/storage.const'
import { signWallet } from '@/handler/auth/metamask'
import { GlobalStoreModel } from '@/store/store'
import { RefferalType, UserType } from '@/types'
import { NegativeButton, PositiveButton } from '@/widgets/buttons'
import { InputBox } from '@/widgets/form'
import { Image } from '@/widgets/image'
import { Horizontal, HorizontalStartCenter, Vertical, VerticalCenter } from '@/widgets/orientation'
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
  max-sm:flex-col
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
  max-sm:w-full
`

const RightSide = tw(Vertical)`
  w-1/3
  gap-6
  max-sm:w-full
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
  max-sm:flex-col
  max-sm:items-start
`

enum Screen {
  INFO_REWARD,
  ADDRESS_WALLET,
}

const AddressWallet: FC = () => {
  // data
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)
  const [address, setAddress] = useState<string>('')

  // action
  const setReferral = useStoreActions<GlobalStoreModel>((action) => action.setReferral)

  // handler
  const onClaim = () => {
    if (address !== '') {
      summitClaim(address)
    } else {
      summitClaim(user.wallet_address!)
    }
  }

  const summitClaim = async (address: string) => {
    try {
      const result = await claimReferralApi(address)
      if (result.error) {
        toast.error(result.error)
      }

      if (result.code === ErrorCodes.NOT_ERROR) {
        toast.success('Claim Reward Successful')
      }
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
      <InputBox disabled block defaultValue={user.wallet_address} />
      <Label>{'ENTER THE OTHER WALLET ADDRESS THAT YOU WANT TO CLAIM'}</Label>
      <InputBox onChange={(e) => setAddress(e.target.value)} />
      <PositiveButton isFull onClick={onClaim}>
        {'Claim Reward'}
      </PositiveButton>
    </WalletMain>
  )
}

const InfoReward: FC<{ setScreen: (e: number) => void }> = ({ setScreen }) => {
  // data
  const user: UserType | undefined = useStoreState<GlobalStoreModel>((state) => state.user)
  const referral: RefferalType = useStoreState<GlobalStoreModel>((state) => state.referral)
  let block = true

  if (!user) {
    return <></>
  }

  // handler
  const onCopy = () => {
    if (user.referral_code) {
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
    user.wallet_address !== '' &&
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
        <NormalText>{'Copy code and share with your friend when they create project. '}</NormalText>
        <NegativeButton onClick={onCopy}>
          {user.referral_code}
          <CheckIcon className='w-5 h-5 text-success' />
        </NegativeButton>
        <Label>{'SUBMISSION 📝'}</Label>
        <NormalText>{'Auto validate'}</NormalText>
      </LeftSide>
      <RightSide>
        <RewardBox>
          <Label>{'REWARD'}</Label>
          <CoinBox>
            <Image width={30} height={30} src={StorageConst.USDT.src} alt={StorageConst.USDT.alt} />
            {(referral.total_claimable_communities ?? 0) * (referral.reward_amount ?? 0)}
          </CoinBox>
        </RewardBox>
        <PositiveButton isFull block={block} onClick={() => setScreen(Screen.ADDRESS_WALLET)}>
          {'Claim Reward'}
        </PositiveButton>
      </RightSide>
    </Main>
  )
}

const InviteCommunity: FC<{}> = () => {
  // data
  const [screen, setScreen] = useState<number>(Screen.INFO_REWARD)
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)

  // handler
  const RenderScreen: FC = () => {
    if (screen === Screen.ADDRESS_WALLET) {
      return <AddressWallet />
    }

    return <InfoReward setScreen={setScreen} />
  }

  const onLinkWallet = async () => {
    try {
      await signWallet()
    } catch (err) {
      // Do nothing here.
    }
  }

  if (!user) {
    return <></>
  }

  const WarningWallet: FC = () => {
    if (user && user.wallet_address !== '') {
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
