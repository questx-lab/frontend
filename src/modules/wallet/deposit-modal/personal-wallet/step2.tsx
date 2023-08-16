import { HorizontalFullWidth } from '@/widgets/orientation'
import {
  ActiveOption,
  CheckIconBox,
  ListButton,
  ListOption,
  Relative,
  Title,
  TitleOption,
  UpDown,
} from '@/widgets/simple-popup'
import { FC, Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { getShortAddress } from '@/utils/convert'
import walletController from '@/modules/wallet/services/wallet-controller'
import { Label } from '@/widgets/text'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import CommunityStore from '@/store/local/community'

const ListWalletOption: FC<{ accounts: string[] }> = ({ accounts }) => {
  return (
    <Transition
      as={Fragment}
      leave='transition ease-in duration-100'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <ListOption className='z-50'>
        {accounts &&
          accounts.map((account) => (
            <Listbox.Option key={account} className={ActiveOption} value={account}>
              {({ selected }) => (
                <>
                  <TitleOption selected={selected}>{getShortAddress(account)}</TitleOption>
                  {selected ? (
                    <CheckIconBox>
                      <CheckIcon className='h-5 w-5' aria-hidden='true' />
                    </CheckIconBox>
                  ) : null}
                </>
              )}
            </Listbox.Option>
          ))}
      </ListOption>
    </Transition>
  )
}

const Step2: FC = () => {
  const [accounts, setAccounts] = useState<string[]>([])
  const selectedAccount = CommunityStore.useStoreState((state) => state.selectedAccount)
  const setSelectedAccount = CommunityStore.useStoreActions((action) => action.setSelectedAccount)

  const fetchAccounts = async () => {
    const resp = await walletController.getAccounts()
    setAccounts(resp)
  }

  useEffect(() => {
    fetchAccounts()
  }, [])

  return (
    <>
      <Label className='py-1'> Select Wallet</Label>
      <HorizontalFullWidth>
        <Listbox
          value={selectedAccount}
          onChange={(e) => {
            setSelectedAccount(e)
          }}
        >
          <Relative className='w-full'>
            <ListButton>
              <Title>{getShortAddress(selectedAccount) || 'Choose a account'}</Title>
              <UpDown>
                <ChevronDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
              </UpDown>
            </ListButton>
            <ListWalletOption accounts={accounts} />
          </Relative>
        </Listbox>
      </HorizontalFullWidth>
    </>
  )
}

export default Step2
