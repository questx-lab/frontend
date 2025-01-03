import styled from 'styled-components'
import tw from 'twin.macro'

import { Dialog } from '@headlessui/react'

export const Background = tw.div`
  fixed
  inset-0
  bg-black
  bg-opacity-80
  backdrop-blur-sm
`

export const FixedOverflow = tw.div`
  fixed
  inset-0
  overflow-y-auto
`

export const DesModal = tw.h4`
  text-lg
  text-gray-500
  font-normal
`

export const WrapProgressBar = tw.div`
  w-[200px]
  h-[200px]
  flex
  justify-center
  items-center
`

export const CenterWrap = tw.div`
  flex
  h-full
  items-center
  justify-center
`

export const DialogPannel = styled(Dialog.Panel)(
  tw`
  w-full
  max-w-md
  transform
  overflow-hidden
  rounded-2xl
  bg-white
  p-10
  text-left
  align-middle
  shadow-lg
  transition-all
  flex
  flex-col
  justify-center
  items-center
  `
)

export const TitleModal = tw.h2`
  text-black
  font-bold
  text-3xl
`
