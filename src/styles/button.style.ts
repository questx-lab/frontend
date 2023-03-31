import Image from 'next/image'
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

export const FullWidthBtnBox = styled.button(tw`
  w-full 
  bg-primary 
  hover:bg-gray-400 
  text-sm 
  text-white 
  font-medium 
  py-2 
  px-4 
  rounded-lg
`)

export const LoginHeaderBtn = styled.button(tw`
  bg-primary 
  hover:bg-gray-400 
  text-sm 
  text-white 
  font-medium 
  py-2 
  px-4 
  rounded-lg
  max-sm:hidden
`)

export const ConnectTwitterBtn = styled.button(tw`
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
`)

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

export const MenuBtn = styled.button(tw`
  sm:hidden
  max-sm:mr-2
`)

export const MenuIcon = styled(Image)(tw`

`)
