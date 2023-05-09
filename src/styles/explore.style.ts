import Image from 'next/image'
import styled from 'styled-components'
import tw from 'twin.macro'

export const Wrap = tw.div`
  flex
  flex-col
  min-h-screen
  pt-[70px]
`

export const Main = tw.div`
  flex
  flex-col
  px-[120px]
  pb-[30px]
  max-xl:px-[100px]
`

export const FWrap = tw.div`
  flex
  flex-col
  py-2
`

export const FSearchWrap = tw.div`
  flex flex-row w-full gap-3 py-3
`

export const FSearchBox = tw.div`
  flex 
  flex-row 
  gap-3 
  border 
  border-solid
  border-gray-300 
  py-2 
  px-3 
  justify-start 
  items-center 
  w-full 
  rounded-lg
`

export const FSearchInput = tw.input`
  border-0 
  ring-0 
  outline-none 
  text-lg
  w-full
`

export const FFitlerBox = tw.div`
  flex 
  flex-row 
  gap-3 
  border 
  border-solid 
  border-gray-300 
  py-2 px-3 
  rounded-lg 
  items-center
`

export const TitleBox = tw.div`
  px-[120px]
  py-6
  max-xl:px-[100px]
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

export const LeaderBoardBox = tw.div`
  px-3
  py-2
  bg-gray-100
  rounded-md
  text-lg
  text-black
  font-bold
  border
  border-dashed
  border-2 border-gray-400
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

export const WrapProjects = tw.div`
  grid
  grid-cols-4
  gap-4
  max-2xl:grid-cols-3
  max-xl:grid-cols-2
  max-sm:grid-cols-1
`

export const RewardBox = tw.div`
  flex
  flex-row
  gap-1
  justify-start
  items-center
`

export const RewardText = tw.span`
text-[#FF7B05]
text-sm
font-medium
`

export const ProjectBoxWrap = tw.div`
  cursor-pointer
  p-5 
  border
  rounded-lg
  border
  border-solid
  border-gray-300
  flex
  flex-col
  justify-between
  mt-[16px]
  max-sm:w-full
  max-xl:mt-[16px]
  h-[350px]
  hover:shadow-lg
`

export const PTopBox = tw.div`
  flex
  flex-col
  w-full
  h-full
  justify-start
  items-start
`

export const PBottomBox = tw.div`
  flex
  flex-row
  w-full
  justify-start
  items-center
`

export const ImageProjectBox = styled(Image)(tw`
  rounded-full
`)

export const ContentProjectBox = tw.div`
  flex 
  flex-col 
  justify-between 
`

export const TitleProjectBox = tw.p`
  mt-3
  text-black 
  font-medium 
  text-lg
  max-lg:text-lg
`

export const PbInfo = tw.div`
  mt-3 flex flex-row justify-start gap-3
`

export const PbInfoBox = tw.div`
  bg-gray-100 
  px-2 
  py-1 
  rounded-lg 
  text-sm 
  font-normal 
  text-gray-700
`

export const PbDes = tw.div`
  mt-3 
  text-lg 
  font-normal 
  text-gray-700 
  overflow-hidden 
  text-ellipsis 
  line-clamp-3
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
