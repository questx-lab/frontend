import styled from 'styled-components'
import tw from 'twin.macro'

import { Tab } from '@headlessui/react'

export const Wrap = tw.div`
  flex
  flex-row
  min-h-screen
  pt-[80px]
`

export const Main = tw.div`
  flex
  flex-col
  pl-[100px]
  pr-[420px]
  max-lg:pr-[10px]
  max-lg:pl-[80px]
  py-5
  w-full
`

export const LHeader = tw.div`
  w-full
  flex
  flex-row
  max-sm:flex-col
  max-sm:justify-start
  max-sm:items-start
  justify-between
  items-start
  border-2
  border-solid
  border-black
  p-3
  rounded-lg
`

export const LHInfoA = tw.div`
  w-2/3
  max-sm:w-full
  flex
  flex-row
  max-sm:flex-col
  items-center 
  justify-center
`

export const LHInfoB = tw.div`
  px-2
  w-1/3
  max-sm:w-full
  flex
  flex-row
  max-sm:flex-wrap
  items-center 
  justify-center
`

export const LHInfoC = tw.div`
  w-1/3
  flex
  flex-col
  items-end
  max-sm:mt-4
  max-sm:w-full
  max-sm:flex-row
  max-sm:justify-between
  max-sm:items-center
`

export const LHImg = tw.div`
  w-[180px]
  h-[180px]
  bg-gray-400
  rounded-lg
`

export const LHBox = tw.div`
  w-[calc(100%_-_180px)]
  flex
  flex-col
  justify-center
  items-start
  max-sm:items-center
`

export const LHTitleBox = tw.div`
  w-full
  flex
  flex-row
  justify-start
  items-center
  max-sm:flex-col
`

export const LHLogo = tw.div`
  flex
  flex-row
`

export const LHTitle = tw.p`
  text-2xl
  text-black
  font-black
`

export const LHDes = tw.p`
  text-sm
  text-gray-600
  font-normal
`

export const LSBox = tw.div`
  flex
  flex-col
  justify-center
  items-center
  px-4
  py-1
  bg-gray-200
  rounded-lg
  max-sm:mt-2
`

export const LTInvite = tw.p`
  text-sm
  text-black
  font-normal
  border-b-2
  border-black
  cursor-pointer
`

export const LTabWrap = tw.div`
  border-2
  border-solid
  border-gray-200
  rounded-lg
  p-[1px]
  bg-white
  flex
  flex-row
  w-96
  max-sm:w-full
`

export const LTabSide = styled.div<{ active?: boolean }>(
  ({ active = false }) => [
    active
      ? tw`
      h-10
      w-48
      bg-black
      text-sm
      text-white
      font-bold
      flex
      justify-center
      items-center
      rounded-lg
      cursor-pointer
    `
      : tw`
      h-10
      w-48
      bg-white
      text-sm
      text-black
      font-normal
      flex
      justify-center
      items-center
      cursor-pointer
    `,
  ]
)

export const QTWrap = tw.div`
  w-full
  flex
  flex-col
`

export const QTLbBox = tw.div`
  w-full
  flex
  flex-col
  p-6
  rounded-lg
  bg-gray-200
`

export const QTWrapC = tw.div`
  flex
  flex-row
  max-sm:flex-col
  max-sm:justify-center
  justify-start
  items-center
`

export const QTWrapD = tw.div`
  flex
  flex-row
  justify-start
  items-center
`

export const QTWrapL = tw.div`
  flex
  flex-row
  w-full
  max-sm:justify-center
  justify-end
  items-center
`

export const QTCard = styled.div<{ active?: boolean }>(({ active = false }) => [
  active
    ? tw`
    border-solid
    border-2
    h-[30px]
    max-sm:w-[70px]
    border-black
    rounded-full
    bg-black
    text-sm
    text-white
    font-bold
    flex
    justify-center
    items-center
    w-20
    cursor-pointer
  `
    : tw`
    border-solid
    h-[30px]
    max-sm:w-[70px]
    border-[1px]
    border-black
    rounded-full
    bg-white
    text-sm
    text-black
    font-normal
    flex
    justify-center
    items-center
    w-20
    cursor-pointer
  `,
])

export const LUWrap = tw.div`
  h-full 
  flex 
  flex-row 
  justify-center 
  items-center
  max-sm:mb-2
`

export const LUImg = tw.div`
  bg-white 
  w-8 
  h-8 
  rounded-lg 
  border-[1px] 
  border-gray-400
`

export const LUWrap2 = tw.div`
  w-full 
  flex 
  flex-row 
  justify-between 
  items-center
`

export const LLbox = tw.div`
  p-2 
  h-full 
  flex 
  flex-col 
  w-full 
  overflow-y-scroll
`

export const TabWrap = tw.div`
  w-[400px] 
  px-[20px] 
  py-5 
  h-full 
  right-0
  fixed  
  border-l-2 
  border-solid 
  bg-white 
  border-black 
  overflow-y-scroll
`

export const TabBox = tw.div`
  w-full 
  max-w-md 
  pt-4 
  sm:px-0
`

export const TabList = styled(Tab.List)(tw`
  border-2  
  border-black 
  flex 
  space-x-1 
  rounded-full 
  bg-white
  p-1
`)

export const TabPannel = styled(Tab.Panel)(tw`
  rounded-xl 
  bg-white
`)
