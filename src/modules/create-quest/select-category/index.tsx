import { FC, Fragment, useEffect, useState } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import AddCategory from '@/modules/create-quest/select-category/add-category'
import CommunityStore from '@/store/local/community'
import NewQuestStore from '@/store/local/new-quest'
import { CategoryType } from '@/types'
import {
  Horizontal,
  HorizontalBetweenCenterFullWidth,
  VerticalFullWidth,
} from '@/widgets/orientation'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const FullWidth = tw.div`
  w-full
`

const Relative = tw.div`
  relative mt-1
`

const ListButton = tw(Listbox.Button)`
  relative
  w-full
  cursor-pointer
  rounded-lg
  bg-white
  py-2
  pl-3
  pr-10
  text-left
  focus:outline-none
  sm:text-sm
  border
  border-solid
  border-gray-200
`

const ListOption = tw(Listbox.Options)`
  absolute
  mt-1
  max-h-60
  w-full
  overflow-auto
  rounded-md
  bg-white
  py-1
  text-lg
  focus:outline-none
  sm:text-sm
  border
  border-solid
  border-gray-200
`

const Title = tw.div`
  block
  truncate
  text-lg
  font-normal
  text-gray-900
`

const UpDown = tw.div`
  pointer-events-none
  absolute
  inset-y-0
  right-0
  flex
  items-center
  pr-2
`

const CheckIconBox = tw.div`
  absolute
  inset-y-0
  left-0
  flex
  items-center
  pl-3
  text-gray-600
`

const Label = tw(Horizontal)`
  gap-1
  items-center
  text-lg
  font-medium
  text-gray-900
`

const activeOption = ({ active }: { active: boolean }) =>
  `relative cursor-default select-none py-2 pl-10 pr-4 cursor-pointer ${
    active ? 'bg-gray-100 text-gray-900' : 'text-gray-900'
  }`

const TitleOption = styled.div<{ selected: boolean }>(({ selected }) => {
  const styles = [tw`block truncate`]
  if (selected) {
    styles.push(tw`font-medium`)
  } else {
    styles.push(tw`font-normal`)
  }

  return styles
})

const ListOptionRender: FC<{ categories: CategoryType[] }> = ({ categories }) => {
  return (
    <Transition
      as={Fragment}
      leave='transition ease-in duration-100'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <ListOption>
        {categories &&
          categories.map((category) => (
            <Listbox.Option key={category.id} className={activeOption} value={category}>
              {({ selected }) => (
                <>
                  <TitleOption selected={selected}>{category.name}</TitleOption>
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

export default function SelectCategory() {
  const [selected, setSelected] = useState<CategoryType>()

  const categories = CommunityStore.useStoreState((state) => state.categories)
  const setCategoryId = NewQuestStore.useStoreActions((action) => action.setCategoryId)

  useEffect(() => {
    if (categories && categories.length > 0) {
      setSelected(categories[0])
      setCategoryId(categories[0].id)
    }
  }, [categories])

  if (!selected) {
    return <></>
  }

  return (
    <VerticalFullWidth>
      <HorizontalBetweenCenterFullWidth>
        <Label>{'Category'}</Label>
        <AddCategory />
      </HorizontalBetweenCenterFullWidth>
      <FullWidth>
        <Listbox
          value={selected}
          onChange={(e) => {
            setSelected(e)
            setCategoryId(e.id)
          }}
        >
          <Relative>
            <ListButton>
              <Title>{selected.name}</Title>
              <UpDown>
                <ChevronUpDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
              </UpDown>
            </ListButton>
            <ListOptionRender categories={categories} />
          </Relative>
        </Listbox>
      </FullWidth>
    </VerticalFullWidth>
  )
}
