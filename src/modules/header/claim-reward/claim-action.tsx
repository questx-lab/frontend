import { FC, useEffect, useState } from 'react'

import { useStoreState } from 'easy-peasy'
import { toast } from 'react-hot-toast'
import styled from 'styled-components'
import tw from 'twin.macro'

import { HorizontalFullWidthCenter } from '@/admin-portal/modules/referrals/mini-widget'
import { claimLotteryWinnerApi } from '@/api/loterry'
import { ColorEnum } from '@/constants/common.const'
import { ColorBox } from '@/modules/quest/view-quest/twitter/mini-widgets'
import { GlobalStoreModel } from '@/store/store'
import { ClaimableRewardType, UserType } from '@/types'
import { validateAddressWallet } from '@/utils/validation'
import { ButtonTypeEnum, PositiveButton } from '@/widgets/buttons'

const BorderBox = tw(HorizontalFullWidthCenter)`
  gap-2
  border
  border-solid
  border-gray-200
  p-3
  rounded-lg
`

const Input = styled.input<{ isDisable: boolean }>(({ isDisable }) => {
  const styles = [tw`w-full h-full outline-0 ring-0`]

  if (isDisable) {
    styles.push(tw`text-gray-500`)
  } else {
    styles.push(tw`text-gray-900`)
  }

  return styles
})

const AddessWalletBox: FC<{ addressWallet: string; onAddressWallet: (value: string) => void }> = ({
  addressWallet,
  onAddressWallet,
}) => {
  const [disableInput, setDisableInput] = useState<boolean>(true)

  return (
    <BorderBox>
      <Input
        onChange={(e) => onAddressWallet(e.target.value)}
        isDisable={disableInput}
        disabled={disableInput}
        value={addressWallet}
      />
      <PositiveButton
        type={ButtonTypeEnum.POSITVE_BORDER}
        onClick={() => setDisableInput(!disableInput)}
      >
        {disableInput ? 'Change' : 'Save'}
      </PositiveButton>
    </BorderBox>
  )
}

const Description: FC = () => {
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)

  if (!user.wallet_address) {
    return (
      <ColorBox boxColor={ColorEnum.WARNING}>
        {`You don't have a wallet address yet.\n
      Please input address wallet to claim the USDT or connect to Metamask in account setting.`}
      </ColorBox>
    )
  }

  return (
    <ColorBox boxColor={ColorEnum.PRIMARY}>
      {`The USDT will be claimed to your Metamask wallet.\n 
  Do you want to change the wallet
  address?`}
    </ColorBox>
  )
}

const ClaimAction: FC<{ claimRewards: ClaimableRewardType | undefined }> = ({ claimRewards }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [addressWallet, setAddressWallet] = useState<string>('')

  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)

  useEffect(() => {
    if (user && user.wallet_address) {
      setAddressWallet(user.wallet_address)
    }
  }, [user])

  if (!user || !claimRewards) {
    return <></>
  }

  const onClaim = async () => {
    setLoading(true)
    try {
      if (claimRewards) {
        if (addressWallet === '') {
          toast.error('You must have a wallet address')
          return
        }

        if (claimRewards.lottery_winners.length === 0) {
          toast.error('Your wallet is empty')
          return
        }

        const { error } = await claimLotteryWinnerApi(
          claimRewards.lottery_winners.map((result) => result.id),
          addressWallet
        )
        if (error) {
          toast.error(error)
          return
        }

        toast.success('Claim USDT successfully. Please wait a few minutes!')
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const onAddressWallet = (value: string) => {
    setAddressWallet(value)
  }

  return (
    <>
      <Description />
      <AddessWalletBox addressWallet={addressWallet} onAddressWallet={onAddressWallet} />
      {addressWallet !== '' && !validateAddressWallet(addressWallet) && (
        <ColorBox boxColor={ColorEnum.DANGER}>
          {`Please make sure your address wallet is valid.`}
        </ColorBox>
      )}
      <PositiveButton
        block={addressWallet === '' || !validateAddressWallet(addressWallet)}
        loading={loading}
        onClick={onClaim}
      >
        {'Claim USDT'}
      </PositiveButton>
    </>
  )
}

export default ClaimAction
