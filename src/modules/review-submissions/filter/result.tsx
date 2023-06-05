import { FunctionComponent } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import NewQuestSearchStore from '@/store/local/quest-search'
import { QuestType } from '@/types'
import { CheckBox } from '@/widgets/input'
import { Combobox } from '@headlessui/react'

const Title = styled.span<{ selected: boolean }>(({ selected = false }) => [
  selected ? tw`block truncate font-medium` : tw`block truncate font-normal`,
])

const CheckboxFrame = tw.span`
  absolute
  inset-y-0
  left-0
  flex
  items-center
  pl-3
`

const NotFoundBox = tw.div`
  relative
  cursor-default
  select-none
  py-2
  px-4
  text-gray-700
`

const ResultBox: FunctionComponent<{ filteredQuests: QuestType[] }> = ({ filteredQuests }) => {
  const selectedQuests = NewQuestSearchStore.useStoreState((state) => state.selectedQuest)

  if (!filteredQuests.length) {
    return <NotFoundBox>No Quest matched.</NotFoundBox>
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
                <Title selected={selected}>{quest.title}</Title>
                <CheckboxFrame>
                  <CheckBox checked={selected} onChange={() => {}} type='checkbox' />
                </CheckboxFrame>
              </>
            )
          }}
        </Combobox.Option>
      ))}
    </>
  )
}

export default ResultBox
