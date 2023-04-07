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

export const TabSide = tw.div`
  w-full
  h-[60px]
  border-b-2
  border-gray-300
  flex
  flex-row
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
