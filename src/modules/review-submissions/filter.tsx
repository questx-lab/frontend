import { TabReviewEnum } from '@/constants/common.const'
import { listClaimedQuestsApi } from '@/app/api/client/claim'
import { FilterTitleFrame } from '@/modules/review-submissions/mini-widget'
import { NewClaimReviewStore } from '@/store/local/claim-review'
import { NewQuestSearchStore } from '@/store/local/quest-search.store'
import { Divider } from '@/styles/common.style'
import { QuestType } from '@/utils/type'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { Fragment, FunctionComponent, useEffect } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { CommunityStore } from '@/store/local/community'
import { ClaimedQuestStatus } from '@/constants/common.const'
import { listQuestApi } from '@/app/api/client/quest'
import { useDebouncedCallback } from 'use-debounce'

const CbbWrap = tw.div`
  relative
  mt-1
`

const CbbBoxInput = tw.div`
  relative
  w-full
  cursor-pointer
  overflow-hidden
  rounded-lg
  bg-white
  text-left
  focus:outline-none
  focus-visible:ring-2
  focus-visible:ring-white
  focus-visible:ring-opacity-75
  focus-visible:ring-offset-2
  sm:text-sm
`

const CbbInput = styled(Combobox.Input)(tw`
  w-full
  rounded-lg
  border
  border-solid
  border-gray-300
  py-3
  pl-3
  pr-10
  text-sm
  leading-5
  text-gray-900
  focus:ring-0
`)

const CbbBtn = styled(Combobox.Button)(tw`
  absolute
  inset-y-0
  right-0
  flex
  items-center
  pr-2
`)

export const Options = styled(Combobox.Options)(tw`
  absolute
  mt-1
  max-h-60
  w-full
  overflow-auto
  rounded-md
  bg-white
  py-1
  text-base
  shadow-lg
  ring-1
  ring-black
  ring-opacity-5
  focus:outline-none
  sm:text-sm
`)

const CbbTitle = styled.span<{ selected: boolean }>(({ selected = false }) => [
  selected ? tw`block truncate font-medium` : tw`block truncate font-normal`,
])

const WrapIcon = tw.span`
  absolute
  inset-y-0
  left-0
  flex
  items-center
  pl-3
`

const ResultBox: FunctionComponent<{ filteredQuests: QuestType[] }> = ({ filteredQuests }) => {
  const selectedQuests = NewQuestSearchStore.useStoreState((state) => state.selectedQuest)

  if (!filteredQuests.length) {
    return <>Nothing found.</>
  }

  return (
    <>
      {filteredQuests.map((quest) => (
        <Combobox.Option
          key={quest.id}
          className='relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900'
          value={quest}
        >
          {() => {
            const selected = selectedQuests.some((selectedQuest) => selectedQuest.id === quest.id)

            return (
              <>
                <CbbTitle selected={selected}>{quest.title}</CbbTitle>
                {selected ? (
                  <WrapIcon>
                    <CheckIcon className='h-5 w-5' aria-hidden='true' />
                  </WrapIcon>
                ) : null}
              </>
            )
          }}
        </Combobox.Option>
      ))}
    </>
  )
}

const Filter: FunctionComponent<{
  onFilterChanged: (newSelectedQuests: QuestType[]) => void
}> = ({ onFilterChanged }) => {
  // data - search store
  const quests = NewQuestSearchStore.useStoreState((state) => state.quests)
  const selectedQuests = NewQuestSearchStore.useStoreState((state) => state.selectedQuest)
  const filteredQuests = NewQuestSearchStore.useStoreState((state) => state.filteredQuests)
  // data - community store
  const selectedCommunity = CommunityStore.useStoreState((state) => state.selectedCommunity)

  // actions
  const setQuery = NewQuestSearchStore.useStoreActions((actions) => actions.setQuery)
  const setQuests = NewQuestSearchStore.useStoreActions((actions) => actions.setQuests)
  const setFilteredQuests = NewQuestSearchStore.useStoreActions(
    (actions) => actions.setFilteredQuests
  )
  const setSelectedQuests = NewQuestSearchStore.useStoreActions(
    (actions) => actions.setSelectedQuests
  )

  // hooks
  useEffect(() => {
    fetchInitialQuests()
  }, [])

  // hook - debounces
  const debouncedQuery = useDebouncedCallback(async (value: string) => {
    onSearchQueryChanged(value)
  }, 250)
  const debouncedServerCall = useDebouncedCallback(async (newSelectedQuests: QuestType[]) => {
    onFilterChanged(newSelectedQuests)
  }, 300)

  if (!selectedCommunity) {
    // This should not happen. This is added here so that we can use selectedCommunity safely.
    return <></>
  }

  const fetchInitialQuests = async () => {
    const data = await listQuestApi(selectedCommunity.handle, '')
    if (data.code === 0) {
      setQuests(data.data?.quests || [])
      setFilteredQuests(data.data?.quests || [])
    } else {
      // TODO: Handle error here
    }
  }

  // onChange handles
  const onSearchQueryChanged = (value: string) => {
    const filtered = quests.filter((quest) => {
      const title = quest!.title?.toLowerCase() ?? ''
      return title.includes(value.toLowerCase())
    })

    // Filter all
    setFilteredQuests(filtered)
  }

  const onSelectedChanged = (newSelectedQuests: QuestType[]) => {
    setSelectedQuests(newSelectedQuests)

    // delay to avoid multiple calls
    debouncedServerCall(newSelectedQuests)
  }

  return (
    <>
      <FilterTitleFrame>Filter</FilterTitleFrame>
      <Divider />
      <FilterTitleFrame>QUESTS</FilterTitleFrame>
      <Combobox value={selectedQuests} onChange={onSelectedChanged} multiple>
        <CbbWrap>
          <CbbBoxInput>
            <CbbInput
              displayValue={(quest) => (quest as QuestType).title}
              onChange={(event) => debouncedQuery(event.target.value)}
            />
            <CbbBtn>
              <ChevronUpDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
            </CbbBtn>
          </CbbBoxInput>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setQuery('')}
          >
            <Options>
              <ResultBox filteredQuests={filteredQuests} />
            </Options>
          </Transition>
        </CbbWrap>
      </Combobox>
    </>
  )
}

export default Filter
