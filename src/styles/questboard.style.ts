import Image from 'next/image'
import styled from 'styled-components'
import tw from 'twin.macro'

import { Horizontal, Vertical, VerticalFullWidth } from '@/widgets/orientation'
import { Disclosure } from '@headlessui/react'

export const Wrap = tw(Horizontal)`
  min-h-screen
  pt-[70px]
`

export const Main = tw(VerticalFullWidth)`
  pl-[100px]
  pr-[40px]
  max-lg:pr-[10px]
  max-lg:pl-[80px]
  py-2
`

export const CMain = tw(Horizontal)`
  pl-[70px]
  pr-[40px]
  max-lg:pr-[10px]
  max-lg:pl-[80px]
  w-full
`

export const MMain = tw(Horizontal)`
  pl-[70px]
  max-lg:pr-0
  max-lg:pl-[80px]
  w-full
`

export const CSide = tw.div`
  w-80
  fixed
  border-r-2
  border-gray-200
  h-full
`

export const CPBox = tw.div`
  px-4
`

export const CBox = styled.div<{ isTemplate?: boolean }>(
  ({ isTemplate = false }) => [
    isTemplate
      ? tw`
        w-full
        h-full
        flex
        flex-row
        justify-center
        items-start
        pr-12
        mb-12
      `
      : tw`
        w-full
        flex
        flex-row
        justify-center
        items-start
      `,
  ]
)

export const CCBox = tw(Horizontal)`
  w-full
  justify-center
  items-start
  pl-80
`

export const CWrap = tw(Vertical)`
  w-full
  h-full
  pl-80
`

export const CCard = tw.div`
  w-2/3
  h-full
  bg-white
  py-8
  pl-12
`

export const CSideCard = tw(Vertical)`
  py-8
  pl-6
  w-1/3
  h-full
  right-0
  justify-start
  items-end
`

export const BtnUseT = tw.button`
  border
  border-solid
  border-[1px]
  border-gray-200
  rounded-lg
  px-6
  py-2
  font-medium
  text-lg
  text-black
  hover:bg-gray-100
`

export const UnderText = tw.p`
  text-primary-500
  underline
  underline-offset-4
  text-sm
  font-normal
  cursor-pointer
`

export const ItemSide = styled.div<{ active?: boolean }>(
  ({ active = false }) => [
    active
      ? tw`
        bg-gray-200
        px-3
        py-2
        flex
        flex-row
        justify-start
        items-center
        rounded-lg
        hover:bg-gray-200
        cursor-pointer
        my-2
        text-sm
        font-medium
        text-primary-500
      `
      : tw`
        px-3
        py-2
        bg-white
        flex
        flex-row
        justify-start
        items-center
        rounded-lg
        hover:bg-gray-200
        cursor-pointer
        my-2
        text-sm
        font-medium
        text-gray-700
      `,
  ]
)

export const CHeadling = tw.p`
  text-2xl
  font-normal
  text-black
`

export const ICard = tw.div`
  border-solid
  border-[1px]
  rounded-lg
  border-gray-200
  py-6
`

export const PICard = tw(VerticalFullWidth)`
  py-2
  px-6
  gap-4
`

export const ITypeBox = tw.div`
  flex
  flex-wrap
  justify-start
  items-center
  w-full
`

export const PersonWrap = tw(Vertical)`
  justify-center
  items-center
  p-6
`

export const LabelDes = tw.p`
  text-sm
  font-normal
  text-gray-700
`

export const PersonInfoBox = tw(Horizontal)`
  justify-center
  items-center
`

export const PersonName = tw.p`
  text-lg
  font-medium
  text-black
  text-center
  max-w-lg
  text-ellipsis
  overflow-hidden
  max-w-[150px]

`

export const LvBox = tw.div`
  bg-[#14B8A6]
  rounded-full
  px-3
  text-sm
  font-normal
  text-white
`

export const TypeBox = styled.div<{ active?: boolean }>(
  ({ active = false }) => [
    active
      ? tw`
      py-2
      px-3
      bg-primary-100
      border-solid
      border-[1px]
      border-primary-100
      rounded-lg
      cursor-pointer
      mr-2
      mt-2
      text-sm
      text-primary-500
      font-medium
    `
      : tw`
      py-2
      px-3
      border-solid
      border-[1px]
      border-gray-200
      rounded-lg
      bg-white
      cursor-pointer
      mr-2
      mt-2
      text-sm
      text-black
      font-medium
    `,
  ]
)

export const TwitterBox = styled.div<{ active?: number }>(({ active = 0 }) => [
  active === 0 &&
    tw`
      py-1
      px-3
      border-solid
      border-[1px]
      border-gray-200
      rounded-lg
      bg-white
      cursor-pointer
      mr-2
      mt-2
      text-sm
      text-black
      font-normal
    `,
  active === 1 &&
    tw`
      py-1
      px-3
      bg-primary-100
      border-solid
      border-[1px]
      border-primary-100
      rounded-lg
      cursor-pointer
      mr-2
      mt-2
      text-sm
      text-primary-500
      font-normal
    `,
  active === 2 &&
    tw`
      py-1
      px-3
      border-solid
      border-[1px]
      border-gray-200
      rounded-lg
      bg-white
      cursor-not-allowed
      mr-2
      mt-2
      text-sm
      text-gray-400
      font-normal
    `,
])

export const Title = tw.p`
  text-3xl
  text-black
  font-bold
  max-sm:text-2xl
`

export const Description = tw.p`
  text-sm
  text-black
  font-light
`

export const FilterBox = tw.div`
  px-3
  py-2
  rounded-md
  text-lg
  text-black
  font-bold
  border
  border-dashed
  border-2
  border-gray-400
`

export const WrapQuestboard = tw.div`
  w-full
  grid
  grid-cols-3
  gap-4
  max-xl:grid-cols-3
  max-lg:grid-cols-2
  justify-between
  items-center
`

export const ImageQuestBox = styled(Image)(
  () => tw`
  rounded-full
`
)

export const HeaderBox = tw(Horizontal)`
  px-4
  justify-start
  items-center
`

export const TitleBox = tw(Horizontal)`
  px-64
  3xl:px-96
  py-6
  max-xl:px-[100px]
  w-full
  justify-between
`

export const TitleQuestBox = tw.p`
  px-4
  text-black
  font-medium
  text-lg
  max-lg:text-sm
`

export const DesQ = tw.p`
  px-4
  text-gray-700
  font-normal
  text-lg
  max-lg:text-sm
  overflow-hidden
  text-ellipsis
  line-clamp-3
`

export const PointText = tw.span`
  text-[#FF7B05]
  text-sm
  font-medium
`

export const BoardingCard = styled.div<{ manage?: boolean }>(
  ({ manage = false }) => [
    manage
      ? tw`
  cursor-pointer
  border
  rounded-lg
  border-solid
  border-gray-200
  border-[1px]
  h-[280px]
  bg-white
  max-lg:h-[350px]
  flex
  flex-col
  w-64
  mr-4
  hover:shadow-lg
`
      : tw`
  cursor-pointer
  border
  rounded-lg
  border-solid
  border-gray-200
  border-[1px]
  h-[280px]
  max-lg:h-[350px]
  flex
  flex-col
  w-64
  mr-4
  hover:shadow-lg
`,
  ]
)

export const TBoardingCard = tw(VerticalFullWidth)`
  cursor-pointer
  border
  rounded-lg
  border-solid
  border-gray-200
  border-[1px]
  h-[280px]
  max-lg:h-[350px]
  bg-white
  hover:shadow-lg
`

export const StartBoarding = tw(VerticalFullWidth)`
  h-full
  py-2
`

export const EndBoarding = tw(Horizontal)`
  w-full
  h-16
  justify-between
  items-center
  border-t-[1px]
  border-gray-200
`

export const CardBox = tw(Horizontal)`
  items-center
  justify-end

`

export const SCardBox = tw(Horizontal)`
  items-center
  justify-start
`

export const QuestText = tw.span`
  font-medium
  text-black
  text-lg
`

export const Card = styled.div<{ type?: number }>(({ type = 0 }) => [
  type === 0 &&
    tw`
    px-2
    py-1
    rounded-sm
    text-sm
    font-normal
    text-gray-500
    bg-gray-100
  `,
  type === 1 &&
    tw`
    px-2
    py-1
    rounded-sm
    text-sm
    font-normal
    text-[#A855F7]
    bg-[#F3E8FF]
  `,
  type === 2 &&
    tw`
    px-2
    py-1
    rounded-sm
    text-sm
    font-normal
    text-[#A855F7]
    bg-[#F3E8FF]
  `,
  type === 3 &&
    tw`
    px-2
    py-1
    rounded-sm
    text-sm
    font-normal
    text-[#A855F7]
    bg-[#F3E8FF]
  `,
])

export const BtnWrap = tw(Horizontal)`
  w-full
  justify-between
  items-center
  gap-4
`

export const PointBox = tw(Horizontal)`
  w-full
  border
  border-solid
  border-gray-200
  border-[1px]
  rounded-lg
  p-3
`

export const PointInput = tw.input`
  w-full
  outline-0
  ring-0
`

export const LabelCheckText = tw.span`
  cursor-pointer
  select-none
  text-sm
  font-medium
  text-black
`

export const MBox = tw.div`
  w-full
  h-full
  bg-white
  py-8
`

export const MHeader = tw(Horizontal)`
  w-full
  justify-between
  items-center
`

export const MPadding = tw.div`
  w-full
  px-16
`

export const TMain = tw(Horizontal)`
  w-full
  h-full
  border-t-[1px]
  border-solid
  border-gray-200
  overflow-y-scroll
`

export const TMHeader = tw(Horizontal)`
  w-full
  justify-between
  items-center
  px-6
  py-4
`

export const TLSide = tw.div`
  w-80
  h-[calc(100%_-_48px)]
  border-r-[1px]
  border-solid
  border-gray-200
  bg-gray-50
  fixed
  overflow-y-scroll
  pb-24
  px-6
  pt-2
`

export const DisclosureBtn = styled(Disclosure.Button)(tw`
  flex
  w-full
  justify-between
  items-center
  rounded-lg
  px-2
  py-2
  text-left
  text-sm
  font-medium
  text-gray-900
  ring-0
  outline-none
`)

export const DisclosurePanel = styled(Disclosure.Panel)(tw`
  flex
  flex-row
  px-2
  pt-4
  pb-2
`)

export const DisclosureTitle = tw.span`
  text-primary
  text-sm
  font-medium
`
