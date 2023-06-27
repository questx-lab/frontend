import { FC, ReactNode } from 'react'

import tw from 'twin.macro'

import { Card } from '@material-tailwind/react'

const Frame = tw(Card)`
  shadow-none
  border
  border-solid
  border-gray-300
  overflow-scroll
  h-full
  w-full
`

const TableBox = tw.table`
  w-full
  min-w-max
  table-auto
  text-left
`

const SimpleTable: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Frame>
      <TableBox>{children}</TableBox>
    </Frame>
  )
}

export default SimpleTable
