import tw from 'twin.macro'

export const GrayBorderBox = tw.div`
  border
  border-solid
  border-[1px]
  border-gray-200
`

export const RoundedGrayBorderBox = tw(GrayBorderBox)`
  rounded-lg
  w-full
  py-6
`
