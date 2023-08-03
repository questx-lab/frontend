import tw from 'twin.macro'

export const GrayBorderBox = tw.div`
  border
  border-solid
  border
  border-gray-200
`

export const RoundedGrayBorderBox = tw(GrayBorderBox)`
  rounded-lg
  w-full
  py-6
`

export const PaddingIcon = tw.div`p-1 cursor-pointer`
