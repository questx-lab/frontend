import {
  Horizontal,
  HorizontalBetweenCenter,
  Vertical,
} from '@/widgets/orientation'
import Image from 'next/image'
import styled from 'styled-components'
import tw from 'twin.macro'

export const Wrap = tw.div`
  w-full
  px-48
  py-12
  bg-white
`

export const InfoBox = tw(Vertical)`
  w-2/3
`

export const ActionBox = tw(Horizontal)`
  w-1/3
  justify-end
  items-center
`

export const Avatar = styled(Image)(
  () => tw`
  rounded-full
`
)

export const Title = tw.p`
  font-medium
  text-black
  text-2xl
`

export const Description = tw.p`
  font-normal
  text-gray-700
  text-lg
`

export const FollowBtn = tw.button`
  border
  border-solid
  border-[1px]
  border-gray-300
  rounded-lg
`
