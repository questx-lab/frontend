import { FC } from 'react'

import tw from 'twin.macro'
import { useDebouncedCallback } from 'use-debounce'

import { Horizontal } from '@/widgets/orientation'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const InputStyle = tw.input`
  border-0
  ring-0
  outline-none
  text-sm
  w-full
`

const Border = tw(Horizontal)`
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

export const SearchInput: FC<{
  hint?: string
  onChanged: (value: string) => void
}> = ({ hint, onChanged }) => {
  // Handler
  const debounced = useDebouncedCallback((value: string) => {
    onChanged(value)
  }, 500)

  return (
    <Border>
      <MagnifyingGlassIcon className='w-5 h-5 text-gray-400' />
      <InputStyle placeholder={hint} onChange={(e) => debounced(e.target.value)} />
    </Border>
  )
}
