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

export const FullWidthBtn = tw.button`
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

export const LoginBtn = tw.button`
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
          font-medium
          text-lg
          rounded-lg
          px-8
          py-2
          shadow-inner
          shadow-lg
          max-lg:text-sm
        `
    : tw`
          bg-primary-500
          border
          hover:bg-primary-400
          text-white
          font-medium
          text-lg
          rounded-lg
          px-8
          py-2
          shadow-inner
          shadow-lg
          max-lg:text-sm
        `,
])

export const PFollow = tw.button`
  px-4
  py-2
  bg-white
  border
  border-solid
  border-[1px]
  border-gray-300
  hover:bg-gray-200
  text-gray-900
  font-normal
  text-sm
  rounded-lg
  max-lg:text-sm
  flex
  flex-row
  justify-center
  items-center
`

export const PManage = tw.button`
  px-8
  py-2
  bg-primary-200
  hover:bg-gray-200
  text-primary-700
  font-normal
  text-sm
  rounded-lg
  max-lg:text-sm
  flex
  flex-row
  justify-center
  items-center
`

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

export const BtnCreateQuest = styled.button<{ block?: boolean }>(
  ({ block = false }) => [
    !block
      ? tw`
          w-[calc(50%_-_8px)]
          py-2
          rounded-lg
          bg-primary-500
          flex
          justify-center
          items-center
          text-lg
          font-medium
          text-white
          cursor-pointer
          hover:bg-primary-400
        `
      : tw`
        py-2
        w-[calc(50%_-_8px)]
        rounded-lg
        bg-primary-300
        flex
        justify-center
        items-center
        text-lg
        font-medium
        text-white
        cursor-not-allowed
        `,
  ]
)

export const BtnDraft = tw.button`
  w-[calc(50%_-_8px)]
  py-2
  rounded-lg
  bg-white
  flex
  justify-center
  items-center
  text-lg
  font-medium
  text-black
  cursor-pointer
  hover:bg-gray-200
  border
  border-solid
  border-[1ox]
  border-gray-300
`
