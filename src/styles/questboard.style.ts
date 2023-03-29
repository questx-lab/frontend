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
  mx-[80px]
  py-2
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
  flex
  flex-wrap
  justify-between
  items-center
`

export const QuestboardBox = tw.div`
  border
  rounded-lg
  border-solid
  border-gray-300
  border-2
  h-[400px]
  w-[calc(33%_-_8px)]
  flex
  flex-col
  mt-[16px]
`
