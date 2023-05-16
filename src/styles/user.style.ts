import { Horizontal } from '@/widgets/orientation'
import styled from 'styled-components'
import tw from 'twin.macro'

type TabActive = {
  isActive: boolean
}

export const Wrap = tw.div`
  flex
  flex-col
  min-h-screen
  px-[80px]
  pt-[80px]
  pb-[30px]
  max-lg:px-[20px]
`

export const UInfo = tw(Horizontal)`
  w-full
`

export const UInfoL = tw(Horizontal)`
  items-center
  w-1/2
`

export const UInfoR = tw.div`
  flex
  flex-col
  justify-between
  items-end
  w-1/2
`

export const UBadge = tw(Horizontal)`
  bg-gray-200
  rounded-full
  py-3
  px-6
  justify-center
  items-center
`

export const UAvt = tw.div`
  w-[120px]
  h-[120px]
  border
  border-solid
  border-2
  border-gray-200
  bg-white
  rounded-lg
  bg-gray-100
`

export const TabSide = tw(Horizontal)`
  w-full
  h-[60px]
  border-b-2
  border-gray-300
  justify-start
`

export const Tab = styled.div<TabActive>(({ isActive }) =>
  isActive
    ? tw`
        h-full
        w-[200px]
        border-b-2
        border-black
        flex
        justify-center
        items-center
        cursor-pointer
      `
    : tw`
        h-full
        w-[200px]
        flex
        justify-center
        items-center
        cursor-pointer
      `
)

export const Text = styled.p<TabActive>(({ isActive }) =>
  isActive ? tw`font-bold` : tw`font-light`
)

export const UPWrap = tw.div`
  mt-8
  w-full
  bg-[#F2F4F8]
  rounded-lg
  p-5
  flex
  flex-col
`

export const UWrapI = tw(Horizontal)`
  justify-end
  items-center
`

export const UBoxI = tw.div`
  p-2
  border
  border-[1px]
  border-solid
  border-black
  rounded-lg
`
