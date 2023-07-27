import { FC, Fragment, useState } from 'react'

import tw from 'twin.macro'

import MemberCommunityStore from '@/store/local/member-community'
import { FollowCommunityType } from '@/types/community'
import { HorizontalFullWidth } from '@/widgets/orientation'
import { TextSm } from '@/widgets/text'
import { Combobox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/24/outline'

const ComboBoxFrame = tw.div`
  relative
  w-full
`

const InputAndIconBorder = tw.div`
  relative
  w-full
  cursor-pointer
  overflow-hidden
  rounded-lg
  bg-white
  text-left
  outline-0
  ring-0  
`

const InputFrame = tw(Combobox.Input)`
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
  outline-0
  ring-0  
`

const InputIconFrame = tw(Combobox.Button)`
  absolute
  inset-y-0
  right-0
  flex
  items-center
  pr-2
`

export const Options = tw(Combobox.Options)`
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
`

const ResultBox: FC<{ filteredMembers: FollowCommunityType[] }> = ({ filteredMembers }) => {
  const members = MemberCommunityStore.useStoreState((state) => state.members)
  const setSelectedMember = MemberCommunityStore.useStoreActions(
    (action) => action.setSelectedMember
  )

  return (
    <>
      {members.map((member) => (
        <Combobox.Option
          key={member.user.id}
          className='relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900'
          value={member}
          onClick={() => setSelectedMember(member)}
        >
          <TextSm>{member.user.id}</TextSm>
        </Combobox.Option>
      ))}
    </>
  )
}

const FilterUser: FC = () => {
  const [search, setSearch] = useState<string>('')

  const members = MemberCommunityStore.useStoreState((state) => state.members)
  const selectedMember = MemberCommunityStore.useStoreState((state) => state.selectedMember)

  const setSelectedMember = MemberCommunityStore.useStoreActions(
    (action) => action.setSelectedMember
  )

  return (
    <HorizontalFullWidth>
      <Combobox value={selectedMember} onChange={(e) => setSelectedMember(e)}>
        <ComboBoxFrame>
          <InputAndIconBorder>
            <InputFrame
              displayValue={(member) => (member as FollowCommunityType).user.id}
              onChange={(event) => setSearch(event.target.value)}
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
            <Options className={'z-50'}>
              <ResultBox filteredMembers={members} />
            </Options>
          </Transition>
        </ComboBoxFrame>
      </Combobox>
    </HorizontalFullWidth>
  )
}

export default FilterUser
