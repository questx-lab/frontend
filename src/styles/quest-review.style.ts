import styled from 'styled-components'
import tw from 'twin.macro'

import { ClaimedQuestStatus, ReviewBtnEnum } from '@/constants/project.const'
import { Combobox, Dialog } from '@headlessui/react'
import { Horizontal, Vertical, VerticalFullWidth } from '@/widgets/orientation'

export const Main = tw(VerticalFullWidth)`
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

export const Tab = tw(Horizontal)`
  w-full
  bg-gray-100
  border-y
  border-solid
  border-gray-200
  px-36
  max-2xl:px-12
  max-lg:px-6
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

export const PBox = tw(Horizontal)`
  gap-4
  w-full
  h-full
  pb-[60px]
`

export const PWrap = tw(Vertical)`
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

export const PTabHeader = tw(Horizontal)`
  w-full
  border-solid
  border-gray-200
  border-b
`

export const PHeaderInfo = tw(Horizontal)`
  w-full
  justify-start
  items-center
  text-lg
  font-medium
  text-black
  py-3
  px-4
`

export const PSort = tw(Horizontal)`
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

export const PBody = tw(Vertical)`
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

export const SubmitItem = tw(Horizontal)`
  items-center
  w-full
`

export const SItem = tw(Vertical)`
  w-full
  cursor-pointer
`

export const SInfo = tw(Horizontal)`
  w-full
`

export const SCol = tw(Vertical)`
  ml-4
  justify-start
  items-start
`

export const SName = tw.span`
  font-medium
  text-sm
  text-gray-800
  max-w-[300px]
  text-ellipsis
  overflow-hidden
`

export const SDes = tw.span`
  font-normal
  text-sm
  text-gray-500
`

export const STag = styled.div<{ claimStatus?: string }>(
  ({ claimStatus = ClaimedQuestStatus.PENDING }) => [
    claimStatus === ClaimedQuestStatus.PENDING &&
      tw`
  text-sm
  font-normal
  text-[#B45309]
  py-1
  px-3
  rounded-lg
  bg-[#FEF3C7]
  `,
    claimStatus === ClaimedQuestStatus.ACCEPTED &&
      tw`
  text-sm
  font-normal
  text-success-700
  py-1
  px-3
  rounded-lg
  bg-success-50
  border
  border-solid
  border-success-300
  `,
    claimStatus === ClaimedQuestStatus.REJECTED &&
      tw`
  text-sm
  font-normal
  text-danger-700
  py-1
  px-3
  rounded-lg
  bg-danger-50
  border
  border-solid
  border-danger-300
  `,
  ]
)

export const STextInfo = tw.p`
  mb-2
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

export const BtnSubmitWrap = tw(Horizontal)`
  w-full
  gap-4
  my-4
`

export const PAction = tw(Vertical)`
  w-32
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

export const BtnBox = tw(Horizontal)`
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
  py-3
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

export const ModalContent = styled(Dialog.Panel)(
  tw`
  w-1/2
  max-2xl:w-[calc(100%_-_70px)]
  h-full
  bg-white
  text-center
  align-middle
  overflow-hidden
  shadow-xl
  transition-all
  flex
  flex-col
  justify-start
  items-center
  rounded-lg
  `
)

export const ModalBox = tw.div`
  flex
  h-full
  items-center
  justify-center
  text-center
  py-6
`

export const MDHead = tw(Horizontal)`
  w-full
  justify-between
  items-center
  px-8
  py-4
  text-2xl
  font-normal
  text-black
  border
  border-solid
  border-gray-200
`

export const MDBody = tw(Horizontal)`
  w-full
  h-full
  overflow-y-scroll
`

export const MDLeftSide = tw(Vertical)`
  w-2/5
  p-6
  border-r
  border-solid
  border-gray-200
`

export const MDPadding = tw(Vertical)`
  px-6
  w-full
`

export const MDRightSide = tw(Vertical)`
  w-3/5
  py-6
`

export const MDTitle = tw.span`
  font-medium
  text-lg
  text-black
`

export const MDDes = tw.p`
  font-light
  text-lg
  text-gray-700
  text-start
`

export const MDInfo = tw(Horizontal)`
  justify-between
  items-center
  w-full
`

export const EmptyBox = tw.div`
  w-full
  h-64
  rounded-lg
  bg-gray-100
`

export const NothingBox = tw.div`
  flex
  justify-center
  items-center
  w-full
  h-full
`
