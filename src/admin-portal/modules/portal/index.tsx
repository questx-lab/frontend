import { FC } from 'react'

import tw from 'twin.macro'

export const FixedFrame = tw.div`
  w-80
  fixed
  border-r-2
  border-gray-200
  h-full
`

const Portal: FC = () => {
  return <>This is porttal</>
}

export default Portal
