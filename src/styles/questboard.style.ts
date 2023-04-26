import Image from 'next/image'
import styled from 'styled-components'
import tw from 'twin.macro'

export const Wrap = tw.div`
  flex
  flex-row
  min-h-screen
  pt-[70px]
`

export const Main = tw.div`
  flex
  flex-col
  pl-[100px]
  pr-[40px]
  max-lg:pr-[10px]
  max-lg:pl-[80px]
  py-2
  w-full
`

export const CMain = tw.div`
  flex
  flex-row
  pl-[70px]
  pr-[40px]
  max-lg:pr-[10px]
  max-lg:pl-[80px]
  w-full
`

export const CSide = tw.div`
  w-64
  fixed
  border-r-2
  border-gray-200
  h-full
`

export const CPBox = tw.div`
  px-4
`

export const CBox = tw.div`
  w-full
  flex
  flex-row
  justify-center
  items-start
  ml-64
`

export const CCard = tw.div`
  w-2/3
  h-full
  bg-white
  py-8
  pl-12
`

export const CSideCard = tw.div`
  py-8
  pl-6
  w-1/3
  h-full
  right-0
  flex
  flex-col
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
        bg-gray-100
        px-3
        py-2
        flex
        flex-row
        justify-start
        items-center
        rounded-lg
        hover:bg-gray-50
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
        hover:bg-gray-50
        cursor-pointer
        my-2
        text-sm
        font-normal
        text-black
      `,
  ]
)

export const CHeadling = tw.p`
  text-2xl
  font-normal
  text-black
`

export const CTitle = tw.p`
  text-sm
  font-medium
  text-gray-700
`

export const ICard = tw.div`
  border-solid
  border-[1px]
  rounded-lg
  border-gray-200
  py-6
`

export const PICard = tw.div`
  px-6
`

export const ITypeBox = tw.div`
  flex
  flex-wrap
  justify-start
  items-center
  w-full
`

export const PersonWrap = tw.div`
  flex 
  flex-col 
  justify-center 
  items-center 
  p-6 
`

export const LabelDes = tw.p`
  text-sm
  font-normal
  text-gray-700
`

export const PersonInfoBox = tw.div`
  flex
  flex-row
  justify-center
  items-center
`

export const PersonName = tw.p`
  text-lg
  font-medium
  text-black
  text-center
`

export const LvBox = tw.div`
  bg-[#14B8A6]
  rounded-full
  px-3
  text-sm
  font-normal
  text-white
`

export const PersonDes = tw.p`
  text-lg
  font-normal
  text-gray-700
  text-center
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
  grid
  grid-cols-3
  gap-4
  max-xl:grid-cols-3
  max-lg:grid-cols-2
  justify-between
  items-center
`

export const QuestboardBox = tw.div`
  cursor-pointer
  border
  rounded-lg
  border-solid
  border-gray-200
  border-[1px]
  h-[250px]
  max-lg:h-[300px]
  w-full
  flex
  flex-col
`

export const ImageQuestBox = styled(Image)(
  () => tw`
  rounded-full
`
)

export const ContentQuestBox = tw.div`
  p-5 
  flex 
  flex-col 
  justify-between 
`

export const HeaderBox = tw.div`
  px-4
  flex
  flex-row
  justify-start
  items-center
`

export const TitleBox = tw.div`
  flex
  flex-row
  justify-start
  items-center
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
`

export const PointText = tw.span`
  text-[#FF7B05]
  text-sm
  font-medium
`

export const SkeletonFirst = tw.div`
  h-[10px] 
  w-1/2 
  rounded-full 
  bg-gray-200
`

export const SkeletonSecond = tw.div`
  h-[10px] 
  w-full 
  rounded-full 
  bg-gray-200
`

export const Boarding = tw.div`
  flex
  flex-row
`

export const BoardingCard = tw.div`
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
`

export const StartBoarding = tw.div`
  flex
  flex-col
  h-full
  py-2
`

export const EndBoarding = tw.div`
  h-16
  flex
  flex-row
  justify-between
  items-center
  border-t-[1px]
  border-gray-200
`

export const CardBox = tw.div`
  flex
  flex-row
  items-center
  justify-end

`

export const SCardBox = tw.div`
  flex
  flex-row
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
])

export const BtnWrap = tw.div`
  w-full
  flex
  flex-row
  justify-between
  items-center
`

export const PointBox = tw.div`
  w-full
  flex
  flex-row
  border
  border-solid
  border-gray-100
  border-[1px]
  rounded-lg
  p-3
`

export const PointInput = tw.input`
  w-full
  outline-0
  ring-0
`
