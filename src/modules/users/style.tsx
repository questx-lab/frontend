import Image from 'next/image'
import styled from 'styled-components'
import tw from 'twin.macro'

export const CheckboxWrap = tw.div`
  flex
  flex-col
  justify-start
  items-start
`

export const CheckboxSession = tw.div`
  flex
  flex-row
  gap-2
  justify-start
  items-center
  text-lg
  font-normal
  text-gray-700
`

export const ButtonBox = tw.div`
  w-full
  flex
  flex-row
  gap-3
  justify-end
  items-center
`

export const BadgeGrid = tw.div`
  w-full
  grid
  grid-cols-5
  gap-4
`

export const BadgeBox = tw.div`
  p-4
  border
  border-solid
  border-gray-300
  rounded-lg
  cursor-pointer
`

export const DivideBox = tw.div`
  w-full
  divide-y
  flex
  flex-col
`

export const SocialBox = styled.div<{ active?: boolean }>(
  ({ active = false }) => [
    !active &&
      tw`
    flex
    flex-row
    border
    border-solid
    border-gray-300
    rounded-lg
    py-2
    px-4
    gap-2
    bg-white
    justify-center
    items-center
  `,
    active &&
      tw`
    flex
    flex-row
    rounded-lg
    py-2
    px-4
    gap-2
    bg-primary-100
    justify-center
    items-center
  `,
  ]
)

export const Wrap = tw.div`
  flex
  flex-row
  min-h-screen
  mt-[70px]
`

export const Asside = tw.div`
  divide-y
  w-80
  fixed
  border-r
  border-gray-200
  h-full
`

export const Main = tw.div`
  w-full
  flex
  flex-row
  justify-start
  items-start
  ml-80
  bg-white
`

export const PersonWrap = tw.div`
  flex
  flex-col
  justify-center
  items-center
  py-8
  gap-2
`

export const Avatar = styled(Image)(
  () => tw`
  rounded-full
`
)

export const NameText = tw.p`
  text-xl
  font-medium
  text-black
  text-center
  max-w-lg
  text-ellipsis
  overflow-hidden
  max-w-[150px]

`

export const LvBox = tw.div`
  bg-teal
  rounded-full
  px-3
  py-1
  text-sm
  font-medium
  text-white
`

export const OptionWrap = tw.div`
  py-4
  px-6
  flex
  flex-col
  gap-3
`

export const Option = styled.div<{ active?: boolean }>(({ active = false }) => [
  active
    ? tw`
        bg-primary-100
        px-3
        py-3
        flex
        flex-row
        justify-start
        items-center
        rounded-lg
        hover:bg-primary-50
        cursor-pointer
        text-lg
        font-medium
        text-primary-500
        gap-2
      `
    : tw`
        px-3
        py-3
        bg-white
        flex
        flex-row
        justify-start
        items-center
        rounded-lg
        hover:bg-primary-50
        cursor-pointer
        text-lg
        font-medium
        text-gray-700
        gap-2
      `,
])

export const ContentBox = tw.div`
  w-full
  py-6
  px-12
  flex
  flex-col
  gap-4
  divide-y
`

export const HeadBox = tw.div`
  w-full
  flex
  flex-row
  py-6
  px-12
  text-2xl
  font-medium
  text-gray-900
`

export const ProfileSession = tw.div`
  w-2/3
  flex
  flex-col
  gap-5
  pb-3
  pt-6
`

export const Label = tw.label`
  text-lg
  font-medium
  text-gray-700
`

export const Description = tw.label`
  text-lg
  font-normal
  text-gray-700
`

export const RowBox = tw.div`
  flex
  flex-row
  gap-6
  justify-start
  items-start
`

export const ColBox = tw.div`
  flex
  flex-col
  justify-start
  items-start
  gap-3
`
