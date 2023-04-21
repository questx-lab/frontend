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
  grid-cols-4
  gap-4
  max-xl:grid-cols-3
  max-lg:grid-cols-2
  justify-between
  items-center
`

export const QuestboardBox = tw.div`
  border
  rounded-lg
  border-solid
  border-black
  border-2
  h-[400px]
  max-lg:h-[300px]
  w-full
  flex
  flex-col
  w-full
`

export const ImageQuestBox = tw.div`
  h-1/2 
  bg-gray-200
  rounded-t-lg
`

export const ContentQuestBox = tw.div`
  p-5 
  flex 
  flex-col 
  justify-between 
  h-1/2
`

export const TitleQuestBox = tw.p`
  text-black 
  font-bold 
  text-2xl
  max-lg:text-xl
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
