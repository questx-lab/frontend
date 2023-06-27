import { FC, useState } from 'react'

import tw from 'twin.macro'
import { useDebouncedCallback } from 'use-debounce'

import CreateCommunity from '@/modules/create-community'
import CommunityContent from '@/platform/routes/communities/community-content'
import NewCommunityStore from '@/store/local/new-community'
import { SearchInput } from '@/widgets/input/search-input'
import { MainContent } from '@/widgets/layout/layout-with-left-panel'
import BaseModal from '@/widgets/modal/base'
import {
  Horizontal,
  HorizontalBetweenCenterFullWidth,
  VerticalFullWidthCenter,
} from '@/widgets/orientation'
import { Divider } from '@/widgets/separator'
import { Text2xl } from '@/widgets/text'
import { PlusIcon } from '@heroicons/react/24/outline'

const SearchPadding = tw(Horizontal)`
  w-full gap-3 py-3
`

const CreateProjectBtn = tw(Horizontal)`
  gap-2
  border
  border-solid
  border-gray-300
  rounded-lg
  justify-center
  items-center
  py-2
  px-4
  text-lg
  text-black
  font-medium
  cursor-pointer
`

const ModalBox = tw.div`
  flex
  h-full
  items-center
  justify-center
  text-center
  py-6
`

const PaddingVertical = tw(VerticalFullWidthCenter)`
  py-6
  gap-6
`

const GapVertical = tw(VerticalFullWidthCenter)`
  gap-8
`

const NewCommunity: FC<{
  setOpen: (value: boolean) => void
}> = ({ setOpen }) => {
  return (
    <CreateProjectBtn onClick={() => setOpen(true)}>
      <PlusIcon className={'w-5 h-5 text-black'} />
      {'Create Community'}
    </CreateProjectBtn>
  )
}

const Index: FC = () => {
  // hook
  const [isOpen, setOpen] = useState<boolean>(false)
  const [query, setQuery] = useState<string>('')

  // Handler
  const debounced = useDebouncedCallback(async (value: string) => {
    setQuery(value)
  }, 300)

  return (
    <PaddingVertical>
      <MainContent>
        <HorizontalBetweenCenterFullWidth>
          <Text2xl>{'👋 Communities'}</Text2xl>
          <NewCommunity setOpen={setOpen} />
        </HorizontalBetweenCenterFullWidth>
      </MainContent>
      <Divider />
      <MainContent>
        <GapVertical>
          <SearchPadding>
            <SearchInput hint={'Search Community'} onChanged={(value) => debounced(value)} />
          </SearchPadding>
          <CommunityContent query={query} />
        </GapVertical>
      </MainContent>

      <BaseModal isOpen={isOpen}>
        <ModalBox>
          <NewCommunityStore.Provider>
            <CreateCommunity setOpen={setOpen} />
          </NewCommunityStore.Provider>
        </ModalBox>
      </BaseModal>
    </PaddingVertical>
  )
}

export default Index
