import { getWalletAddressApi } from '@/api/communitiy'
import { ErrorCodes } from '@/constants/code.const'
import StorageConst from '@/constants/storage.const'
import CommunityStore from '@/store/local/community'
import { Gap } from '@/widgets/separator'
import { Relative, Padding } from '@/widgets/simple-popup'
import { Label } from '@/widgets/text'
import { FC, useEffect } from 'react'
import tw from 'twin.macro'
import { Image } from '@/widgets/image'

const AmountBox = tw.input`
  w-full
  border
  border-[1px]
  border-solid
  border-gray-300
  p-2
  pl-10
  rounded-lg
`
const Absolute = tw.div`
  absolute
`

const Step3: FC = () => {
  const community = CommunityStore.useStoreState((state) => state.selectedCommunity)

  const setWalletAddress = CommunityStore.useStoreActions((action) => action.setWalletAddress)
  const amount = CommunityStore.useStoreState((state) => state.depositAmount)
  const setAmount = CommunityStore.useStoreActions((action) => action.setDepositAmount)

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
    <Padding>
      <Label className='py-1'>Amount</Label>
      <Relative className='w-full'>
        <AmountBox
          type='number'
          onChange={(e: any) => setAmount(parseInt(e.target.value ?? '0'))}
          defaultValue={amount}
        />
        <Absolute className='top-1.5 left-2'>
          <Image width={30} height={30} src={StorageConst.USDT.src} alt={StorageConst.USDT.alt} />
        </Absolute>
      </Relative>
      <Gap height={1} />
    </Padding>
  )
}

export default Step3
