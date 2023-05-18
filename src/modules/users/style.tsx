import Image from 'next/image'
import styled from 'styled-components'
import tw from 'twin.macro'

import { Horizontal, Vertical } from '@/widgets/orientation'

export const CheckboxSession = tw(Horizontal)`
  gap-2
  justify-start
  items-center
  text-lg
  font-normal
  text-gray-700
`

export const ButtonBox = tw(Horizontal)`
  w-full
  gap-3
  justify-end
  items-center
`

export const BadgeGrid = tw.div`
  w-full
  grid
  grid-cols-5
  gap-4
`

export const BadgeBox = tw.div`
  p-4
  border
  border-solid
  border-gray-300
  rounded-lg
  cursor-pointer
`

export const DivideBox = tw(Vertical)`
  w-full
  divide-y
`

export const Wrap = tw(Horizontal)`
  min-h-screen
  mt-[70px]
`

export const Asside = tw.div`
  divide-y
  w-80
  fixed
  border-r
  border-gray-200
  h-full
`

export const Main = tw(Horizontal)`
  w-full
  ml-80
  bg-white
`

export const PersonWrap = tw(Vertical)`
  justify-center
  items-center
  py-8
  gap-2
`

export const Avatar = styled(Image)(
  () => tw`
  rounded-full
`
)

export const NameText = tw.p`
  text-xl
  font-medium
  text-black
  text-center
  max-w-lg
  text-ellipsis
  overflow-hidden
  max-w-[150px]

`

export const LvBox = tw.div`
  bg-teal
  rounded-full
  px-3
  py-1
  text-sm
  font-medium
  text-white
`

export const OptionWrap = tw(Vertical)`
  py-4
  px-6
  gap-3
  w-full
`

export const Option = styled.div<{ active?: boolean }>(({ active = false }) => [
  active
    ? tw`
        bg-primary-100
        px-3
        py-3
        flex
        flex-row
        justify-start
        items-center
        rounded-lg
        hover:bg-primary-50
        cursor-pointer
        text-lg
        font-medium
        text-primary-500
        gap-2
        w-full
      `
    : tw`
        px-3
        py-3
        bg-white
        flex
        flex-row
        justify-start
        items-center
        rounded-lg
        hover:bg-primary-50
        cursor-pointer
        text-lg
        font-medium
        text-gray-700
        gap-2
        w-full
      `,
])

export const ContentBox = tw(Vertical)`
  w-full
  py-6
  px-12
  gap-4
  divide-y
`

export const HeadBox = tw(Horizontal)`
  w-full
  py-6
  px-12
  text-2xl
  font-medium
  text-gray-900
`

export const ProfileSession = tw(Vertical)`
  w-2/3
  gap-5
  pb-3
  pt-6
`

export const Label = tw.label`
  text-lg
  font-medium
  text-gray-700
`

export const Description = tw.label`
  text-lg
  font-normal
  text-gray-700
`

export const RowBox = tw(Horizontal)`
  gap-6
`

export const ColBox = tw(Vertical)`
  gap-3
`
