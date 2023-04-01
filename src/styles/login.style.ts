import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import tw from 'twin.macro'

export const Main = tw.main`
  bg-white
  w-screen
  min-h-screen
  flex flex-row
`

export const LeftSession = tw.div`
  bg-gray-200
  w-1/2
  max-lg:hidden
`

export const RightSession = tw.div`
  bg-white
  w-1/2
  max-lg:w-full
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
  pb-[40px]
  max-sm:text-2xl
`

export const Description = tw.p`
  text-2xl
  text-black
  text-center
  font-light
  leading-[28px]
  max-sm:text-sm
`

export const ImageBox = styled(Image)(tw`
  cursor-pointer
  max-sm:w-[30px]
`)

export const ListLogos = tw.div`
  flex
  flex-row
  justify-center
  space-x-12
  max-sm:space-x-6
  items-center
  pt-[50px]
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
  max-sm:text-lg
`
)
