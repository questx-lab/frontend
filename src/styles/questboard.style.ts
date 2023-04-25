import Image from 'next/image'
import styled from 'styled-components'
import tw from 'twin.macro'

export const Wrap = tw.div`
  flex
  flex-row
  min-h-screen
  pt-[80px]
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
  border-2 border-gray-400
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
