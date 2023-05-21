import tw from 'twin.macro'

export const Horizontal = tw.div`
  flex
  flex-row
  justify-start
  items-start
`

export const HorizontalStartCenter = tw.div`
  flex
  flex-row
  justify-start
  items-center
  gap-2
`

export const HorizontalCenter = tw.div`
  flex
  flex-row
  justify-center
  items-center
`

export const HorizontalEnd = tw.div`
  flex
  flex-row
  justify-end
  items-end
`

export const HorizontalBetweenCenter = tw.div`
  flex
  flex-row
  justify-between
  items-center
`

export const Vertical = tw.div`
  flex
  flex-col
  justify-start
  items-start
`

export const VerticalCenter = tw.div`
  flex
  flex-col
  justify-center
  items-center
`

export const VerticalFullWidth = tw(Vertical)`
  w-full
  flex
  flex-col
  gap-2
`

export const VerticalBetween = tw.div`
  flex
  flex-col
  justify-between
`
