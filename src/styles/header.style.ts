import Link from 'next/link';
import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrap = tw.nav`
  w-screen
  flex
  flex-row
  justify-between
  items-center
  h-[60px]
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
  space-x-16
  justify-center
  items-center
`

export const LinkText = styled(Link)(
  tw`
  text-black
  text-lg
  font-light
  cursor-pointer
  `
)

// ============= RIGHT SESSION =============

export const RightSession = tw.div`
  w-1/2
  flex
  flex-row
  items-center
  justify-end
`
