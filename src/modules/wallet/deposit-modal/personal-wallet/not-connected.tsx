import { FC } from 'react'

import tw from 'twin.macro'

import walletController from '@/modules/wallet/services/wallet-controller'
import { Gap } from '@/widgets/separator'

const WarningBox = tw.span`
`

const Link = tw.span`
  text-info-500
  cursor-pointer
`
const NotConnected: FC = () => {
  const install = () => {
    window.open('https://metamask.io/download/', '_blank')
  }

  const connectWallet = () => {
    walletController.connectAccounts()
  }
  return (
    <WarningBox>
      The platform only supports Metamask. If you don't have a Metamask wallet yet, &nbsp;
      <Link onClick={() => install()}>please install </Link>
      it and create an account.
      <Gap height={2} />
      If you already have a Metamask wallet, please&nbsp;
      <Link onClick={() => connectWallet()}>connect your wallet</Link> to utilize this feature.
      <br />
      <br />
      If you don't want to use Metamask, you can transfer USDT token directly to the community
      wallet. The wallet and USDT addresses are in the Exchange tab.
    </WarningBox>
  )
}

export default NotConnected
