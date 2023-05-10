import tw from 'twin.macro'

export const Title = tw.div`
  text-xs	 
  font-medium
  font-semibold	
  uppercase
`

export const Description = tw.div`
  text-xs	 
  font-normal
  text-gray-500
`

export const HeaderBox = tw.div`
  flex
  flex-row
  justify-start
  items-center
`

export const PointText = tw.span`
  text-[#FF7B05]
  text-lg
  font-medium
`

export const ContentContainer = tw.div`
  text-left
  p-6
  m-5
  border-2
  rounded-md
  border-[#E5E7EB]
`

export const QuestDetailWrap = tw.div`
  grid
  gap-1
  grid-cols-3
  w-full
`

export const QuizzesWrap = tw.div`
  w-full
`

export const ProgressWrap = tw.div`
  flex
  border-b-2
  pb-5
  px-6
`

export const ProgressText = tw.div`
  w-full 
  text-sm
  text-gray-500
`
export const ProgressBar = tw.div`
  flex 
  items-center 
  w-full
`

export const ProgressBarBg = tw.div`
  h-2
  w-full
  bg-gray-200
  rounded-lg
`
export const ProgressBarTotal = tw.div`
  h-2 
  bg-success 
  rounded-lg
`

export const Px6 = tw.div`
  px-6
`
