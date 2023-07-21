import { FC, useState } from 'react'

import { useStoreState } from 'easy-peasy'
import tw from 'twin.macro'
import { useDebouncedCallback } from 'use-debounce'

import CreateCommunity from '@/modules/create-community'
import CommunityContent from '@/platform/routes/communities/community-content'
import NewCommunityStore from '@/store/local/new-community'
import { GlobalStoreModel } from '@/store/store'
import { SearchInput } from '@/widgets/input/search-input'
import { MainContent } from '@/widgets/layout/layout-with-left-panel'
import BaseModal from '@/widgets/modal/base'
import {
  Horizontal,
  HorizontalBetweenCenterFullWidth,
  HorizontalCenter,
  VerticalCenter,
  VerticalFullWidthCenter,
} from '@/widgets/orientation'
import { Text2xl } from '@/widgets/text'
import { PlusIcon } from '@heroicons/react/20/solid'

const SearchPadding = tw(Horizontal)`
  w-full gap-3
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
  text-sm
  text-gray-900
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

const GapVertical = tw(VerticalFullWidthCenter)`
  gap-5
`

const BorderBottom = tw(HorizontalCenter)`
  w-full
  border-b
  border-solid
  border-gray-200
`

const Padding = tw(VerticalCenter)`
  py-5
  w-full
`

const NewCommunity: FC<{
  setOpen: (value: boolean) => void
}> = ({ setOpen }) => {
  const user = useStoreState<GlobalStoreModel>((state) => state.user)

  if (!user) {
    return <></>
  }

  return (
    <CreateProjectBtn onClick={() => setOpen(true)}>
      <PlusIcon className={'w-5 h-5 text-gray-900'} />
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
    <VerticalFullWidthCenter>
      <BorderBottom>
        <MainContent>
          <HorizontalBetweenCenterFullWidth>
            <Text2xl>{'👋 Communities'}</Text2xl>
            <NewCommunity setOpen={setOpen} />
          </HorizontalBetweenCenterFullWidth>
        </MainContent>
      </BorderBottom>

      <Padding>
        <MainContent>
          <GapVertical>
            <SearchPadding>
              <SearchInput hint={'Search Community'} onChanged={(value) => debounced(value)} />
            </SearchPadding>
            <CommunityContent query={query} />
          </GapVertical>
        </MainContent>
      </Padding>

      <BaseModal isOpen={isOpen}>
        <ModalBox>
          <NewCommunityStore.Provider>
            <CreateCommunity setOpen={setOpen} />
          </NewCommunityStore.Provider>
        </ModalBox>
      </BaseModal>
    </VerticalFullWidthCenter>
  )
}

export default Index
