import { FC, useState } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import Exchange from '@/modules/wallet/deposit-modal/exchange'
import PersonalWallet from '@/modules/wallet/deposit-modal/personal-wallet'
import BasicModal from '@/widgets/modal/basic'
import { HorizontalFullWidth } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'

const Tab = styled.div<{
  active: boolean
}>(({ active }) => {
  const style = [
    tw`
      rounded-lg
      px-3
      py-1
      cursor-pointer
    `,
  ]
  if (active) style.push(tw`text-info-500 bg-info-100`)
  else style.push(tw`text-gray-500 bg-gray-100`)

  return style
})

const TabList = tw(HorizontalFullWidth)`
  py-2
  px-5
`
enum DepositTab {
  PERSONAL_WALLET = 'Use Personal Wallet',
  EXCHANGE = 'Exchange',
}

const depositTabs = [DepositTab.PERSONAL_WALLET, DepositTab.EXCHANGE]

const DepositModal: FC<{
  open: boolean
  onClose: () => void
}> = ({ open, onClose }) => {
  const [currentTab, setCurrentTab] = useState<string>(DepositTab.PERSONAL_WALLET)

  const renderTab = () => {
    switch (currentTab) {
      case DepositTab.PERSONAL_WALLET:
        return <PersonalWallet onClose={onClose} />
      case DepositTab.EXCHANGE:
        return <Exchange />
    }
  }
  return (
    <BasicModal
      title={`Add USDT`}
      isOpen={open}
      onClose={onClose}
      styled={`flex flex-col !justify-start !items-start !w-[600px] !h-[500px]`}
    >
      <TabList>
        {depositTabs.map((tab) => (
          <>
            <Tab active={tab === currentTab} onClick={() => setCurrentTab(tab)}>
              {tab}
            </Tab>
            <Gap width={2} />
          </>
        ))}
      </TabList>
      {renderTab()}
    </BasicModal>
  )
}

export default DepositModal
