import { FC, useEffect, useState } from 'react'

import { toast } from 'react-hot-toast'
import tw from 'twin.macro'

import { getWalletAddressApi } from '@/api/communitiy'
import { ColorEnum } from '@/constants/common.const'
import { ColorBox } from '@/modules/quest/view-quest/twitter/mini-widgets'
import CommunityStore from '@/store/local/community'
import { VerticalFullWidth } from '@/widgets/orientation'
import { SmallSpinner } from '@/widgets/spinner'
import { HeaderText3 } from '@/widgets/text'

const GapVertical = tw(VerticalFullWidth)`gap-2 pb-5`

const AddressWallet: FC = () => {
  const [walletAddress, setAddressWallet] = useState<string>()
  const [loading, setLoading] = useState<boolean>(true)

  const community = CommunityStore.useStoreState((state) => state.selectedCommunity)

  useEffect(() => {
    getCommunityAddressWallet()
  }, [])

  const getCommunityAddressWallet = async () => {
    try {
      const { error, data } = await getWalletAddressApi(community.handle)
      if (error) {
        toast.error(error)
        return
      }

      if (data) {
        setAddressWallet(data.wallet_address)
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const AddressBox: FC = () => {
    if (loading) {
      return <SmallSpinner />
    }
    return <ColorBox boxColor={ColorEnum.PRIMARY}>{walletAddress}</ColorBox>
  }

  return (
    <GapVertical>
      <HeaderText3>{'COMMUNITY ADDRESS WALLET'}</HeaderText3>
      <AddressBox />
    </GapVertical>
  )
}

export default AddressWallet
