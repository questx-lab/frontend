import styled from 'styled-components'
import tw from 'twin.macro'

type CreateProjectType = {
  isBlock?: boolean
}

export const WrapBtn = tw.div`
  w-full
  flex
  justify-center
  items-center
`

export const FullWidthBtnBox = tw.button`
  w-full 
  bg-primary 
  hover:bg-gray-400 
  text-sm 
  text-white 
  font-medium 
  py-2 
  px-4 
  rounded-lg
`

export const LoginHeaderBtn = tw.button`
  bg-primary 
  hover:bg-gray-400 
  text-sm 
  text-white 
  font-medium 
  py-2 
  px-4 
  rounded-lg
  max-lg:hidden
`

export const AddRoleBtn = tw.button`
  bg-primary 
  hover:bg-gray-400 
  text-sm 
  text-white 
  font-medium 
  py-2 
  px-12
  rounded-lg
  max-sm:hidden
`

export const SubmitBtn = tw.button`
  bg-[#C1C7CD]
  hover:bg-gray-200 
  text-sm 
  text-white 
  font-medium 
  py-4 
  px-8 
  rounded-lg
  max-sm:hidden
`

export const ConnectTwitterBtn = tw.button`
  bg-white
  border
  border-2
  border-solid
  border-black
  hover:bg-gray-200
  text-black
  font-bold
  text-lg
  rounded-lg
  p-[9px]
  shadow-inner
  shadow-lg
  w-full
  max-xl:text-sm
`

export const ConnectedTwitterBtn = tw.button`
  bg-gray-200
  hover:bg-gray-200
  text-black
  font-bold
  text-lg
  rounded-lg
  p-[9px]
  shadow-inner
  shadow-lg
  w-full
  max-xl:text-sm
`

export const CreateProjectBtn = styled.button<CreateProjectType>(
  ({ isBlock = true }) => [
    isBlock
      ? tw`
          bg-gray-200
          border
          border-0
          border-solid
          border-black
          hover:bg-gray-200
          text-gray-500
          font-bold
          text-lg
          rounded-lg
          p-[9px]
          shadow-inner
          shadow-lg
          w-80
        `
      : tw`
          bg-gray-700
          border
          hover:bg-gray-500
          text-white
          font-bold
          text-lg
          rounded-lg
          p-[9px]
          shadow-inner
          shadow-lg
          w-80
        `,
  ]
)

export const PActionWrap = tw.div`
  w-full
  flex
  flex-row
  justify-center
  items-center
`

export const Pcancel = tw.button`
  bg-white
  border
  border-2
  border-solid
  border-gray-200
  hover:bg-gray-300
  text-gray-200
  font-bold
  text-lg
  rounded-lg
  p-[9px]
  w-80
  max-lg:text-sm
`

export const PSave = styled.button<CreateProjectType>(({ isBlock = true }) => [
  isBlock
    ? tw`
          bg-gray-200
          border
          border-0
          border-solid
          border-black
          hover:bg-gray-200
          text-gray-500
          font-bold
          text-lg
          rounded-lg
          p-[9px]
          shadow-inner
          shadow-lg
          w-80
          max-lg:text-sm
        `
    : tw`
          bg-gray-700
          border
          hover:bg-gray-500
          text-white
          font-bold
          text-lg
          rounded-lg
          p-[9px]
          shadow-inner
          shadow-lg
          w-80
          max-lg:text-sm
        `,
])

export const MenuBtn = tw.button`
  lg:hidden
  max-lg:mr-2
`

export const DelBtn = tw.button`
  w-[120px]
  bg-white
  text-sm
  font-normal
  text-[#FD0505]
`
