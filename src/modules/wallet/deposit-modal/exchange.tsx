import { HorizontalFullWidthCenter } from '@/admin-portal/modules/referrals/mini-widget'
import StorageConst from '@/constants/storage.const'
import { getShortAddress } from '@/utils/convert'
import { Vertical, VerticalFullWidth, VerticalFullWidthCenter } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { TextBase, TextSm } from '@/widgets/text'
import { FC, useEffect, useState } from 'react'
import tw from 'twin.macro'
import { onCopy } from '@/utils/helper'
import { Image } from '@/widgets/image'
import { getWalletAddressApi } from '@/api/communitiy'
import CommunityStore from '@/store/local/community'
import { ErrorCodes } from '@/constants/code.const'

const WarningBox = tw(Vertical)`
  border
  border-solid
  border-gray-200
  p-3
  rounded-lg
  bg-[#F973160D]
  m-5
`

const InfoBox = tw(Vertical)`
  border
  border-solid
  border-gray-200
  p-3
  rounded-lg
  bg-[#0EA5E90D]
  m-5
  mt-0
`

const AddressBox = tw(VerticalFullWidthCenter)`
  cursor-pointer
  gap-2
  border
  border-solid
  border-gray-200
  rounded-lg
  py-5
`

const AddressContainer = tw.div`
  p-5
  m-5 
  mt-0 
  ml-0 
  w-full
`

const Exchange: FC = () => {
  const community = CommunityStore.useStoreState((state) => state.selectedCommunity)
  const [walletAddress, setWalletAddress] = useState<string>('')
  const fetchWalletAddress = async () => {
    const resp = await getWalletAddressApi(community.handle)
    if (resp.code === ErrorCodes.NOT_ERROR && resp.data) {
      setWalletAddress(resp.data.wallet_address)
    }
  }

  useEffect(() => {
    fetchWalletAddress()
  }, [])
  return (
    <VerticalFullWidth>
      <WarningBox>
        You can directly transfer USDT from various exchanges (Binance, Huobi...) to your Avalanche
        (avaxC) wallet on your platform.
        <Gap height={2} />
        Always be cautious and thoroughly review all details before confirming a transaction.
        Transactions on exchanges and blockchain networks are irreversible, so any mistakes could
        result in a loss of funds.
      </WarningBox>
      <Gap height={1} />
      <InfoBox>
        Copy and paste the wallet address below to ensure that you will send the funds to the
        correct address.
      </InfoBox>
      <AddressContainer>
        <AddressBox onClick={() => onCopy(walletAddress)}>
          <TextSm>Wallet address:</TextSm>
          <HorizontalFullWidthCenter>
            <Image
              width={25}
              height={25}
              src={StorageConst.AVALANCHE.src}
              alt={StorageConst.AVALANCHE.alt}
            />
            <TextBase className='font-bold'>{getShortAddress(walletAddress)}</TextBase>
            <Image width={25} height={25} src={StorageConst.COPY.src} alt={StorageConst.COPY.alt} />
            <Image width={25} height={25} src={StorageConst.USDT.src} alt={StorageConst.USDT.alt} />
          </HorizontalFullWidthCenter>
        </AddressBox>
      </AddressContainer>
    </VerticalFullWidth>
  )
}

export default Exchange
