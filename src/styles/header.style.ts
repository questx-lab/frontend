import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import tw from 'twin.macro'

import {
  Horizontal,
  HorizontalBetweenCenter,
  HorizontalCenter,
  HorizontalStartCenter,
  Vertical,
} from '@/widgets/orientation'
import { Popover } from '@headlessui/react'

type NavBarType = {
  isActive: boolean
}

export const Wrap = styled.nav<{ isApp?: boolean }>(({ isApp = true }) => [
  tw`
  w-full
  flex
  flex-row
  justify-between
  items-center
  h-[70px]
  border-b-[1px]
  border-gray-200
  fixed
  `,
  isApp && tw`bg-white px-6 3xl:px-6`,
  !isApp &&
    tw`
    border-0
    backdrop-blur-lg
    flex
    flex-row
    justify-center
    items-center
  `,
])

export const Body = styled(HorizontalBetweenCenter)<{ isApp?: boolean }>(
  ({ isApp = true }) => [
    !isApp &&
      tw`
        h-full
        max-sm:px-2
        md:px-8
        w-full
        xl:w-[1180px]
      `,
    isApp &&
      tw`
        w-full
        h-full
      `,
  ]
)

// ============= LEFT SESSION =============

export const LeftSession = tw(HorizontalStartCenter)`
  gap-4
  h-full
  w-full
`

export const BoxLink = tw(Horizontal)`
  h-full
  w-full
  items-center
  max-md:hidden
`

export const LinkText = styled(Link)(
  tw`
  relative
  text-black
  text-xl
  font-light
  cursor-pointer
  flex
  flex-col
  justify-center
  items-center
  h-full
  px-4
  `
)

export const TitleText = tw.div`
  h-full
  w-full
  flex
  justify-center
  items-center
  font-normal
  text-lg
  3xl:text-xl
`

export const Underline = tw.div`
  h-[5px]
  bg-primary-600
  w-full
  rounded-t-full
  absolute
  bottom-0
`

// ============= RIGHT SESSION =============

export const RightSession = tw(Horizontal)`
  w-full
  items-center
  justify-end
`

// ============= USER INFORMATION =============
export const UserSession = tw(HorizontalCenter)`
  cursor-pointer
  max-md:hidden
`

export const UserInfo = tw(Vertical)`
  justify-center
  ml-4
`

export const ImageLogoBox = styled(Image)(tw`
  cursor-pointer
  h-full
  max-sm:w-[100px]
  max-2xl:w-[120px]
`)

export const AvatarBox = styled(Image)(tw`ml-4`)

export const DesNameTxt = tw.p`
  text-sm
  italic
  font-normal
  text-black
`

export const UserNameTxt = tw.p`
  text-sm
  font-bold
  text-black
  text-ellipsis
  overflow-hidden
  max-w-[150px]
`

export const NavBar = styled.div<NavBarType>(({ isActive = false }) => [
  isActive
    ? tw`
    lg:hidden
    bg-black
    h-full
    w-full
    fixed
    bg-black
    bg-opacity-80
    backdrop-blur-sm
    mt-[60px]
  `
    : tw`
      h-0
      w-0
    `,
])

export const NavWrap = tw(Vertical)`
  w-full
  h-full
  p-4
`
export const NavLink = tw(Vertical)`
  w-full
  cursor-pointer
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

export const PopWrap = styled(Popover)(tw`
  relative
  z-10
`)

export const PopPanel = styled(Popover.Panel)(tw`
  divide-y
  right-0
  rounded-lg
  mt-5
  absolute z-10
  bg-white
  shadow-lg
  border
  border-solid
  border-gray-300
  w-[350px]
  flex
  flex-col
`)

export const PopItem = tw(Vertical)`
  w-full
  py-2
  px-4
`

export const CreateProjectBtn = tw(Horizontal)`
  gap-2
  border
  border-solid
  border-gray-300
  rounded-lg
  justify-center
  items-center
  py-2
  px-4
  text-lg
  text-black
  font-medium
  cursor-pointer
`
