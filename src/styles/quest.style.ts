import styled from 'styled-components'
import tw from 'twin.macro'

export const TWrap = tw.div`
  flex
  flex-row
  min-h-screen
  pt-[80px]
`

export const TMain = tw.div`
  flex
  flex-col
  px-[80px]
  max-lg:px-[16px]
  py-2
  w-full
`

export const TActions = tw.div`
  grid
  grid-cols-3
  gap-3
  max-lg:grid-cols-2
  max-sm:grid-cols-1
  w-full 
  justify-between
`

export const TEWrap = tw.div`
  flex 
  flex-col  
  w-full 
  mb-14
  max-lg:mb-12
`
export const TBox = tw.div`
  flex 
  flex-row 
  items-center
`

export const TCheckBox = tw.input`
  cursor-pointer 
  focus:outline-none 
  focus-visible:outline-none 
  w-8 
  h-8 
  text-gray-600 
  bg-gray-800 
  border-gray-300 
  rounded
`

export const TEBox = tw.div`
  w-full 
  flex 
  flex-row 
  h-[80px]
  border-2 
  border-solid 
  border-gray-200 
  rounded-lg
`

export const TImg = styled.div<{ disable?: boolean }>(({ disable = false }) => [
  disable
    ? tw`
  h-[80px] 
  w-[80px] 
  bg-gray-400 
  rounded-l-lg
`
    : tw`
  h-[80px] 
  w-[80px] 
  bg-black 
  rounded-l-lg
`,
])

export const TEEBox = tw.div`
  flex 
  flex-col 
  p-2
`

export const TEText = tw.p`
  text-sm 
  font-light 
  text-black
`
