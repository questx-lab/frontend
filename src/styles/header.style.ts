import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import tw from 'twin.macro'

type NavBarType = {
  isActive: boolean
}

export const Wrap = tw.nav`
  w-full
  xl:flex
  xl:flex-row
  justify-between
  items-center
  h-[70px]
  px-[15px]
  shadow
  shadow-md
  fixed
  bg-white
  max-sm:h-[65px]
`

// ============= LEFT SESSION =============

export const LeftSession = tw.div`
  h-full
  w-1/2
  relative
  object-center
  max-xl:w-[calc(100%_-_45px)]
  max-xl:absolute
`

export const BoxLink = tw.div`
  absolute
  h-full
  w-full
  flex
  flex-row
  justify-center
  items-center
  max-sm:hidden
`

export const LinkText = styled(Link)(
  tw`
  w-[150px]
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
  max-xl:absolute
  max-xl:w-1/4
  max-xl:right-0
  max-xl:pr-3
  max-xl:h-[70px]
`

// ============= USER INFORMATION =============
export const UserSession = tw.div`
  flex
  flex-row
  justify-start
  px-[20px]
  cursor-pointer
  sm:hidden
`

export const UserInfo = tw.div`
  flex
  flex-col
  justify-center
  items-start
  ml-4
`

export const ImageLogoBox = styled(Image)(tw`
  cursor-pointer
  absolute
  h-full
  max-sm:w-[100px]
  max-2xl:w-[120px]
`)

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

export const NavBar = styled.div<NavBarType>(({ isActive = false }) => [
  isActive
    ? tw`
    sm:hidden
    bg-black
    h-full
    w-full
    fixed
    bg-[rgba(0, 0, 0, 0.8)]
    backdrop-blur-sm
    mt-[60px]
  `
    : tw`
      h-0
      w-0
    `,
])

export const NavWrap = tw.div`
  flex
  flex-col
  justify-start
  w-full
  h-full
  p-4
`
export const NavLink = tw.div`
  w-full
  cursor-pointer
  flex
  flex-col
  justify-center
  items-center
  py-3
`

export const NavTitle = tw.div`
  flex
  justify-center
  items-center
  text-xl
  font-bold
  text-white
`

export const NavUnderline = tw.div`
  h-[1px]
  bg-white
  mt-1
  w-[120px]
`
