import styled from 'styled-components'
import tw from 'twin.macro'

type TabActive = {
  isActive: boolean
}

type SessionType = {
  postion?: boolean
}

export const Wrap = tw.div`
  flex
  flex-row
  min-h-screen
  pt-[80px]
`

export const Main = tw.div`
  flex
  flex-col
  ml-[120px]
  mr-[40px]
  max-lg:mr-[15px]
  py-2
  w-full
`

export const Title = tw.p`
  text-3xl
  text-black
  font-bold
  max-sm:text-2xl
`

export const TabSide = tw.div`
  w-full
  h-[60px]
  border-b-2
  border-gray-300
  flex
  flex-row
  justify-start
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
      `
    : tw`
        h-full
        w-[200px]
        flex
        justify-center
        items-center
        cursor-pointer
      `
)

export const Text = styled.p<TabActive>(({ isActive }) =>
  isActive ? tw`font-bold` : tw`font-light`
)

// ================== QUESTS STYLE ==================
export const QuestWrap = tw.div`
  w-full
  flex
  flex-col
  justify-start
  items-start
`

export const NotifyBox = tw.div`
  w-full
  bg-black
  px-8
  py-4
  flex
  flex-row
  justify-between
  items-center
  rounded-lg
`

export const NotifyText = tw.span`
  text-xl
  font-bold
  text-white
`
export const QuestWrapCat = tw.div`
  flex
  flex-row
  w-full
`

export const CateTitle = tw.p`
  text-lg
  font-bold
  text-black
  w-[200px]
`

export const HeaderText = tw.h2`
  text-2xl
  text-black
  font-bold
`

export const SectionWrap = tw.div`
  flex
  flex-wrap
`

export const SectionBox = tw.div`
  w-[325px]
  h-[325px]
  border-dashed
  border
  border-dashed
  border-2 border-gray-400
  rounded-lg
  flex
  justify-center
  items-center
  text-black
  font-bold
  text-lg
  mr-6
  mb-6
`

// ================== PROJECT SETTING STYLE ==================

export const PWrap = tw.div`
  flex
  flex-row
  w-full
  h-[200px]
`

export const PSessionL = tw.div`
  w-3/5
  flex
  flex-row
`

export const PSessionLogo = tw.div`
  h-[200px]
  w-[200px]
  border-2
  border-solid
  border-gray-500
  rounded-lg
`

export const PSessionLChild = tw.div`
  w-full
  flex
  flex-col
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

export const PSessionR = tw.div`
  w-2/5
  pl-5
  flex
  flex-col
`

export const PLabel = tw.div`
  text-sm
  text-black
  font-bold
`

export const PHalfWrap = tw.div`
  w-full
  flex
  flex-row
`

export const PHalfSession = styled.div<SessionType>(({ postion = false }) => [
  postion
    ? tw`
        w-1/2
        pl-6
        flex
        flex-col
      `
    : tw`
        w-1/2
        pr-6
        flex
        flex-col
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

export const PActionWrap = tw.div`
  w-full
  flex
  flex-row
  justify-center
  items-center
`
// ================== PROJECT MANAGEMENT STYLE ==================
export const MWrapBtn = tw.div`
  w-full
  flex
  flex-row
  justify-between
  items-center
`

export const MBtn = styled.button(
  tw`
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
  `
)
