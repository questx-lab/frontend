import tw from 'twin.macro';
import styled from "styled-components";
import Link from "next/link";

export const Main = tw.main`
  bg-white
  w-screen
  min-h-screen
  flex flex-row
`

export const LeftSession = tw.div`
  bg-gray-200
  w-1/2
`

export const RightSession = tw.div`
  bg-white
  w-1/2
  text-center
  relative
  object-center
`

export const Wrap = tw.div`
  h-full
  w-full
  flex
  justify-center
  items-center
`

export const Box = tw.div`
  w-2/3
  flex
  flex-col
  justify-center
  items-center
  absolute
`

export const Title = tw.p`
  text-5xl
  text-black
  font-bold
  mb-[40px]
`

export const Description = tw.p`
  text-2xl
  text-black
  text-center
  font-light
  leading-[28px]
`

export const ListLogos = tw.div`
  flex
  flex-row
  justify-center
  space-x-12
  items-center
  mt-[50px]
  w-full
  px-[40px]
`

export const SkipText = styled(Link)(
  tw`
  absolute
  w-full
  underline-offset-4
  text-black
  text-2xl
  underline
  font-normal
  bottom-6
  flex
  justify-center
  items-center
  cursor-pointer
`
)