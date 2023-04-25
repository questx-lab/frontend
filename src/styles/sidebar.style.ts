import tw from 'twin.macro'

export const Wrap = tw.div`
  fixed
  flex
  flex-col
  justify-start
  items-center
  rounded-lg
  px-4
  bg-gray-100
  h-screen
`

export const BoxContent = tw.div`
  w-[40px]
  rounded-lg
  flex
  flex-col
  items-center
  px-2
  py-3
`

export const CircleRouded = tw.div`
  h-[40px]
  w-[40px]
  rounded-full
  bg-gray-500
`

export const TitleText = tw.p`
  text-xs 
  text-black 
  font-normal 
  mt-6
`
