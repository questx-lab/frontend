import styled from 'styled-components'
import tw from 'twin.macro'

import { Horizontal, HorizontalCenter } from '@/widgets/orientation'
import { Dialog } from '@headlessui/react'

export const ModalBg = tw.div`
  fixed 
  inset-0 
  bg-black 
  bg-opacity-80 
  backdrop-blur-sm
`

export const ModalWrap = tw.div`
  fixed 
  inset-0 
  overflow-y-auto
`

export const ModalBox = tw(HorizontalCenter)`
  flex
  h-full
  items-center
  justify-center
  text-center
  py-6
`

export const MDHead = tw(Horizontal)`
  w-full
  justify-between
  items-center
  px-8
  py-4
  text-2xl
  font-normal
  text-black
  border
  border-solid
  border-gray-200
`

export const ModalContent = styled(Dialog.Panel)(
  tw`
  w-1/2
  max-xl:w-2/3
  h-full
  bg-white
  text-center
  align-middle
  overflow-y-scroll
  shadow-xl
  transition-all
  flex
  flex-col
  justify-start
  items-center
  rounded-lg
  `
)
export const TMContent = tw.div`
  flex 
  h-full
  items-center 
  justify-end 
  text-center
`

export const TMWrap = styled(Dialog.Panel)(
  tw`
  w-5/6 
  max-2xl:w-[calc(100%_-_70px)]
  h-full
  bg-white 
  text-left 
  align-middle 
  overflow-hidden
  shadow-xl 
  transition-all
  flex
  flex-col
  justify-start
  items-center
  `
)

export const CenterWrap = tw.div`
  flex 
  h-full
  items-center 
  justify-center 
  text-center
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
  shadow-xl 
  transition-all
  flex
  flex-col
  justify-center
  items-center
  `
)

export const LDDP = styled(Dialog.Panel)(
  tw`
  w-2/3 
  h-[720px]
  overflow-hidden 
  rounded-2xl 
  bg-white 
  p-6
  text-left 
  align-middle 
  shadow-xl 
  transition-all
  flex
  flex-col
  justify-start
  items-center
  `
)

export const TitleModal = tw.h2`
  text-black
  font-bold
  text-3xl
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
