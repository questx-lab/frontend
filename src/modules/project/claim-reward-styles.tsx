import tw from 'twin.macro'

export const Radio = tw.div`
  mb-[0.125rem]
  block
  min-h-[1.5rem]
  pl-[1.5rem]
`

export const RadioInput = tw.input`
  before:[content:''] 
  peer
  relative 
  h-5 
  w-5 
  cursor-pointer
  appearance-none
  rounded-full 
  border 
  border-blue-gray-200
  text-pink-500
  transition-all
  before:absolute 
  before:top-2/4 
  before:left-2/4 
  before:block
  before:h-12 
  before:w-12 
  before:-translate-y-2/4 
  before:-translate-x-2/4
  before:rounded-full 
  before:bg-gray-500 
  before:opacity-0
  before:transition-opacity 
  checked:border-pink-500
  checked:before:bg-pink-500 
  hover:before:opacity-10
`
