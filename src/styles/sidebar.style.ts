import Image from 'next/image'
import styled from 'styled-components'
import tw from 'twin.macro'

import { Vertical } from '@/widgets/orientation'

export const Wrap = tw.div`
  w-20
  fixed
  flex
  flex-col
  justify-start
  items-center
  rounded-lg
  bg-gray-100
  h-screen
  divide-y
  divide-gray-300
  max-sm:hidden
`

export const BoxContent = tw(Vertical)`
  rounded-lg
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
