import styled from 'styled-components'
import tw from 'twin.macro'

import { Listbox } from '@headlessui/react'
import { Horizontal, Vertical } from '@/widgets/orientation'

type TabActive = {
  isActive: boolean
}

type CreatedProjectBoxType = {
  isDash?: boolean
  isCenter?: boolean
}

type DirectType = {
  position?: number
}

type ListOpsType = {
  isActive?: boolean
}

type SpanSelect = {
  isSelect: boolean
}

export const Wrap = tw(Vertical)`
  min-h-screen
  px-[80px]
  pt-[80px]
  pb-[30px]
  max-lg:px-[20px]
`

// ========== Created project style ==========

export const WrapCreatedProject = tw(Vertical)`
  py-2
`

export const TitleCreatedProject = tw.p`
  text-3xl
  text-black
  font-bold
  max-sm:text-2xl
`

export const DescriptionCreatedProject = tw.p`
  text-sm
  text-black
  font-light
`

export const WrapCreatedProjectBox = tw.div`
  flex
  flex-wrap
  justify-between
  items-center
`

export const CreatedProjectBox = styled.div<CreatedProjectBoxType>(
  ({ isDash, isCenter }) => [
    isDash
      ? tw`
        cursor-pointer
        border
        rounded-lg
        border-dashed
        border-gray-400
        border-[1px]
        h-[500px]
        w-[calc(33%_-_24px)]
        flex
        flex-col
        mt-[48px]
        max-sm:w-full
        max-xl:w-[calc(50%_-_8px)]
        max-xl:mt-[16px]
      `
      : tw`
        border
        rounded-lg
        border-solid
        border-gray-400
        border-[1px]
        h-[500px]
        w-[calc(33%_-_24px)]
        flex
        flex-col
        mt-[48px]
        max-sm:w-full
        max-xl:w-[calc(50%_-_8px)]
        max-xl:mt-[16px]
      `,
    isCenter ? tw`justify-center items-center` : tw``,
  ]
)

export const ImageCreatedProjectBox = tw.div`
  h-1/2
  bg-gray-200
  rounded-t-lg
`

export const ContentCreatedProjectBox = styled.div<CreatedProjectBoxType>(
  ({ isCenter }) => [
    isCenter
      ? tw`
          w-full
          h-full
          p-5
          flex
          flex-col
          justify-evenly
          items-center
        `
      : tw`
          w-full
          h-full
          p-5
          flex
          flex-col
          justify-between
          items-start
          h-1/2
        `,
  ]
)

export const TitleCreatedProjectBox = tw.p`
  text-black
  font-bold
  text-2xl
  max-lg:text-xl
`

export const SkeletonFirst = tw.div`
  h-[10px]
  w-1/2
  rounded-full
  bg-gray-200
`

export const SkeletonSecond = tw.div`
  h-[10px]
  w-full
  rounded-full
  bg-gray-200
`

// ========== New project style ==========
export const FormBox = tw.form`
  w-full
  flex
  flex-row
  max-sm:flex-col
`

export const DivBox = tw(Horizontal)`
  w-full
  max-sm:flex-col
`

export const ElementBox = styled.div<DirectType>(({ position = 0 }) => [
  position
    ? tw`
  w-full
  flex
  flex-col
  justify-start
  items-end
  max-sm:items-start
  `
    : tw`
  w-full
  flex
  flex-col
  justify-start
  items-start
`,
])

export const WrapElementBox = tw(Vertical)`
  w-[calc(97%)]
  justify-center
  max-sm:items-start
  max-sm:w-full
`

export const LabelInput = tw.label`
  text-black
  font-normal
  text-sm
`

export const CategoryBox = tw.div`
  w-full
  flex
  flex-wrap
  justify-start
  items-start
`

export const CategoryItem = tw.div`
  border
  border-[1.5px]
  rounded-full
  mr-3
  mb-3
  border-black
  bg-white
  flex
  justify-center
  items-center
  px-5
  py-0.5
  text-lg
  text-black
  font-light
  cursor-pointer
  hover:bg-gray-700
  hover:text-white
`

export const ListBoxWrap = styled(Listbox.Options)(tw`
  absolute
  mt-1
  max-h-80
  w-full
  overflow-auto
  rounded-md
  bg-white
  text-xl
  shadow-lg
  ring-1
  ring-black
  ring-opacity-5
  focus:outline-none
  sm:text-sm
`)

export const ListOps = styled(Listbox.Option)<ListOpsType>(
  ({ isActive = true }) => [
    isActive
      ? tw`
        relative
        cursor-default
        select-none
        py-2
        pl-10
        pr-4
        bg-gray-100
        text-gray-900
      `
      : tw`
        relative
        cursor-default
        select-none
        py-2
        pl-10
        pr-4
        text-gray-900
      `,
  ]
)

export const SpanList = styled.span<SpanSelect>(({ isSelect }) => [
  isSelect ? tw`block truncate font-bold` : tw`block truncate font-normal`,
])

export const SpanIcon = tw.span`
  absolute
  inset-y-0
  left-0
  flex
  items-center
  pl-3
  text-gray-600
`
