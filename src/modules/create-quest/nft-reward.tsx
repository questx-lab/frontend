import { FC, Fragment } from 'react'

import NewQuestStore from '@/store/local/new-quest'
import { CommunityType, NftType } from '@/types/community'
import {
  CheckIconBox,
  ListButton,
  ListOption,
  Relative,
  Title,
  TitleOption,
  UpDown,
} from '@/widgets/simple-popup'
import { TextSm } from '@/widgets/text'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

const activeOption = ({ active }: { active: boolean }) =>
  `relative cursor-default select-none py-2 pl-10 pr-4 cursor-pointer ${
    active ? 'bg-gray-100 text-gray-900' : 'text-gray-900'
  }`

const ListOptionRender: FC<{ nfts: NftType[] }> = ({ nfts }) => {
  return (
    <Transition
      as={Fragment}
      leave='transition ease-in duration-100'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <ListOption>
        {nfts &&
          nfts.map((nft) => (
            <Listbox.Option key={nft.id.toString()} className={activeOption} value={nft}>
              {({ selected }) => (
                <>
                  <TitleOption selected={selected}>{nft.content.name}</TitleOption>
                  <TextSm className='text-info-500'>
                    {`Current balance: ${nft.total_balance - nft.number_of_claimed}`}
                  </TextSm>
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

const NftAction: FC<{ community: CommunityType; nfts: NftType[] }> = ({ community, nfts }) => {
  const selectedNft = NewQuestStore.useStoreState((state) => state.selectedNft)

  const setSelectedNft = NewQuestStore.useStoreActions((action) => action.setSelectedNft)

  return (
    <>
      <Listbox
        value={selectedNft}
        onChange={(e) => {
          setSelectedNft(e)
        }}
      >
        <Relative>
          <ListButton>
            <Title>{selectedNft?.content.name || 'Choose a NFT'}</Title>
            <UpDown>
              <ChevronDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
            </UpDown>
          </ListButton>
          <ListOptionRender nfts={nfts} />
        </Relative>
      </Listbox>
    </>
  )
}

export default NftAction
