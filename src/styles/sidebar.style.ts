import Image from 'next/image'
import styled from 'styled-components'
import tw from 'twin.macro'

export const Wrap = styled.div<{ isShow?: boolean }>(({ isShow = false }) => [
  isShow
    ? tw`
  w-20
  fixed
  flex
  flex-col
  justify-start
  items-center
  rounded-lg
  bg-gray-100
  h-screen
`
    : tw`w-0`,
])

export const BoxContent = tw.div`
  rounded-lg
  flex
  flex-col
  items-center
  py-3
  gap-2
`

export const CircleRouded = styled(Image)(tw`
  rounded-full
  cursor-pointer
`)

export const TitleText = tw.p`
  text-xs 
  text-black 
  font-normal 
  mt-6
`
