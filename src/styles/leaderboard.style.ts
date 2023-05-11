import Image from 'next/image'
import styled from 'styled-components'
import tw from 'twin.macro'

import { Tab } from '@headlessui/react'

export const Wrap = tw.div`
  flex
  flex-row
  min-h-screen
  pt-[70px]
`

export const Main = tw.div`
  flex
  flex-col
  pl-[200px]
  pr-[480px]
  max-2xl:pr-[320px]
  max-2xl:pl-[120px]
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
  items-center
  p-3
  rounded-lg
`

export const LHInfoA = tw.div`
  w-full
  max-sm:w-full
  flex
  flex-row
  max-sm:flex-col
  items-center
  justify-center
`

export const LogoP = styled(Image)(
  () => tw`
  rounded-lg
`
)

export const LHBox = tw.div`
  w-full
  h-full
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
  justify-between
  items-center
  max-sm:flex-col
`

export const LHLogo = tw.div`
  flex
  flex-row
  justify-center
  items-center
`

export const LHTitle = tw.p`
  text-2xl
  text-black
  font-medium
`

export const LHDes = tw.p`
  text-lg
  text-gray-700
  font-normal
  overflow-hidden
  text-ellipsis
  line-clamp-2
`

export const QTWrap = tw.div`
  w-full
  flex
  flex-col
`

export const QTWrapC = tw.div`
  flex
  flex-row
  max-sm:flex-col
  max-sm:justify-center
  justify-start
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
  w-[350px]
  max-2xl:w-[280px]
  h-full
  right-0
  fixed
  border-l-[1px]
  border-solid
  bg-white
  border-gray-200
  overflow-y-scroll
`

export const TabBox = tw.div`
  w-full
  max-w-md
  pt-4
  sm:px-0
`

export const TabList = styled(Tab.List)(tw`
  flex
  space-x-1
  bg-white
`)

export const TabPannel = styled(Tab.Panel)(tw`
  rounded-xl
  bg-white
  px-4
  py-2
`)

export const LItem = tw.li`
  relative
  py-2
  flex
  flex-row
  justify-between
  items-center
`

export const TextItem = tw.span`
  max-w-[120px]
  font-normal
  text-[#C2410C]
  text-sm
  overflow-hidden
  text-ellipsis
`
