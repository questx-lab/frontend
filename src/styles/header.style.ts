import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import tw from 'twin.macro'

export const Wrap = tw.nav`
  w-screen
  flex
  flex-row
  justify-between
  items-center
  h-[70px]
  px-[15px]
  shadow
  shadow-md
  fixed
  bg-white
`

// ============= LEFT SESSION =============

export const LeftSession = tw.div`
  h-full
  w-1/2
  relative
  object-center
`

export const BoxLink = tw.div`
  absolute
  h-full
  w-full
  flex
  flex-row
  justify-center
  items-center
`

export const LinkText = styled(Link)(
  tw`
  w-[120px]
  text-black
  text-xl
  font-light
  cursor-pointer
  flex
  flex-col
  justify-center
  items-center
  h-full
  `
)

export const TitleText = tw.div`
  h-full
  w-full
  flex
  justify-center
  items-center
`

export const Underline = tw.div`
  h-[4px]
  bg-black
  w-full
`

// ============= RIGHT SESSION =============

export const RightSession = tw.div`
  w-1/2
  flex
  flex-row
  items-center
  justify-end
`

// ============= USER INFORMATION =============
export const UserSession = tw.div`
  flex
  flex-row
  justify-start
  px-[20px]
  cursor-pointer
`

export const UserInfo = tw.div`
  flex
  flex-col
  justify-center
  items-start
  ml-4
`

export const ImageLogoBox = styled(Image)(tw`absolute h-full`)

export const AvatarBox = styled(Image)(tw`ml-4`)

export const DesNameTxt = styled.p(
  tw`
    text-sm 
    italic 
    font-normal 
    text-black
  `
)

export const UserNameTxt = styled.p(
  tw`
    text-sm 
    font-bold 
    text-black
  `
)
