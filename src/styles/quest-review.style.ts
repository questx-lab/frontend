import styled from 'styled-components'
import tw from 'twin.macro'

import { ReviewBtnEnum } from '@/constants/project.const'
import { Combobox } from '@headlessui/react'

export const Main = tw.div`
  w-full
  flex
  flex-col
  justify-start
  items-center
  ml-80
  pb-6
`

export const Head = tw.div`
  w-full
  py-4
  px-36
  max-2xl:px-12
  max-lg:px-6
  text-lg
  font-medium
  text-black
`

export const Tab = tw.div`
  w-full
  bg-gray-100
  border-y
  border-solid
  border-gray-200
  px-36
  max-2xl:px-12
  max-lg:px-6
  flex
  flex-row
  justify-center
  items-center
`

export const TabItem = styled.div<{ active?: boolean }>(
  ({ active = false }) => [
    active
      ? tw`
    w-1/2
    bg-white
    flex
    flex-row
    justify-center
    items-center
    text-sm
    font-medium
    text-primary
    py-4
    border-x
    border-solid
    border-gray-200
    cursor-pointer
  `
      : tw`
    w-1/2
    bg-gray-100
    flex
    flex-row
    justify-center
    items-center
    text-sm
    font-medium
    text-black
    py-4
    border-x
    border-solid
    border-gray-200
    cursor-pointer
  `,
  ]
)

export const PBox = tw.div`
  flex
  flex-row
  gap-4
  w-full
  h-full
`

export const PWrap = tw.div`
  flex
  flex-col
  gap-6
  px-36
  max-2xl:px-12
  max-lg:px-6
  w-full
`

export const PLSide = tw.div`
  border
  border-solid
  border-gray-200
  rounded-lg
  w-2/3
  h-full
`

export const PRSide = tw.div`
  w-1/3
  h-full
`

export const PRWrap = tw.div`
  border
  border-solid
  border-gray-200
  w-full
  rounded-lg
`

export const PTabHeader = tw.div`
  flex
  flex-row
  w-full
  border-solid
  border-gray-200
  border-b
`

export const PHeaderInfo = tw.div`
  flex
  flex-row
  w-full
  justify-start
  items-center
  text-lg
  font-medium
  text-black
  py-3
  px-4
`

export const PSort = tw.div`
  flex
  flex-row
  w-48
  border-l
  border-solid
  border-gray-200
  justify-center
  items-center
  text-lg
  font-normal
  text-black
  py-3
  cursor-pointer
`

export const PCheckBox = tw.input`
  cursor-pointer 
  focus:outline-none 
  focus-visible:outline-none 
  w-5
  h-5 
  text-white 
  bg-gray-800 
  border-gray-300 
  rounded
  mr-4
`

export const PBody = tw.div`
  flex
  flex-col
  w-full
  h-full
`

export const SRow = styled.div<{ active?: boolean }>(({ active = false }) => [
  active
    ? tw`
  flex
  flex-row
  w-full
  justify-between
  items-center
  p-4
  bg-primary-50
  border-t
  border-solid
  border-gray-200
`
    : tw`
  flex
  flex-row
  w-full
  justify-between
  items-center
  p-4
  border-t
  border-solid
  border-gray-200
`,
])

export const SubmitItem = tw.div`
  flex
  flex-row
  justify-start
  items-center
`

export const SItem = tw.div`
  flex
  flex-col
  w-full
`

export const SInfo = tw.div`
  flex
  flex-row
  w-full
`

export const SCol = tw.div`
  ml-4
  flex
  flex-col
  justify-start
  items-start
`

export const SName = tw.span`
  font-medium
  text-sm
  text-gray-800
`

export const SDes = tw.span`
  font-normal
  text-sm
  text-gray-500
`

export const STag = tw.div`
  text-sm
  font-normal
  text-[#B45309]
  py-1
  px-3
  rounded-lg
  bg-[#FEF3C7]
`

export const STextInfo = tw.p`
  mt-2
  font-normal
  text-lg
  text-black
`

export const RCard = tw.div`
  border-solid
  border-t
  border-gray-200
  py-6
`

export const RICard = tw.div`
  px-6
`

export const PAction = tw.div`
  w-32
  flex
  flex-col
  gap-2
`

export const BtnWrap = tw.div`
  py-4
  border-t
  border-solid
  border-gray-200
  fixed
  bottom-0
  w-[calc(100%_-_390px)]
  right-0
  px-36
  max-2xl:px-12
  max-lg:px-6
  bg-white
`

export const BtnBox = tw.div`
  flex
  flex-row
  gap-2
  w-[calc(66%_-_2px)]
`

export const Btn = styled.button<{ btnType?: number }>(
  ({ btnType = ReviewBtnEnum.ACCEPT }) => [
    btnType === ReviewBtnEnum.REJECT &&
      tw`
    py-2
    border
    border-danger-500
    border-solid
    rounded-lg
    text-sm
    font-medium
    text-danger-700
    w-full
    bg-danger-50
    hover:bg-danger-500
    hover:text-white
  `,
    btnType === ReviewBtnEnum.ACCEPT &&
      tw`
    py-2
    border
    border-success-500
    border-solid
    bg-success-50
    rounded-lg
    text-sm
    font-medium
    text-success-700
    w-full
    hover:bg-success-500
    hover:text-white
  `,
    btnType === ReviewBtnEnum.EXPORT &&
      tw`
    py-3
    border
    border-gray-200
    border-solid
    rounded-lg
    text-sm
    font-medium
    text-black
    w-full
    hover:bg-gray-300
    `,
    btnType === ReviewBtnEnum.PENDING &&
      tw`
    py-3
    border
    border-warning-300
    border-solid
    rounded-lg
    text-sm
    bg-warning-50
    font-medium
    text-warning-700
    w-full
    hover:bg-warning-100
    `,
  ]
)

export const CbbWrap = tw.div`
  relative 
  mt-1
`

export const CbbBoxInput = tw.div`
  relative 
  w-full 
  cursor-pointer 
  overflow-hidden 
  rounded-lg 
  bg-white 
  text-left 
  focus:outline-none 
  focus-visible:ring-2 
  focus-visible:ring-white 
  focus-visible:ring-opacity-75 
  focus-visible:ring-offset-2 
  sm:text-sm
`

export const CbbInput = styled(Combobox.Input)(tw`
  w-full 
  rounded-lg 
  border 
  border-solid 
  border-gray-300 
  py-2 
  pl-3 
  pr-10 
  text-sm 
  leading-5 
  text-gray-900 
  focus:ring-0
`)

export const CbbBtn = styled(Combobox.Button)(tw`
  absolute 
  inset-y-0 
  right-0 
  flex 
  items-center 
  pr-2
`)

export const CbbOption = styled(Combobox.Options)(tw`
  absolute 
  mt-1 
  max-h-60 
  w-full
  overflow-auto 
  rounded-md 
  bg-white 
  py-1 
  text-base 
  shadow-lg 
  ring-1 
  ring-black 
  ring-opacity-5 
  focus:outline-none 
  sm:text-sm
`)

export const NotFoundBox = tw.div`
  relative 
  cursor-default 
  select-none 
  py-2 
  px-4 
  text-gray-700
`

export const CbbTitle = styled.span<{ selected?: boolean }>(
  ({ selected = false }) => [
    selected ? tw`block truncate font-medium` : tw`block truncate font-normal`,
  ]
)

export const WrapIcon = tw.span`
  absolute 
  inset-y-0 
  left-0 
  flex 
  items-center 
  pl-3
`
