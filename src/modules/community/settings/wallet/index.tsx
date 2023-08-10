import { HorizontalFullWidthCenter } from '@/admin-portal/modules/referrals/mini-widget'
import StorageConst from '@/constants/storage.const'
import { PositiveButton } from '@/widgets/buttons'
import { Horizontal, VerticalFullWidth } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { TextBase, TextSm, TextXl } from '@/widgets/text'
import { Image } from '@/widgets/image'
import { FC, useEffect, useState } from 'react'
import tw from 'twin.macro'
import { onCopy } from '@/utils/helper'
import { getWalletAddressApi } from '@/api/communitiy'
import CommunityStore from '@/store/local/community'
import { ErrorCodes } from '@/constants/code.const'
import walletController from '@/modules/wallet/services/wallet-controller'
import { getShortAddress } from '@/utils/convert'

const VerticalFrame = tw(VerticalFullWidth)`
  w-2/3
  max-2xl:px-12
  max-lg:px-6
  max-md:w-full
  py-4
  px-36
`

const Border = tw(Horizontal)`
  w-full
  p-6
  rounded-lg
  border-2
`

const WalletBox = tw.div`
  text-center
  rounded-lg
  border-2
  w-full
  divide-y
`

const WalletItem = tw(TextSm)`
  p-6
  py-8
  gap-0
`
const Description = tw(TextSm)`
  px-20
  py-5
`

const AddressBox = tw(HorizontalFullWidthCenter)`
  cursor-pointer
  gap-2
`

const Wallet: FC = () => {
  const community = CommunityStore.useStoreState((state) => state.selectedCommunity)
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [balance, setBalance] = useState<number>(0)

  const fetchBalance = async () => {
    const resp = await getWalletAddressApi(community.handle)
    if (resp.code === ErrorCodes.NOT_ERROR && resp.data) {
      setWalletAddress(resp.data.wallet_address)
      const balance = await walletController.getBalance(resp.data.wallet_address)
      if (balance) setBalance(balance)
    }
  }

  const addMoreBalance = async () => {
    await walletController.deposit(walletAddress)
  }

  useEffect(() => {
    fetchBalance()
  }, [])
  return (
    <HorizontalFullWidthCenter>
      <VerticalFrame>
        <Border>
          <VerticalFullWidth>
            <WalletBox>
              <WalletItem>
                <TextSm>Wallet address:</TextSm>
                <Gap height={2} />
                <AddressBox onClick={() => onCopy(walletAddress)}>
                  <TextBase className='font-bold'>{getShortAddress(walletAddress)}</TextBase>
                  <Image
                    width={25}
                    height={25}
                    src={StorageConst.COPY.src}
                    alt={StorageConst.COPY.alt}
                  />
                  <Image
                    width={25}
                    height={25}
                    src={StorageConst.USDT.src}
                    alt={StorageConst.USDT.alt}
                  />
                </AddressBox>
              </WalletItem>
              <WalletItem>
                <TextSm>Balance:</TextSm>
                <Gap height={2} />
                <TextXl className='text-success-500'>{balance} USDT</TextXl>
              </WalletItem>
            </WalletBox>
            <Gap height={5} />
            <Description>
              Wallet address and account balance information. You can add USDT, track reward
              progress for users in quests with USDT rewards.
            </Description>
            <Gap height={2} />
            <HorizontalFullWidthCenter>
              <PositiveButton onClick={() => addMoreBalance()}>ADD MORE USDT</PositiveButton>
            </HorizontalFullWidthCenter>
            <Gap height={3} />
            <HorizontalFullWidthCenter className='gap-1'>
              <TextSm> For refunds, please</TextSm>
              <TextSm className='text-info-500'>contact the admin.</TextSm>
            </HorizontalFullWidthCenter>
          </VerticalFullWidth>
        </Border>
      </VerticalFrame>
    </HorizontalFullWidthCenter>
  )
}

export default Wallet
