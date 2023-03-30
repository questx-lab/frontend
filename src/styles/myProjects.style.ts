import styled from 'styled-components'
import tw from 'twin.macro'

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

export const Wrap = tw.div`
  flex
  flex-col
  min-h-screen
  px-[80px]
  pt-[80px]
  pb-[30px]
`

export const TabSide = tw.div`
  w-full
  h-[60px]
  border-b-2
  border-gray-300
  flex
  flex-row
  justify-start
`

export const Tab = styled.div<TabActive>(({ isActive }) =>
  isActive
    ? tw`
        h-full
        w-[200px]
        border-b-2
        border-black
        flex
        justify-center
        items-center
        cursor-pointer
      `
    : tw`
        h-full
        w-[200px]
        flex
        justify-center
        items-center
        cursor-pointer
      `
)

export const Text = styled.p<TabActive>(({ isActive }) =>
  isActive ? tw`font-bold` : tw`font-light`
)

// ========== Created project style ==========

export const WrapCreatedProject = tw.div`
  flex
  flex-col
  py-2
`

export const TitleCreatedProject = tw.p`
  text-3xl
  text-black
  font-bold
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
export const FormBox = styled.form(tw`
  w-full
  flex
  flex-row
`)

export const DivBox = styled.div(tw`
  w-full
  flex
  flex-row
`)

export const ElementBox = styled.div<DirectType>(({ position = 0 }) => [
  position
    ? tw`
  w-full
  flex
  flex-col
  justify-start
  items-end
  `
    : tw`
  w-full
  flex
  flex-col
  justify-start
  items-start
`,
])

export const WrapElementBox = tw.div`
  w-[calc(97%)]
  flex
  flex-col
  justify-center
  items-start
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
