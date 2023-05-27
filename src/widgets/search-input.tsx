'use client'

import { FunctionComponent } from 'react'
import tw from 'twin.macro'
import { useDebouncedCallback } from 'use-debounce'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Horizontal } from '@/widgets/orientation'

export const FSearchInputStyle = tw.input`
  border-0
  ring-0
  outline-none
  text-lg
  w-full
`

const FSearchBox = tw(Horizontal)`
  gap-3
  border
  border-solid
  border-gray-300
  py-2
  px-3
  justify-start
  items-center
  w-full
  rounded-lg
`

export const SearchInput: FunctionComponent<{
  hint?: string
  onChanged: (value: string) => void
}> = ({ hint, onChanged }) => {
  // Handler
  const debounced = useDebouncedCallback((value: string) => {
    onChanged(value)
  }, 500)

  return (
    <>
      <FSearchBox>
        <MagnifyingGlassIcon className='w-5 h-5 text-gray-500' />
        <FSearchInputStyle
          className='border-0 ring-0 outline-none text-lg'
          placeholder={hint}
          onChange={(e) => debounced(e.target.value)}
        />
      </FSearchBox>
    </>
  )
}
