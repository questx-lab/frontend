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
