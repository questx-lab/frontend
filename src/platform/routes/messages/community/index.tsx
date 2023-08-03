import { FC } from 'react'

import tw from 'twin.macro'

import { VerticalCenter } from '@/widgets/orientation'

const MainFrame = tw(VerticalCenter)`
  w-full
  h-[calc(100vh_-_64px)]
`

const Index: FC = () => {
  return <MainFrame>Please select a channel</MainFrame>
}

export default Index
