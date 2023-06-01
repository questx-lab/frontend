import tw from 'twin.macro'

export const GrayBorderBox = tw.div`
  border
  border-solid
  border-[1px]
  border-gray-200
`

export const ThinBorderBox = tw(GrayBorderBox)`
  rounded-lg
`
