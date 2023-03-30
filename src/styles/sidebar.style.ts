import styled from 'styled-components'
import tw from 'twin.macro'

export const Wrap = tw.div`
  fixed
  w-[80px]
  flex
  flex-col
  justify-start
  items-center
  rounded-lg
  px-2
`

export const BoxContent = tw.div`
  w-full
  bg-gray-100
  rounded-lg
  flex
  flex-col
  items-center
  px-2
  py-3
`

export const CircleRouded = tw.div`
  h-[40px]
  w-[40px]
  rounded-full
  bg-gray-500
`

export const TitleText = styled.p(tw`
  text-xs 
  text-black 
  font-bold 
  mt-6
`)
