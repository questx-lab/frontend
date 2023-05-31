import { listQuestApi } from '@/app/api/client/quest'
import ResultBox from '@/modules/review-submissions/filter/result'
import { FilterTitleFrame } from '@/modules/review-submissions/mini-widget'
import { CommunityStore } from '@/store/local/community'
import { NewQuestSearchStore } from '@/store/local/quest-search.store'
import { Divider, Gap } from '@/styles/common.style'
import { QuestType } from '@/utils/type'
import { Label } from '@/widgets/text'
import { Combobox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { Fragment, FunctionComponent, useEffect } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useDebouncedCallback } from 'use-debounce'

const ComboBoxFrame = tw.div`
  relative
  mx-4
  mb-6
`

const InputAndIconBorder = tw.div`
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

const InputFrame = styled(Combobox.Input)(tw`
  w-full
  rounded-lg
  border
  border-solid
  border-gray-300
  py-4
  pl-4
  pr-10
  text-lg
  leading-5
  text-gray-900
  focus:ring-0
`)

const InputIconFrame = styled(Combobox.Button)(tw`
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

const SelectionCount: FunctionComponent<{ count: number }> = ({ count }) => {
  if (count === 0) {
    return <></>
  }

  // TODO: Style this text to make it rounded
  return <div style={{ flex: 1 }}>{count}</div>
}

const ClearAll: FunctionComponent<{ count: number; onClick: () => void }> = ({
  count,
  onClick,
}) => {
  if (count === 0) {
    return <></>
  }

  return <div onClick={onClick}>Clear All</div>
}

const Filter: FunctionComponent<{
  onFilterChanged: (newSelectedQuests: QuestType[]) => void
}> = ({ onFilterChanged }) => {
  // data - search store
  const allQuests = NewQuestSearchStore.useStoreState((state) => state.allQuests)
  const selectedQuests = NewQuestSearchStore.useStoreState((state) => state.selectedQuest)
  const filteredQuests = NewQuestSearchStore.useStoreState((state) => state.filteredQuests)
  // data - community store
  const selectedCommunity = CommunityStore.useStoreState((state) => state.selectedCommunity)

  // actions
  const setQuests = NewQuestSearchStore.useStoreActions((actions) => actions.setAllQuests)
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
  }, 400)

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
    const filtered = allQuests.filter((quest) => {
      const title = quest!.title?.toLowerCase() ?? ''
      return title.includes(value.toLowerCase())
    })

    // filter all
    setFilteredQuests(filtered)
  }

  const onSelectedChanged = (newSelectedQuests: QuestType[]) => {
    setSelectedQuests(newSelectedQuests)

    // delay to avoid multiple calls
    debouncedServerCall(newSelectedQuests)
  }

  const clearAllClicked = () => {
    if (selectedQuests.length !== 0) {
      setSelectedQuests([])
      debouncedServerCall([])
    }
  }

  return (
    <>
      <FilterTitleFrame>
        <Label>Filter</Label>
        <Gap width={2} />
        <SelectionCount count={selectedQuests.length} />
        <Gap width={2} />
        <ClearAll count={selectedQuests.length} onClick={clearAllClicked} />
      </FilterTitleFrame>
      <Divider />
      <FilterTitleFrame>
        <Label>Quests</Label>
      </FilterTitleFrame>
      <Combobox value={selectedQuests} onChange={onSelectedChanged} multiple>
        <ComboBoxFrame>
          <InputAndIconBorder>
            <InputFrame
              displayValue={(quest) => (quest as QuestType).title}
              onChange={(event) => debouncedQuery(event.target.value)}
            />
            <InputIconFrame>
              <ChevronUpDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
            </InputIconFrame>
          </InputAndIconBorder>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => {}}
          >
            <Options>
              <ResultBox filteredQuests={filteredQuests} />
            </Options>
          </Transition>
        </ComboBoxFrame>
      </Combobox>
    </>
  )
}

export default Filter
