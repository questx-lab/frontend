import styled from 'styled-components'
import tw from 'twin.macro'

import { Dialog, Listbox } from '@headlessui/react'
import {
  Horizontal,
  HorizontalBetweenCenter,
  Vertical,
} from '@/widgets/orientation'

type TabActive = {
  isActive: boolean
}

type SessionType = {
  postion?: boolean
}

export const Wrap = tw(Horizontal)`
  min-h-screen
  pt-[80px]
`

export const Main = tw(Vertical)`
  pl-[100px]
  pr-[40px]
  max-lg:pr-[10px]
  max-lg:pl-[80px]
  py-2
  w-full
`

export const Title = tw.p`
  text-3xl
  text-black
  font-bold
  max-sm:text-2xl
`

export const TabSide = tw(Horizontal)`
  w-full
  h-[60px]
  border-b-2
  border-gray-300
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
        max-lg:px-2
        max-lg:text-xs
      `
    : tw`
        h-full
        w-[200px]
        flex
        justify-center
        items-center
        cursor-pointer
        max-lg:px-2
        max-lg:text-xs
      `
)

export const Text = styled.p<TabActive>(({ isActive }) =>
  isActive ? tw`font-bold` : tw`font-light`
)

// ================== QUESTS STYLE ==================
export const QuestWrap = tw(Vertical)`
  w-full
`

export const NotifyBox = tw(HorizontalBetweenCenter)`
  w-full
  bg-black
  px-8
  py-4
  rounded-lg
`

export const NotifyText = tw.span`
  text-xl
  font-bold
  text-white
`

export const HeaderText = tw.h2`
  text-2xl
  text-black
  font-bold
`

// ================== PROJECT SETTING STYLE ==================

export const PWrap = tw(Horizontal)`
  w-full
  h-[200px]
  max-lg:flex-col
  max-lg:h-full
`

export const PSessionL = tw(Horizontal)`
  w-3/5
  max-lg:flex-col
  max-lg:w-full
  max-lg:items-center
`

export const PSessionLogo = tw.div`
  h-[200px]
  w-[200px]
  border-2
  border-solid
  border-gray-500
  rounded-lg
`

export const PInputBlock = tw.div`
  w-full
  rounded-lg
  bg-gray-200
  text-sm
  text-black
  font-normal
  px-5
  py-4
`

export const PSessionR = tw(Vertical)`
  w-2/5
  pl-5
  max-lg:w-full
  max-lg:pl-0
`

export const PLabel = tw.div`
  text-sm
  text-black
  font-bold
`

export const PHalfWrap = tw(Horizontal)`
  w-full
  max-lg:flex-col
`

export const PHalfSession = styled.div<SessionType>(({ postion = false }) => [
  postion
    ? tw`
        w-1/2
        pl-6
        flex
        flex-col
        max-lg:w-full
        max-lg:pl-0
      `
    : tw`
        w-1/2
        pr-6
        flex
        flex-col
        max-lg:w-full
        max-lg:pl-0
      `,
])

export const PCateWrap = tw.div`
  flex
  flex-wrap
`

export const PCategoryItem = tw.div`
  rounded-full
  mr-3
  mb-3
  bg-black
  flex
  justify-center
  items-center
  px-5
  py-0.5
  text-lg
  text-white
  font-normal
  cursor-pointer
`

// ================== PROJECT MANAGEMENT STYLE ==================
export const MWrapBtn = tw(HorizontalBetweenCenter)`
  w-full
`

export const MBtn = tw.button`
  w-[calc(33%_-_8px)]
  py-5
  flex
  justify-center
  items-center
  bg-gray-300
  rounded-lg
  text-xl
  text-black
  font-bold
  max-lg:text-xs
  max-lg:h-[100px]
`

export const PTableWrap = tw.div`
  w-full
  relative
  overflow-x-auto
`

export const PTable = tw.table`
  w-full
  text-sm
  text-left
  text-gray-500
  dark:text-gray-400
`

export const PThead = tw.thead`
  text-xs
  text-gray-700
  uppercase
  bg-gray-100
  dark:bg-gray-700
  dark:text-gray-400
`

export const PTh = tw.th`
  px-6
  py-3
  rounded-l-lg
`

export const PTr = tw.tr`
  bg-white
  dark:bg-gray-800
`

export const PTd = tw.td`
  px-6
  py-4
`

export const MLbox = tw.div`
  relative
  w-full
  border-2
  border-solid
  border-black
  rounded-lg
`

export const MBoxBtn = styled(Listbox.Button)(tw`
  relative
  w-full
  cursor-default
  rounded-lg
  bg-white
  py-2
  pl-3
  pr-10
  text-left
  shadow-md
  focus:outline-none
  sm:text-sm
`)

export const MSpanName = tw.span`
block truncate
`

export const MSpanIcon = tw.span`
  pointer-events-none
  absolute
  inset-y-0
  right-0
  flex
  items-center
  pr-2
`

export const MDialog = styled(Dialog)(tw`
  relative z-10
`)
