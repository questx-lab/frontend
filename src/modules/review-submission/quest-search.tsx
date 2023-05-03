import { Fragment, FunctionComponent, useState } from 'react'

import { Gap } from '@/styles/common.style'
import { LabelInput } from '@/styles/myProjects.style'
import {
  CbbBoxInput,
  CbbBtn,
  CbbInput,
  CbbOption,
  CbbTitle,
  CbbWrap,
  NotFoundBox,
  RCard,
  RICard,
  WrapIcon,
} from '@/styles/quest-review.style'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const titles = [
  { id: 1, name: 'Join Discord 👾' },
  { id: 2, name: 'Invite 100 people to our Discord 🎉' },
  { id: 3, name: 'Invite 200 people to our Discord 🎉' },
  { id: 4, name: 'Invite 500 people to our Discord 🎉' },
  { id: 5, name: 'Invite 1000 people to our Discord 🎉' },
]

const QuestSearch: FunctionComponent = () => {
  const [selected, setSelected] = useState([])
  const [query, setQuery] = useState('')

  const filteredTitle =
    query === ''
      ? titles
      : titles.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <RCard>
      <RICard>
        <LabelInput>{'QUEST'}</LabelInput>
        <Gap height={4} />
        <Combobox value={selected} onChange={(e) => setSelected(e)} multiple>
          <CbbWrap>
            <CbbBoxInput>
              <CbbInput
                displayValue={(person) => (person as any).name}
                onChange={(event) => setQuery(event.target.value)}
              />
              <CbbBtn>
                <ChevronUpDownIcon
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </CbbBtn>
            </CbbBoxInput>
            <Transition
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
              afterLeave={() => setQuery('')}
            >
              <CbbOption>
                {filteredTitle.length === 0 && query !== '' ? (
                  <NotFoundBox>Nothing found.</NotFoundBox>
                ) : (
                  filteredTitle.map((title) => (
                    <Combobox.Option
                      key={title.id}
                      className='relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900'
                      value={title}
                    >
                      {({ selected }) => (
                        <>
                          <CbbTitle selected={selected}>{title.name}</CbbTitle>
                          {selected ? (
                            <WrapIcon>
                              <CheckIcon
                                className='h-5 w-5'
                                aria-hidden='true'
                              />
                            </WrapIcon>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </CbbOption>
            </Transition>
          </CbbWrap>
        </Combobox>
      </RICard>
    </RCard>
  )
}

export default QuestSearch
