import tw from 'twin.macro'

export const Wrap = tw.div`
  flex
  flex-col
  mt-[60px]
  px-[80px]
  py-[30px]
  max-lg:px-[20px]
  max-xl:px-[40px]
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

export const ProjectBox = tw.div`
  h-[325px]
  border
  rounded-lg
  border-solid
  border-gray-300
  border-2
  flex
  flex-col
  mt-[16px]
  max-sm:w-full
  max-xl:mt-[16px]
`

export const ImageProjectBox = tw.div`
  h-1/2 
  bg-gray-200
  rounded-t-lg
`

export const ContentProjectBox = tw.div`
  p-5 
  flex 
  flex-col 
  justify-between 
  h-1/2
`

export const TitleProjectBox = tw.p`
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
