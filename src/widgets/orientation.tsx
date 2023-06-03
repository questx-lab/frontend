import tw from 'twin.macro'

export const FullWidthHeight = tw.div`
  w-full
  h-full
`

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
`

export const HorizontalCenter = tw.div`
  flex
  flex-row
  justify-center
  items-center
  gap-2
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

export const HorizontalBetweenCenterFullWidth = tw(Horizontal)`
  justify-between
  items-center
  w-full
`

export const HorizontalFullWidth = tw(Horizontal)`
  w-full
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
`

export const VerticalFullWidthHeight = tw(VerticalFullWidth)`
  h-full
`

export const VerticalFullWidthCenter = tw(VerticalCenter)`
  w-full
`

export const VerticalFullWidthStartCenter = tw(VerticalFullWidth)`
  justify-start
  items-center
`

export const VerticalBetween = tw.div`
  flex
  flex-col
  justify-between
`

export const VerticalFullWidthBetween = tw(VerticalBetween)`
  w-full
`
