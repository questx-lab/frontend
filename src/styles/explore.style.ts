import tw from 'twin.macro';

export const Wrap = tw.div`
  flex
  flex-col
  min-h-screen
  mt-[60px]
  px-[60px]
  py-[30px]
`

export const Title = tw.p`
  text-3xl
  text-black
  font-bold
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
  border-2 border-gray-400
`

export const WrapProjects = tw.div`
  flex
  flex-wrap
  justify-between
  items-center
`

export const ProjectBox = tw.div`
  border
  rounded-lg
  border-solid
  border-gray-200
  h-[400px]
  w-[calc(33%_-_8px)]
  flex
  flex-col
  mt-[16px]
`
